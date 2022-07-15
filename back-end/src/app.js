const express = require("express");
const mongoose = require("mongoose");
const User = require("./Models/User");
const {hash} = require("bcryptjs");
const {createAccessToken, createRefreshToken} = require("./Helpers/tokens");
require("dotenv").config();
const app = express();

mongoose.connect(process.env.DB_URL)
	.then(() => console.info("Connected to the database."))
	.catch(err => console.error(err.message))

const port = process.env.PORT || 3500;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.post("/register", async (req, res) => {
	const {username, password} = req.body;

	if(!username || !password) return res.sendStatus(422);

	try {
		await User.create({username, password: await hash(password, 10)});

		res.sendStatus(201);

	} catch(err) {
			console.error(err.message);

			if(err.code == 11000) return res.status(409).json({msg:"Username already registered."});
			res.sendStatus(500);
			
	};
});

app.listen(port, () => console.info(`Server is listening to ${port}.`));