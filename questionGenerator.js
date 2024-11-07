// questionGenerator.js

const { Configuration, OpenAIApi } = require("openai");
const openai = new OpenAIApi(new Configuration({
    apiKey: require('./config').apiKey
}));

const learningTracks = [
    "AI / Machine Learning",
    "Animation",
    "Cloud Computing",
    "UI/UX Design",
    "Data Analysis & Visualization",
    "Data Science",
    "DevOps",
    "Game Development",
    "Product Management",
    "Quality Assurance",
    "Software Development",
    "Cybersecurity"
];

// questionGenerator.js

async function generateQuestion(track) {
    const prompt = `Generate a multiple-choice quiz question about ${track} for beginners.`;
    console.log("Generated prompt:", prompt);

    // Mock response for testing purposes
    const questionText = `What is ${track}?`;
    return {
        question: questionText,
        options: ["Option A", "Option B", "Option C", "Option D"],
        answer: "Option A"
    };
}
async function generateQuestion(track) {
    const prompt = `Generate a multiple-choice quiz question about ${track} for beginners.`;
    console.log("Generated prompt:", prompt);

    try {
        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: prompt }],
            max_tokens: 100,
            temperature: 0.7
        });
        console.log("OpenAI response:", response.data.choices);

        const questionText = response.data.choices[0].message.content.trim();
        if (!questionText) throw new Error("Empty response from OpenAI");

        return {
            question: questionText,
            options: ["Option A", "Option B", "Option C", "Option D"],
            answer: "Option A"
        };
    } catch (error) {
        console.error("Error generating question:", error.response ? error.response.data : error.message);
        return null;
    }
}

module.exports = { generateQuestion, learningTracks };
