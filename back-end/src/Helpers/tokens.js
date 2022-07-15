const {sign, verify} = require("jsonwebtoken");

const createAccessToken = id => id && sign({id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "15m"});
const createRefreshToken = id => id && sign({id}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: "7d"});

const sendAccessToken = (res, accessToken) => {
	if(accessToken) return res.json({accessToken})
}

const sendRefreshToken = (res, refreshToken) => {
	if(refreshToken) res.cookie("rt", refreshToken, {path: "/refresh_token", httpOnly: true})
}

// .cookie(name: string, val: string, options: CookieOptions): Response<any, Record<string, any>, number> (+2 overloads)
// Set cookie name to val, with the given options.

// Options:

// maxAge max-age in milliseconds, converted to expires
// signed sign the cookie
// path defaults to "/"
// Examples:

// "Remember Me" for 15 minutes res.cookie('rememberme', '1', { expires: new Date(Date.now() + 900000), httpOnly: true });

module.exports = {createAccessToken, createRefreshToken, sendAccessToken, sendRefreshToken};