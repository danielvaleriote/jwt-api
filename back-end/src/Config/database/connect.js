const mongoose = require("mongoose");
require("dotenv").config();

const connectToDB = () => {
	mongoose.connect(process.env.DB_URL)
		.then(() => console.info("Connected to the database."))
		.catch(err => console.error(err.message))
};

module.exports = connectToDB;