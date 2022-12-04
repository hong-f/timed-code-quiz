// var declares to return elements within document to match highscore, clear, and go back.
var highScore = document.querySelector("#highScore");
var clear = document.querySelector("#clear");
var goBack = document.querySelector("#goBack");

// clear score eventlistener 
clear.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});
// retrieves local storage
var allScores = localStorage.getItem("allScores");
allScores = JSON.parse(allScores);

if (allScores !== null) {

    for (var i = 0; i < allScores.length; i++) {

        var createLi = document.createElement("li");
        createLi.textContent = allScores[i].initials + " " + allScores[i].score;
        highScore.appendChild(createLi);

    }
}
// move to index page eventlistner
goBack.addEventListener("click", function () {
    window.location.replace("./index.html");
});