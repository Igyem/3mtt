// quizLogic.js

function generateQuiz(userProgress) {
    const questions = [
        { question: "What is 2 + 2?", options: ["3", "4", "5"], answer: "4" },
        { question: "What is the capital of France?", options: ["Berlin", "Paris", "Rome"], answer: "Paris" }
    ];
    return questions; // Basic example; in real case, use userProgress to vary difficulty
}

export { generateQuiz };
