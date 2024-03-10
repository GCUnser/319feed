fetch("./data.json")
.then(response => response.json())
.then(myQuizzes => loadQuiz(myQuizzes.quizzes[localStorage.getItem('selectedQuizType')]));

function loadQuiz(quiz) {
    var CardTitle = document.getElementById("quizTitle");

    let quizTitle = document.createElement("h1");
    quizTitle.classList.add("quiz-heading");
    quizTitle.innerText = quiz.title;
    CardTitle.appendChild(quizTitle);

    const container = document.querySelector('.container');

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
                answerInput.setAttribute("type", "radio");
                answerInput.setAttribute("name", key);
                answerInput.setAttribute("id", answer);
                answerInput.setAttribute("value", answer);

                const answerLabel = document.createElement("label");
                answerLabel.setAttribute("for", answer);
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
    container.appendChild(submitButton);

    submitButton.addEventListener('click', function() {
        console.log("Congratulations! Your responses have been successfully submitted!");
    });
}



/*fetch("./data.json")
.then(response => response.json())
.then(myQuizzes => loadQuizzes(myQuizzes));

function loadQuizzes(myQuizzes) {

    var CardTitle = document.getElementById("quizTitle")

    let title = myQuizzes.quizzes[localStorage.getItem('selectedQuizType')].title;

    let AddCardTitle = document.createElement("h1");
    AddCardTitle.classList.add("quiz-heading");
    AddCardTitle.innerHTML=`
        <span class="overline"></span>
        ${title}
        <span class="underline"></span>
    `
    CardTitle.appendChild(AddCardTitle);

   
} // end of function


*/