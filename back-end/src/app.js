const express = require("express");
const User = require("./Models/User");
const connectToDB = require("./Config/database/connect");
const { authenticateTokenAndGetUser, restrictSection } = require("./Middlewares/auth");
const { verify } = require("jsonwebtoken");
const { hash, compare } = require("bcryptjs");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

const {
	createAccessToken,
	createRefreshToken, 
	sendAccessToken, 
	sendRefreshToken
} = require("./Helpers/tokens");

const app = express();

const port = process.env.PORT || 3500;

connectToDB();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.post("/register", async (req, res) => {
	const {username, password} = req.body;
	if(!username || !password) return res.sendStatus(422);

	try {
		await User.create({username, password: await hash(password, 10)});

		res.sendStatus(201);
	} catch(err) {
		if(err.code == 11000) return res.status(409).json({msg:"Username already registered."});

		console.error(err.message);
		res.sendStatus(500);
	};
});

app.post("/login", async (req, res) => {
	const {username, password} = req.body;
	if(!username || !password) return res.sendStatus(422);

	try {
		const user = await User.findOne({username})
		// Checks if user exists
		if(!user) return res.status(404).json({msg: "User does not exist."})
		// Checks if password is correct
		if(!await compare(password, user.password)) return res.sendStatus(403)

		const accessToken = createAccessToken(user.id);
		const refreshToken = createRefreshToken(user.id);

		// Sends cookie with refresh token
		sendRefreshToken(res, refreshToken);
		// Sends json with access token
		sendAccessToken(res, accessToken);

		user.refreshToken = refreshToken;
		await user.save();

	} catch(err) {
		console.error(err.message);

		res.sendStatus(500);
	}
});

app.get("/logout", (_, res) => {
	res.clearCookie("rt", {path: "/refresh_token"});
	res.sendStatus(200);
});

app.post("/refresh_token", async (req, res) => {
	const { rt } = req.cookies;
	if(!rt) return res.sendStatus(403);

	try {
		const { id } = verify(rt, process.env.REFRESH_TOKEN_SECRET);
		const user = await User.findById(id, "-password");

		if(user.refreshToken !== rt) throw new Error();

		sendAccessToken(res, createAccessToken(id));
		
	} catch(err) {
		console.error(err.message);

		res.sendStatus(403);
	};
});

app.listen(port, () => console.info(`Server is listening to ${port}.`));