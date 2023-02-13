const express = require("express");
const app = express();
const cors = require("cors"); // connect the server to the client (white list)

app.use(express.json()); // can response with json
app.use(cors());

const db = require("./models");

// Routers
const interviewRouter = require("./routes/Interviews");
app.use("/", interviewRouter);
app.use("/interviews", interviewRouter);

const usersRouter = require("./routes/Users");
app.use("/auth", usersRouter);

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("Server running on port 3001...");
  });
});
