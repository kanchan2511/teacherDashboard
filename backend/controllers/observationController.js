const Observation = require("../models/Observation");

// POST /api/observations
exports.createObservation = async (req, res) => {
  try {
    const observation = await Observation.create(req.body);
    res.json(observation);
  } catch (err) {
    res.status(500).json({ message: "Failed to create observation" });
  }
};

// GET /api/observations/:studentId
exports.getObservationsByStudent = async (req, res) => {
  try {
    const observations = await Observation.find({
      student: req.params.studentId,
    }).sort({ date: -1 });

    res.json(observations);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch observations" });
  }
};