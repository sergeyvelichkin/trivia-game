var question1 = {
    name: "What's the capital of Russia?",
    answers: [{ 'Buharest': false }, { 'Moscow': true }, { 'Berlin': false }, { 'New York': false }]
};

var question2 = {
    name: "What's the capital of Great Britain?",
    answers: [{ 'London': true }, { 'Georgia': false }, { 'Nepal': false }, { 'Guacamole': false }]
};

var question3 = {
    name: "What's the capital of Kazahstan?",
    answers: [{ 'Novosibirsk': false }, { 'Paris': false }, { 'Astana': true }, { 'Australia': false }]
};

var question4 = {
    name: "What's the capital of France?",
    answers: [{ 'Moscow': false }, { 'Minsk': false }, { 'Paris': true }, { 'Milan': false }]
};

var question5 = {
    name: "What's the capital of Italy?",
    answers: [{ 'Milan': false }, { 'Rome': true }, { 'Nepal': false }, { 'Moscow': false }]
};

var questArray = [question1, question2, question3, question4, question5];

var intervalId;

// Timer object, its easier to track timer when it's object
var timer = {
    time: 31,
    clockIsRunning: false,
    run: function () {
        timer.clockIsRunning = true;
        clearInterval(intervalId);
        intervalId = setInterval(this.decrem, 1000);
    },
    decrem: function () {

        timer.time--;
        document.getElementById("cco").innerHTML = timer.time;
        if (timer.time === 0) {
            wrongAnswers++;
            makePage();

        }
    },
    reset: function () {
        timer.clockIsRunning = false;
        clearInterval(intervalId);
        timer.time = 31;
    }

}


var i = 0; // counter

var rigthAnswers = 0;
var wrongAnswers = 0;
var toAnswer = questArray;


// Function to display when you click right answer
function showAnswerTrue() {
        $(".questWindow").remove();

        $("body").append(`

        <div class='questWindow'>
            <h1 class='text-center'> Well Done!!!</h1>
            <h4 class='text-center'> It was the right answer!!</h4>
        </div>`);
}


// Displaying right answer when wrong asnwer was chosen
function showAnswerFalse(trueAnsw) {
    $(".questWindow").remove();

    $("body").append(`

    <div class='questWindow'>
        <h1 class='text-center'> Not right!!</h1>
        <h4 class='text-center'>Right Answer was : ${trueAnsw}</h4>
    </div>`);
}


// Function to find the righ answer in answers array
function findTrueAnsw(answArr){
    for (var j =0; j < answArr.length; j++){
        
        if (answArr[j][Object.keys(answArr[j])[0]]){
            return Object.keys(answArr[j])[0];
        }else{
            continue;
        }
    }
}


//Function to keep track of answers and end game when there is no questions left to answer
function checkAnswer() {
    var textInp = $(this).text();
    var arrNum = parseInt($(this).attr('data'));
    var trueAnsw = findTrueAnsw(toAnswer[i - 1].answers);
    if (toAnswer[i - 1].answers[arrNum][textInp]) {
        rigthAnswers++;
        showAnswerTrue();
        if (i === parseInt(toAnswer.length)) {
            endGame();
        } else {
            setTimeout(makePage,3000);
        };
    }
    else {
        wrongAnswers++;
        showAnswerFalse(trueAnsw);
        if (i === parseInt(toAnswer.length)) {
            endGame();
        } else {
            setTimeout(makePage,3000);
        };
    };
}


// Creating page with questions and answers
function makePage() {

    $(".questWindow").remove();

    $("body").append(`

        <div class='questWindow'>
            <h4 class='text-center'> Time Left : <spand id='cco'></span></h4>
            <h1 class='text-center'> ${toAnswer[i].name} </h1>

            <p class='answer text-center' data='0'>${Object.keys(toAnswer[i].answers[0])[0]}</p>
            <p class='answer text-center' data='1'>${Object.keys(toAnswer[i].answers[1])[0]}</p>
            <p class='answer text-center' data='2'>${Object.keys(toAnswer[i].answers[2])[0]}</p>
            <p class='answer text-center' data='3'>${Object.keys(toAnswer[i].answers[3])[0]}</p>


        </div>`);
    console.log(timer.clockIsRunning);

    if (timer.clockIsRunning) {
        timer.reset();
        timer.run();
    } else {
        timer.run();
    }

    i++;
}


//Start game
function startGame() {

    $(".jumbotron").remove();
    makePage();



}


// End of the game function, displaying how many wrong and wright answers was given
function endGame() {
    $(".questWindow").remove();

    $("body").append(`

        <div class='questWindow'>
            <h1 class='text-center'> END of the GAME</h1>
            <h4 class='text-center'> Yor score is :</h4>

            <p class='answer text-center'>Total right answers : ${rigthAnswers}</p>
            <p class='answer text-center'>Total wrong answers : ${wrongAnswers}</p>


        </div>`);
}

$(document).on("click", ".answer", checkAnswer);
$(document).on("click", ".btn", startGame);