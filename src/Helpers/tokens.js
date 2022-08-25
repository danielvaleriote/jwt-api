const { sign } = require("jsonwebtoken");

const createAccessToken = (id) =>
  id && sign({ id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
const createRefreshToken = (id) =>
  id && sign({ id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });

const sendTokens = (res, accessToken, refreshToken, user) => {
  if (!accessToken && !refreshToken) return res.sendStatus(500);

  if (!user) {
    if (accessToken && !refreshToken) return res.json({ accessToken });
    if (!accessToken && refreshToken) return res.json({ refreshToken });

    return res.json({ accessToken, refreshToken });
  }

  if (accessToken && !refreshToken) return res.json({ accessToken, user });
  if (!accessToken && refreshToken) return res.json({ refreshToken, user });

  return res.json({ accessToken, refreshToken, user });
};

module.exports = {
  createAccessToken,
  createRefreshToken,
  sendTokens,
};
