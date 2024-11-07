// generalInquiryHandler.js

const { Configuration, OpenAIApi } = require("openai");

const openai = new OpenAIApi(new Configuration({
    apiKey: require('./config').apiKey
}));

// Predefined responses for frequently asked questions about 3MTT
const predefinedResponses = {
    "what is 3mtt": "The 3 Million Technical Talent (3MTT), an initiative of the Federal Ministry of Communications, Innovation & Digital Economy, is aimed at building Nigeria's technical talent backbone to power our digital economy and position Nigeria as a net exporter of talent.",
    "how do i use 3mtt": "To use 3MTT, select a learning track of your interest, and complete the short, interactive quizzes. The chatbot can also answer questions about the platform!",
    "what are the learning tracks": "3MTT offers learning tracks in AI/Machine Learning, Animation, Cloud Computing, UI/UX Design, Data Science, DevOps, Game Development, and more.",
    "i need support":"To get support you can reach us on this email support@3mtt.training"
};

// Function to handle general inquiries
async function handleGeneralInquiry(message) {
    const lowerMessage = message.toLowerCase();

    // Check if there's a predefined response
    for (const key in predefinedResponses) {
        if (lowerMessage.includes(key)) {
            return predefinedResponses[key];
        }
    }

    // Fallback to OpenAI for generating a response if no predefined response matches
    try {
        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: message }],
            max_tokens: 100
        });
        return response.data.choices[0].message.content.trim();
    } catch (error) {
        console.error("OpenAI error:", error);
        return "I'm sorry, I couldn't process that question. Please try again or visit https://3mtt.nitda.gov.ng";
    }
}

module.exports = { handleGeneralInquiry };
