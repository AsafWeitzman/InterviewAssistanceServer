const express = require("express");
const router = express.Router();

// models
const { InterviewProcess } = require("../models");

router.get("/", async (req, res) => {
  const listOfAllInterviewProcesses = await InterviewProcess.findAll();
  res.json(listOfAllInterviewProcesses);
});

router.get("/byId/:id", async (req, res) => {
  const interviewId = req.params.id;
  const interview = await InterviewProcess.findByPk(interviewId);
  res.json(interview);
});

router.post("/", async (req, res) => {
  const interview = req.body;
  await InterviewProcess.create(interview);
  res.json(interview);
});

router.delete("/delete/:id", async (req, res) => {
  const interviewId = req.params.id;
  await InterviewProcess.destroy({
    where: {
      id: interviewId,
    },
  });

  res.json("DELETE SUCCESFULLY");
});

router.put("/edit/:id", async (req, res) => {
  const interviewId = req.params.id;

  const newInterview = req.body;

  await InterviewProcess.update(newInterview, {
    where: {
      id: interviewId,
    },
  });

  res.json("UPDATE SUCCESFULLY");
});

module.exports = router;
