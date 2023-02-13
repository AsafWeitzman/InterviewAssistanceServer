const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");

const { Users } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.post("/", async (req, res) => {
  const { userName, email, password } = req.body;
  await bcrypt.hash(password, 10).then((hash) => {
    Users.create({
      userName: userName,
      email: email,
      password: hash,
    });
  });

  res.json("USER SUCCESSFULLY SAVED!");
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await Users.findOne({ where: { email: email } });

  if (!user) {
    res.json({ error: "User Doesn't Exist" });
    return;
  }

  bcrypt.compare(password, user.password).then((match) => {
    if (!match) {
      res.json({ error: "Wrong Email And Password Combination" });
      return;
    }

    const accessToken = sign(
      { email: user.email, id: user.id, userName: user.userName },
      "secretString" // TODO: make secret (ENV VAR)
    );

    res.json({
      token: accessToken,
      userName: user.userName,
      id: user.id,
      email: user.email,
    });
  });
});

router.get("/authUser", validateToken, async (req, res) => {
  res.json(req.user);
});

module.exports = router;
