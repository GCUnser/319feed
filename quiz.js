fetch("./data.json")
.then(response => response.json())
.then(myQuizzes => loadQuizzes(myQuizzes));

function loadQuizzes(myQuizzes) {

    var CardTitle = document.getElementById("quizTitle")

    let title = myQuizzes.quizzes[0].title;

    let AddCardTitle = document.createElement("h1");
    AddCardTitle.classList.add("quiz-heading");
    AddCardTitle.innerHTML=`
        <span class="overline"></span>
        ${title}
        <span class="underline"></span>
    `
    CardTitle.appendChild(AddCardTitle);

   
} // end of function


