const newLocal = "Sachiko";
const questions = [
    {
        question: "Who did Yasu date before in highschool?",
        answers: [
            { text: "Reira", correct: true},
            { text: "Jun", correct: false},
            { text: "Nana", correct: false},
            { text: "Sachiko", correct: false},
        ]
    },
    {
        question: "Who's Ren's idol?'",
        answers: [
            { text: "Gene Simmons", correct: false},
            { text: "Gackt", correct: false},
            { text: "Sid Vicious", correct: true},
            { text: "Axel Rose", correct: false},
        ]
    },
    {
        question: "Nana's band signs a full contract with..?",
        answers: [
            { text: "Titus Records", correct: false},
            { text: "Gaia Records", correct: true},
            { text: "Sheeba Records", correct: false},
            { text: "Star Records", correct: false},
        ]
    },
    {
        question: "Who's Nana's favorite designer'?",
        answers: [
            { text: "Vera Wang", correct: false},
            { text: "Chanel", correct: false},
            { text: "Dior", correct: false},
            { text: "Vivienne Westwood", correct: true},
        ]
    },
    {
        question: "What is the name of Nana's band?",
        answers: [
            { text: "Trapnest", correct: false},
            { text: "Artemis Red", correct: false},
            { text: "White Cobras", correct: false},
            { text: "Black Stones", correct: true},
        ]
    },
    {
        question: "What episode did Ren propose to Nana?",
        answers: [
            { text: "36", correct: false},
            { text: "44", correct: true},
            { text: "27", correct: false},
            { text: "21", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.
    question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button")
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();