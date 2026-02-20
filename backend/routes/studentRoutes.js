const router = require("express").Router();

const{getStudents,createStudent,getStudentById} = require("../controllers/studentController")

router.get("/",getStudents)
router.post("/",createStudent)
router.get("/:id",getStudentById)

module.exports = router;