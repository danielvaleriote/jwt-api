const express = require("express");
const User = require("./Models/User");
const connectToDB = require("./Config/database/connect");
const { verify } = require("jsonwebtoken");
const { hash, compare } = require("bcryptjs");
const cors = require("cors");
require("dotenv").config();

const {
  createAccessToken,
  createRefreshToken,
  sendTokens,
} = require("./Helpers/tokens");

const app = express();

const port = process.env.PORT || 3500;

connectToDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ credentials: true, origin: true }));

app.post("/register", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.sendStatus(422);

  const isEmailValid =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    );
  if (!isEmailValid) return res.sendStatus(422);

  try {
    await User.create({ email, password: await hash(password, 10) });

    res.sendStatus(201);
  } catch (err) {
    if (err.code == 11000)
      return res.status(409).json({ msg: "email already registered." });

    console.error(err.message);
    res.sendStatus(500);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.sendStatus(422);

  try {
    const user = await User.findOne({ email });
    // Checks if user exists
    if (!user) return res.status(404).json({ msg: "User does not exist." });
    // Checks if password is correct
    if (!(await compare(password, user.password))) return res.sendStatus(403);

    const accessToken = createAccessToken(user.id, email);
    const refreshToken = createRefreshToken(user.id);

    sendTokens(res, accessToken, refreshToken, {
      email: user.email,
      admin: user.admin,
    });

    user.refreshToken = refreshToken;
    await user.save();
  } catch (err) {
    console.error(err.message);

    res.sendStatus(500);
  }
});

app.post("/logout", async (req, res) => {
  const { refreshToken, email } = req.body;
  if (!refreshToken || !email) return res.sendStatus(422);

  const user = await User.findOne({ refreshToken, email });
  if (!user) return res.sendStatus(404);

  user.refreshToken = null;

  await user.save();
  return res.sendStatus(200);
});

app.post("/refresh_token", async (req, res) => {
  const { rt } = req.body;
  if (!rt) return res.sendStatus(403);

  try {
    const { id } = verify(rt, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findById(id, "-password");

    if (user.refreshToken !== rt) throw new Error();

    sendTokens(res, createAccessToken(id), undefined, {
      email: user.email,
      admin: user.admin,
    });
  } catch (err) {
    console.error(err.message);

    res.sendStatus(403);
  }
});

app.listen(port, () => console.info(`Server is listening to ${port}.`));
