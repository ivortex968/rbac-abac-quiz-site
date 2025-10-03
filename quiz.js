// Quiz questions data
const quizData = [
    {
        question: "What does RBAC stand for?",
        options: ["Role-Based Access Control", "Rule-Based Access Control", "Resource-Based Access Control", "Rights-Based Access Control"],
        correct: 0
    },
    {
        question: "What does ABAC stand for?",
        options: ["Attribute-Based Access Control", "Authorization-Based Access Control", "Advanced-Based Access Control", "Access-Based Authentication Control"],
        correct: 0
    },
    {
        question: "In RBAC, access permissions are assigned based on:",
        options: ["User attributes", "User roles", "Resource attributes", "Environmental conditions"],
        correct: 1
    },
    {
        question: "Which access control model uses policies based on attributes of users, resources, and environment?",
        options: ["RBAC", "DAC", "ABAC", "MAC"],
        correct: 2
    },
    {
        question: "RBAC is best suited for organizations with:",
        options: ["Complex and dynamic access requirements", "Well-defined job functions and hierarchies", "Frequently changing policies", "Minimal security requirements"],
        correct: 1
    },
    {
        question: "Which model provides more fine-grained access control?",
        options: ["RBAC", "ABAC", "Both are equally fine-grained", "Neither provides fine-grained control"],
        correct: 1
    },
    {
        question: "In ABAC, what are the key components used to make access decisions?",
        options: ["Only user roles", "User, resource, action, and environment attributes", "Only resource permissions", "Username and password only"],
        correct: 1
    },
    {
        question: "Which model is generally easier to implement and manage in smaller organizations?",
        options: ["ABAC", "RBAC", "Both are equally easy", "Neither is suitable for small organizations"],
        correct: 1
    },
    {
        question: "ABAC policies can consider which of the following?",
        options: ["Time of day", "User location", "Device type", "All of the above"],
        correct: 3
    },
    {
        question: "In RBAC, if a user changes departments, what typically needs to happen?",
        options: ["Nothing, access remains the same", "User roles need to be updated", "All policies must be rewritten", "The system must be restarted"],
        correct: 1
    },
    {
        question: "Which model can enforce rules like 'Allow access only during business hours'?",
        options: ["Only RBAC", "Only ABAC", "Both RBAC and ABAC", "Neither model supports this"],
        correct: 1
    },
    {
        question: "RBAC implements the principle of:",
        options: ["Least privilege through roles", "Attribute-based decisions", "Open access by default", "Unrestricted permissions"],
        correct: 0
    },
    {
        question: "Which statement is true about ABAC?",
        options: ["It only uses user roles", "It evaluates multiple attributes to make decisions", "It is simpler than RBAC", "It cannot use environmental context"],
        correct: 1
    },
    {
        question: "RBAC role hierarchies allow:",
        options: ["Roles to inherit permissions from other roles", "Users to have unlimited access", "Bypassing all security controls", "Automatic policy generation"],
        correct: 0
    },
    {
        question: "Which model is better for dynamic, context-aware access control?",
        options: ["RBAC", "ABAC", "Both are equally effective", "Neither supports dynamic control"],
        correct: 1
    },
    {
        question: "In an RBAC system, what is a 'role'?",
        options: ["A user's password", "A collection of permissions", "A type of database", "An encryption method"],
        correct: 1
    },
    {
        question: "ABAC is particularly useful for:",
        options: ["Small static organizations", "Organizations with complex, dynamic access requirements", "Systems without any security needs", "Systems that don't need access control"],
        correct: 1
    },
    {
        question: "What is a potential drawback of RBAC?",
        options: ["Too simple to implement", "Role explosion in large organizations", "Cannot assign any permissions", "Provides too much access control"],
        correct: 1
    },
    {
        question: "Which model can easily implement rules based on resource classification levels?",
        options: ["Only RBAC", "Only ABAC", "Both can implement this", "Neither can implement this"],
        correct: 2
    },
    {
        question: "An example of an ABAC policy would be:",
        options: ["All managers have edit access", "Access granted if user.department == resource.department AND time.hour < 18", "Users can only read files", "Everyone has admin access"],
        correct: 1
    }
];

// State management
let currentQuestion = 0;
let score = 0;
let userAnswers = [];

// DOM elements
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultsScreen = document.getElementById('results-screen');
const startBtn = document.getElementById('start-btn');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');
const currentQuestionSpan = document.getElementById('current-question');
const totalQuestionsSpan = document.getElementById('total-questions');
const progressBar = document.getElementById('progress');
const feedbackDiv = document.getElementById('feedback');
const scoreSpan = document.getElementById('score');
const totalSpan = document.getElementById('total');
const scorePercentageSpan = document.getElementById('score-percentage');
const performanceMessage = document.getElementById('performance-message');

// Event listeners
startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', nextQuestion);
restartBtn.addEventListener('click', restartQuiz);

// Initialize
totalQuestionsSpan.textContent = quizData.length;

function startQuiz() {
    startScreen.classList.remove('active');
    quizScreen.classList.add('active');
    loadQuestion();
}

function loadQuestion() {
    const question = quizData[currentQuestion];
    questionText.textContent = question.question;
    currentQuestionSpan.textContent = currentQuestion + 1;
    
    // Update progress bar
    const progress = ((currentQuestion + 1) / quizData.length) * 100;
    progressBar.style.width = progress + '%';
    
    // Clear previous options and feedback
    optionsContainer.innerHTML = '';
    feedbackDiv.innerHTML = '';
    feedbackDiv.className = 'feedback';
    nextBtn.style.display = 'none';
    
    // Create option buttons
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = option;
        button.addEventListener('click', () => selectAnswer(index));
        optionsContainer.appendChild(button);
    });
}

function selectAnswer(selectedIndex) {
    const question = quizData[currentQuestion];
    const buttons = optionsContainer.querySelectorAll('.option-btn');
    
    // Disable all buttons
    buttons.forEach(btn => btn.disabled = true);
    
    // Store user answer
    userAnswers[currentQuestion] = selectedIndex;
    
    // Check if answer is correct
    if (selectedIndex === question.correct) {
        score++;
        buttons[selectedIndex].classList.add('correct');
        feedbackDiv.innerHTML = '<p class="correct-feedback">✓ Correct!</p>';
        feedbackDiv.className = 'feedback correct';
    } else {
        buttons[selectedIndex].classList.add('incorrect');
        buttons[question.correct].classList.add('correct');
        feedbackDiv.innerHTML = '<p class="incorrect-feedback">✗ Incorrect. The correct answer is: ' + question.options[question.correct] + '</p>';
        feedbackDiv.className = 'feedback incorrect';
    }
    
    // Show next button
    nextBtn.style.display = 'block';
}

function nextQuestion() {
    currentQuestion++;
    
    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    quizScreen.classList.remove('active');
    resultsScreen.classList.add('active');
    
    const percentage = Math.round((score / quizData.length) * 100);
    scoreSpan.textContent = score;
    totalSpan.textContent = quizData.length;
    scorePercentageSpan.textContent = percentage;
    
    // Performance message
    let message = '';
    if (percentage === 100) {
        message = '🎉 Perfect! You have mastered RBAC and ABAC concepts!';
    } else if (percentage >= 80) {
        message = '🌟 Excellent! You have a strong understanding of access control models.';
    } else if (percentage >= 60) {
        message = '👍 Good job! You have a solid grasp of the basics.';
    } else if (percentage >= 40) {
        message = '📚 Not bad! Consider reviewing the material to improve your understanding.';
    } else {
        message = '💪 Keep learning! Review the concepts of RBAC and ABAC to strengthen your knowledge.';
    }
    performanceMessage.textContent = message;
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    userAnswers = [];
    resultsScreen.classList.remove('active');
    startScreen.classList.add('active');
    progressBar.style.width = '0%';
}
