const User = require("../Models/User");
const {verify} = require("jsonwebtoken");

const authenticateTokenAndGetUser = async (req, res, next) => {
	let token = req.headers["authorization"];
	token = token && token.split(" ")[1];

	if(!token) return res.sendStatus(401);

	try {
		const { id } = verify(token, process.env.ACCESS_TOKEN_SECRET);
		const user = await User.findById(id, "-password");
		if(!user) throw new Error();

		req.user = user;
		next();
	} catch(err) {
		console.error(err.message);
		res.sendStatus(401);
	};
};

const restrictSection = async (req, res, next) => {
	if(req.user.admin) next();
	else return res.sendStatus(403);
};

module.exports = {authenticateTokenAndGetUser, restrictSection};