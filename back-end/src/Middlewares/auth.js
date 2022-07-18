const {verify} = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
	let token = req.headers["authorization"];
	token = token && token.split(" ")[1];

	if(!token) return res.sendStatus(401);

	try {
		const { id } = verify(token, process.env.ACCESS_TOKEN_SECRET);
		req.userId = id;
		next();

	} catch(err) {
		console.error(err.message);
		res.sendStatus(401);
	};
};

module.exports = {authenticateToken};