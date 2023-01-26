const express = require("express");
const router = express.Router();

// models
const { InterviewProcess } = require("../models");

router.get("/", async (req, res) => {
  const listOfAllInterviewProcesses = await InterviewProcess.findAll();
  res.json(listOfAllInterviewProcesses);
});

router.post("/", async (req, res) => {
  const interview = req.body;
  await InterviewProcess.create(interview);
  res.json(interview);
});

module.exports = router;
