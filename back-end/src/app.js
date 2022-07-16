const express = require("express");
const User = require("./Models/User");
const connectToDB = require("./Config/database/connect");
const { hash, compare } = require("bcryptjs");
const cookieParser = require("cookie-parser");
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

	} catch(err) {
		console.error(err.message);

		res.sendStatus(500);
	}
})

app.listen(port, () => console.info(`Server is listening to ${port}.`));