const {sign} = require("jsonwebtoken");

const createAccessToken = id => id && sign({id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "15m"});
const createRefreshToken = id => id && sign({id}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: "7d"});

const sendAccessToken = (res, accessToken) => { 
	if(!accessToken) return res.sendStatus(500);
	
	return res.json({accessToken})
}

const sendRefreshToken = (res, refreshToken) => {
	if(refreshToken) res.cookie("rt", refreshToken, {path: "/refresh_token", httpOnly: true})
}

module.exports = {createAccessToken, createRefreshToken, sendAccessToken, sendRefreshToken};