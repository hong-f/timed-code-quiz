// quiz questions var
var questions = [
    {
        title: "The first index of an array is:",
        choices: ["0", "1", "2", "3"],
        answer: "0"
    },
    {
        title: "The condition in an if / else statement is enclosed within ____.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses"
    },
    {
        title: "Arrays in Javascript can be used to store ____.",
        choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: "all of the above"
    },
    {
        title: "Inside which HTML element do we put the JavaScript?",
        choices: ["<js>", "<javascript>", "<java>", "<script>"],
        answer: "<script>"
    },
    {
        title: "Commonly used data types DO NOT include:",
        choices: ["alerts", "numbers", "booleans", "strings"],
        answer: "alerts"
    },

];
// var declare
var score = 0;
var questionIndex = 0;

// start  
var currentTime = document.querySelector("#currentTime");
var timer = document.querySelector("#startTime");
var questionsDiv = document.querySelector("#questionsDiv");
var container = document.querySelector("#wrapper");

// time left is 15 seconds per question:
var secondsLeft = 90;
// interval time
var holdInterval = 0;
// penalty time
var penalty = 15;
// create new element
var ulCreate = document.createElement("ul");

// starts timer + display on the screen
timer.addEventListener("click", function () {
    
    if (holdInterval === 0) {
        holdInterval = setInterval(function () {
            secondsLeft--;
            currentTime.textContent = "Time: " + secondsLeft;

            if (secondsLeft <= 0) {
                clearInterval(holdInterval);
                allDone();
                currentTime.textContent = "Time's up!";
            }
        }, 1000);
    }
    render(questionIndex);
});

// provides questions and choices to page: 
function render(questionIndex) {
    // clear existing data 
    questionsDiv.innerHTML = "";
    ulCreate.innerHTML = "";
   
    for (var i = 0; i < questions.length; i++) {
     
        var userQuestion = questions[questionIndex].title;
        var userChoices = questions[questionIndex].choices;
        questionsDiv.textContent = userQuestion;
    }
   
    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        questionsDiv.appendChild(ulCreate);
        ulCreate.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}
// compare choices to actual answer
function compare(event) {
    var element = event.target;

    if (element.matches("li")) {

        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");
        // "correct answer" condition
        if (element.textContent == questions[questionIndex].answer) {
            score++;
            createDiv.textContent = "Correct";
    
        } else {
            // penalty
            secondsLeft = secondsLeft - penalty;
            createDiv.textContent = "Wrong";
        }

    }
    // question # user is on = question index
    questionIndex++;

    if (questionIndex >= questions.length) {
        
        allDone();
        createDiv.textContent = "You got  " + score + "out of" + questions.length + " Correct.";
    } else {
        render(questionIndex);
    }
    questionsDiv.appendChild(createDiv);

}
// "all done" section
function allDone() {
    questionsDiv.innerHTML = "";
    currentTime.innerHTML = "";


    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "All Done!"

    questionsDiv.appendChild(createH1);

  
    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");

    questionsDiv.appendChild(createP);

    // final score + time remaining
    if (secondsLeft >= 0) {
        var timeRemaining = secondsLeft;
        var createP2 = document.createElement("p");
        clearInterval(holdInterval);
        createP.textContent = "Your final score is: " + timeRemaining;

        questionsDiv.appendChild(createP2);
    }

    // initials 
    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter your initials: ";

    questionsDiv.appendChild(createLabel);

    // initials input
    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";

    questionsDiv.appendChild(createInput);

    // submit
    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "Submit");
    createSubmit.textContent = "Submit";

    questionsDiv.appendChild(createSubmit);

    //score + initials + local storage eventlistner
    createSubmit.addEventListener("click", function () {
        var initials = createInput.value;

        if (initials === null) {

            console.log("No value entered, please try again.");

        } else {
            var finalScore = {
                initials: initials,
                score: timeRemaining
            }
            console.log(finalScore);
            var allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
            allScores.push(finalScore);
            var newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);
            // routes to final page
            window.location.replace("./highscores.html");
        }
    });

}
