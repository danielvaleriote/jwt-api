const express = require("express");
const mongoose = require("mongoose");
const User = require("./Models/User");
require("dotenv").config();
const app = express();

mongoose.connect(process.env.DB_URL)
	.then(() => console.log("Connected to the database."))
	.catch(err => console.error(err.message))

const port = process.env.PORT || 3500;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.listen(port, () => console.info(`Server is listening to ${port}.`));