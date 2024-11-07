// script.js

const API_TOKEN = "YOUR_HUGGING_FACE_API_KEY"; // Replace with your Hugging Face API token

// FAQ Carousel Logic
let currentFAQIndex = 0;
const faqItems = document.querySelectorAll("#faqItems .faq-item");

function showNextFAQ() {
    currentFAQIndex = (currentFAQIndex + 1) % faqItems.length;
    document.getElementById("faqItems").style.transform = `translateX(-${currentFAQIndex * 100}%)`;
}

// Automatically move the FAQ carousel every 5 seconds
setInterval(showNextFAQ, 5000);

// 3MTT FAQ data for chatbot
const faqData = [
    { question: "What is the purpose of the 3MTT program?", answer: "The 3MTT program aims to build a skilled technical workforce in Nigeria by training three million Nigerians in key technical fields." },
    { question: "Who is eligible to apply for the 3MTT program?", answer: "The program is open to Nigerians over the age of 18 with a keen interest in developing technical skills. There are no fees." },
    { question: "What technical skills does the 3MTT program focus on?", answer: "3MTT covers twelve primary technical skills: AI/Machine Learning, Animation, Cloud Computing, UI/UX Design, and more." },
    { question: "How does the training process work?", answer: "The training includes both self-paced online learning and in-person sessions, with hands-on practice in group clusters across regions." },
    { question: "Is the training free?", answer: "Yes, 3MTT is fully funded, covering the training costs for selected participants, but fellows must cover transportation and meal costs." },
    { question: "Will participants receive any certification upon completion?", answer: "Yes, fellows receive a certificate upon completing the training, which can aid in job placement or career advancement." },
    { question: "Are there opportunities for practical experience or job placement?", answer: "Yes, the program partners with organizations to offer internships and job placements for fellows after training." },
    { question: "Can training providers without physical facilities apply?", answer: "Yes, organizations can apply without a physical facility, as long as they have access to one for in-person training." },
    { question: "How long does each training phase last?", answer: "Each phase lasts about three months, blending theoretical and practical learning components." },
    { question: "What should applicants do if they encounter technical issues with the application?", answer: "Applicants can reach out through the support channel on the portal for assistance with technical difficulties." }
];
// Chatbot Send button event listener
document.getElementById("sendBtn").addEventListener("click", async () => {
    const userInput = document.getElementById("userInput").value;
    if (!userInput.trim()) return;

    addMessageToChat("User", userInput);
    document.getElementById("userInput").value = ""; // Clear input
    showTypingIndicator(); // Show typing indicator

    setTimeout(() => {
        hideTypingIndicator(); // Hide typing indicator
        const botResponse = getFAQResponse(userInput);
        addMessageToChat("Bot", botResponse);
    }, 1000); // Simulate typing delay
});

// Sample quiz questions for each learning track with correct answers
const quizQuestions = {
    "AI / Machine Learning": [
        { question: "What is a neural network?", options: ["A type of machine learning model", "A biological brain structure", "A type of CPU", "None of the above"], correct: "A type of machine learning model" },
        { question: "Which of the following is a common AI programming language?", options: ["Python", "Java", "Ruby", "Swift"], correct: "Python" },
        { question: "What is supervised learning?", options: ["Learning with labeled data", "Learning without data", "Learning through reinforcement", "None of the above"], correct: "Learning with labeled data" },
        { question: "What does 'ML' stand for?", options: ["Machine Learning", "Mechanical Learning", "Modular Learning", "Minimal Learning"], correct: "Machine Learning" },
        { question: "Which algorithm is used for classification tasks?", options: ["Decision Trees", "Sorting", "Search", "Concatenation"], correct: "Decision Trees" }
    ],
    "Animation": [
        { question: "What software is commonly used for 2D animation?", options: ["Adobe Animate", "Excel", "Photoshop", "Notepad"], correct: "Adobe Animate" },
        { question: "What is 'keyframing' in animation?", options: ["Defining start and end points", "Drawing by hand", "Writing scripts", "Editing audio"], correct: "Defining start and end points" },
        { question: "What does FPS stand for in animation?", options: ["Frames Per Second", "Fast Playback Speed", "File Processing System", "None of the above"], correct: "Frames Per Second" },
        { question: "Which is NOT a type of animation?", options: ["Fluid animation", "3D animation", "Stop-motion", "2D animation"], correct: "Fluid animation" },
        { question: "What is 'rigging' in 3D animation?", options: ["Creating a skeleton for characters", "Adding colors", "Rendering the final image", "Drawing by hand"], correct: "Creating a skeleton for characters" }
    ],
    // Add additional learning tracks here...
};

// Function to randomly select a question from the track
function getRandomQuizQuestion(track) {
    const questions = quizQuestions[track];
    if (!questions) {
        return { question: "No questions available for this track.", options: [], correct: null };
    }
    return questions[Math.floor(Math.random() * questions.length)];
}

// Generate Quiz button event listener
document.getElementById("generateQuizBtn").addEventListener("click", () => {
    const track = document.getElementById("learningTrack").value;
    if (!track) return alert("Please select a learning track");

    const questionData = getRandomQuizQuestion(track);
    displayQuiz(questionData);
});

// Display the selected quiz question with answer options
function displayQuiz(questionData) {
    const quizContainer = document.getElementById("quizContainer");
    quizContainer.innerHTML = `
        <p class="font-semibold">${questionData.question}</p>
        ${questionData.options.map(option => `
            <div>
                <input type="radio" name="quizOption" value="${option}">
                <label>${option}</label>
            </div>
        `).join("")}
        <button id="submitAnswerBtn" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-400 mt-4">Submit Answer</button>
    `;

    // Add event listener for submitting answer
    document.getElementById("submitAnswerBtn").addEventListener("click", () => {
        checkAnswer(questionData.correct);
    });
}

// Function to check if the selected answer is correct
function checkAnswer(correctAnswer) {
    const selectedOption = document.querySelector('input[name="quizOption"]:checked');
    if (!selectedOption) return alert("Please select an answer.");

    const userAnswer = selectedOption.value;
    const resultMessage = userAnswer === correctAnswer ? "Correct! 🎉" : `Incorrect. The correct answer is: ${correctAnswer}.`;
    
    // Display the result message
    const quizContainer = document.getElementById("quizContainer");
    quizContainer.innerHTML += `<p class="mt-4 font-semibold">${resultMessage}</p>`;
}

// Typing indicator functions for chatbot responses
function showTypingIndicator() {
    const chatDisplay = document.getElementById("chatDisplay");
    const typingElem = document.createElement("div");
    typingElem.id = "typingIndicator";
    typingElem.className = "flex space-x-1 mb-2";
    typingElem.innerHTML = `
        <div class="typing-indicator"></div>
        <div class="typing-indicator"></div>
        <div class="typing-indicator"></div>
    `;
    chatDisplay.appendChild(typingElem);
    chatDisplay.scrollTop = chatDisplay.scrollHeight;
}

function hideTypingIndicator() {
    const typingElem = document.getElementById("typingIndicator");
    if (typingElem) typingElem.remove();
}

// Chatbot Send button event listener
document.getElementById("sendBtn").addEventListener("click", async () => {
    const userInput = document.getElementById("userInput").value;
    if (!userInput.trim()) return;

    addMessageToChat("User", userInput);
    document.getElementById("userInput").value = ""; // Clear input
    showTypingIndicator(); // Show typing indicator

    // Simulate a response from the bot with a static reply
    setTimeout(() => {
        hideTypingIndicator(); // Hide typing indicator
        addMessageToChat("Bot", "This is a static response for demonstration purposes.");
    }, 2000);
});

// Append a message to the chat display
function addMessageToChat(sender, message) {
    const chatDisplay = document.getElementById("chatDisplay");
    const messageElem = document.createElement("div");
    messageElem.className = sender === "User" ? "text-right" : "text-left";
    messageElem.innerHTML = `<p class="p-2 ${sender === "User" ? 'bg-blue-500 text-white' : 'bg-gray-300'} rounded mb-2 inline-block">${message}</p>`;
    chatDisplay.appendChild(messageElem);
    chatDisplay.scrollTop = chatDisplay.scrollHeight;
}

// Dark Mode Toggle Logic
const body = document.body;
const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {
    if (body.classList.contains("dark-mode")) {
        body.classList.remove("dark-mode");
        body.classList.add("light-mode");
    } else {
        body.classList.remove("light-mode");
        body.classList.add("dark-mode");
    }
});

// Placeholder buttons for future features
document.getElementById("progressBtn").addEventListener("click", () => {
    alert("Viewing progress - feature coming soon!");
});

document.getElementById("leaderboardBtn").addEventListener("click", () => {
    alert("Viewing leaderboard - feature coming soon!");
});

document.getElementById("quizHistoryBtn").addEventListener("click", () => {
    alert("Viewing quiz history - feature coming soon!");
});

document.getElementById("dailyQuizBtn").addEventListener("click", () => {
    alert("Starting daily quiz challenge - feature coming soon!");
});

document.getElementById("feedbackBtn").addEventListener("click", () => {
    alert("Submitting feedback - feature coming soon!");
});

document.getElementById("bookmarkBtn").addEventListener("click", () => {
    alert("Viewing bookmarks - feature coming soon!");
});

document.getElementById("newTracksBtn").addEventListener("click", () => {
    alert("Viewing new tracks - feature coming soon!");
});
