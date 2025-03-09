const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/anganwadi", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Models
const ReportSchema = new mongoose.Schema({
    supervisorID: String,
    notes: String,
    priority: String,
    timestamp: { type: Date, default: Date.now }
});
const Report = mongoose.model("Report", ReportSchema);

// Routes
app.get("/", (req, res) => {
    res.send("Anganwadi Smart Management Backend");
});

app.post("/submit-report", async (req, res) => {
    try {
        const { supervisorID, notes, priority } = req.body;
        const newReport = new Report({ supervisorID, notes, priority });
        await newReport.save();
        res.status(201).json({ message: "Report submitted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

