const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const connectDB = require("./config/db")

dotenv.config()
connectDB()
 
const app = express()

app.use(cors());
app.use(express.json())
app.use("/api/students",require("./routes/studentRoutes"))
app.use("/api/observations", require("./routes/observationRoutes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT,() => console.log(`server running on ${PORT}`))

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});