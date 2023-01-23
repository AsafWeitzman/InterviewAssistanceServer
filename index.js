const express = require("express");
const app = express();

app.use(express.json());

const db = require("./models");

// Routers
const interviewRouter = require("./routes/Interviews");
app.use("/interviews", interviewRouter);

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("Server running on port 3001...");
  });
});
