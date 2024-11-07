const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { generateQuestion, learningTracks } = require("./questionGenerator");
const { handleGeneralInquiry } = require("./generalInquiryHandler");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Serve static files from the root directory
app.use(express.static(__dirname));

// Root route to serve the main page
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

// Quiz generation endpoint
app.post("/api/quiz", async (req, res) => {
    const { track } = req.body;
    if (!track || !learningTracks.includes(track)) {
        return res.status(400).json({ error: "Invalid or missing learning track" });
    }

    try {
        const question = await generateQuestion(track);
        if (question) {
            res.json({ question });
        } else {
            res.status(500).json({ error: "Failed to generate question" });
        }
    } catch (error) {
        console.error("Quiz generation error:", error);
        res.status(500).json({ error: "Error generating quiz" });
    }
});

// General inquiry handling endpoint
app.post("/api/chat", async (req, res) => {
    const { message } = req.body;
    try {
        const response = await handleGeneralInquiry(message);
        res.json({ response });
    } catch (error) {
        console.error("Chatbot error:", error);
        res.status(500).json({ error: "Error handling inquiry" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
