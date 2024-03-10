fetch("./data.json")
.then(response => response.json())
.then(myQuizzes => {
    const selectedQuiz = myQuizzes.quizzes[localStorage.getItem('selectedQuizType')];
    loadQuiz(selectedQuiz);
});

function loadQuiz(quiz) {
    const quizTitleDiv = document.getElementById("quizTitle");
    const container = document.getElementById("quizContainer");

    quizTitleDiv.innerHTML = '';
    container.innerHTML = '';

    const quizTitle = document.createElement("h1");
    quizTitle.classList.add("quiz-heading");
    quizTitle.innerText = quiz.title;
    quizTitleDiv.appendChild(quizTitle);

    Object.keys(quiz).forEach(key => {
        if(key.startsWith("question")) {
            const questionObj = quiz[key];
            const questionContainer = document.createElement("div");
            questionContainer.classList.add("question-container");

            const questionTitle = document.createElement("h2");
            questionTitle.classList.add("question");
            questionTitle.innerText = questionObj.question;
            questionContainer.appendChild(questionTitle);

            const answersDiv = document.createElement("div");
            answersDiv.classList.add("answers");

            questionObj.answers.forEach(answer => {
                const answerDiv = document.createElement("div");
                answerDiv.classList.add("answer");
                
                const answerInput = document.createElement("input");
                answerInput.type = "radio";
                answerInput.name = key;
                answerInput.id = answer;
                answerInput.value = answer;

                const answerLabel = document.createElement("label");
                answerLabel.htmlFor = answer;
                answerLabel.innerText = answer;

                answerDiv.appendChild(answerInput);
                answerDiv.appendChild(answerLabel);
                answersDiv.appendChild(answerDiv);
            });

            questionContainer.appendChild(answersDiv);
            container.appendChild(questionContainer);
        }
    });

    const submitButton = document.createElement("button");
    submitButton.classList.add("btn", "btn-primary", "submit-button");
    submitButton.innerText = "Submit";
    submitButton.addEventListener('click', function() {
        console.log("Congratulations! Your responses have been successfully submitted!");
    });
    container.appendChild(submitButton);
}