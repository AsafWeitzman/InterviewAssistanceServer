const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
const multer = require("multer");

const { Users } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");
const PORT = 3001;

// multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./");
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];
    cb(null, `uploads/${file.originalname}-${Date.now()}.${ext}`);
  },
});
const upload = multer({ storage: storage });

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

router.put("/editUserName/:id", validateToken, async (req, res) => {
  const userId = req.params.id;

  const newUserName = req.body;

  try {
    await Users.update(newUserName, {
      where: {
        id: userId,
      },
    });

    const user = await Users.findOne({ where: { id: userId } });

    const accessToken = sign(
      { email: user.email, id: user.id, userName: user.userName },
      "secretString" // TODO: make secret (ENV VAR)
    );
    return res.json({
      token: accessToken,
      userName: user.userName,
      id: user.id,
      email: user.email,
    });
  } catch (err) {
    return res.json({ error: err });
  }
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

    const filename = user.profilePicture;
    const profilePicture = `http://localhost:${PORT}/${filename}`;

    res.json({
      token: accessToken,
      userName: user.userName,
      id: user.id,
      email: user.email,
      profilePicture: profilePicture,
    });
  });
});

router.get("/authUser", validateToken, async (req, res) => {
  const userId = req.user.id;
  try {
    const user = await Users.findOne({ where: { id: userId } });
    const filename = user.profilePicture;

    const profilePicture = `http://localhost:${PORT}/${filename}`;

    return res.json({ ...req.user, profilePicture: profilePicture });
  } catch (error) {
    console.log("Oh no: ", error);
  }
  res.json(req.user);
});

router.put(
  "/editProfilePicture/:id",
  upload.single("profilePicture"),
  validateToken,
  async (req, res) => {
    const userId = req.params.id;
    const filename = req.file.filename;

    await Users.update(
      { profilePicture: filename },
      {
        where: {
          id: userId,
        },
      }
    );

    console.log("Profile image inserted into database successfully!");
    const profilePicture = `http://localhost:${PORT}/${filename}`;
    res.json({ profilePicture: profilePicture });
  }
);

module.exports = router;
