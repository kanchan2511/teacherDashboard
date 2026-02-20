const express = require("express");
const router = express.Router();

const {
  createObservation,
  getObservationsByStudent,
} = require("../controllers/observationController");

router.post("/", createObservation);
router.get("/:studentId", getObservationsByStudent);

module.exports = router;