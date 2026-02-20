const mongoose = require("mongoose")

const studentSchema = new mongoose.Schema({
    name: String,
    class: String,
    section: String,
    studentId: String,
},
 {timestamps: true})

module.exports = mongoose.model("Student",studentSchema)