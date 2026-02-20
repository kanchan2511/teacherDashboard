const mongoose = require("mongoose");

const observationSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student"
  },
  topicMastery: String,
  participation: String,
  homework: String,
  behavior: String,
  notes: String,
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Observation", observationSchema);
