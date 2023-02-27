const express = require("express");
const app = express();
const cors = require("cors"); // connect the server to the client (white list)
const path = require("path");

// express
app.use(express.json()); // can response with json

// cors
app.use(cors());

// app.use(express.static("uploads"));
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

const db = require("./models");

const PORT = 3001;

// Routers
const interviewRouter = require("./routes/Interviews");
app.use("/", interviewRouter);
app.use("/interviews", interviewRouter);

const usersRouter = require("./routes/Users");
app.use("/auth", usersRouter);

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log("Server running on port 3001...");
  });
});
