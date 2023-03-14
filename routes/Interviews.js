const express = require("express");
const router = express.Router();
const { validateToken } = require("../middlewares/AuthMiddleware");

// models
const { InterviewProcess } = require("../models");

router.get("/", validateToken, async (req, res) => {
  const userId = req.user.id;

  const listOfAllInterviewProcesses = await InterviewProcess.findAll({
    where: {
      UserId: userId,
    },
  });
  res.json(listOfAllInterviewProcesses);
});

router.get("/byId/:id", validateToken, async (req, res) => {
  const interviewId = req.params.id;
  const interview = await InterviewProcess.findByPk(interviewId);
  res.json(interview);
});

router.post("/", validateToken, async (req, res) => {
  const interview = req.body;
  const email = req.user.email; // from validateToken
  const userId = req.user.id;
  interview.userEmail = email;
  interview.UserId = userId;
  await InterviewProcess.create(interview);
  res.json(interview);
});

router.delete("/delete/:id", validateToken, async (req, res) => {
  const interviewId = req.params.id;
  await InterviewProcess.destroy({
    where: {
      id: interviewId,
    },
  });

  res.json("DELETE SUCCESFULLY");
});

router.put("/edit/:id", validateToken, async (req, res) => {
  const interviewId = req.params.id;

  const newInterview = req.body;

  try {
    await InterviewProcess.update(newInterview, {
      where: {
        id: interviewId,
      },
    });
    res.json("UPDATE SUCCESFULLY");
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
