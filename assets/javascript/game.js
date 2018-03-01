$(document).ready(function () {

    var unanswered = 0;
    var correctAnswers = 0;
    var wrongAnswers = 0;
    var playerGuess;
    var number;




    //make objects for each question
    var questionOne = {
        question: "What's your name?",
        answers: ['A', 'B', 'C', 'D'],
        correctAnswer: 'Allen',
        image: "http://lorempixel.com/400/200/"
    };

    var questionTwo = {
        question: "What's your favorite color?",
        answers: ['Blue', 'Red', 'Yellow', 'Purple'],
        correctAnswer: 'Red',
        image: "http://lorempixel.com/400/200/"
    };

    var questionThree = {
        question: "What is the meaning of life?",
        answers: ['All', 'Kittens', 'Puppies', '42'],
        correctAnswer: 'All',
        image: "http://lorempixel.com/400/200/"
    };

    var intervalId;

    var allQuestions = [questionOne, questionTwo, questionThree];

    var results = ["Correct", "Incorrect", "Time's Up"];

    var i = 0;

    gameLoop();

    $("#show-number").html("<h2>" + number + "</h2>");

    $(".answerButtons").on("click", function () {
        console.log(this.value);

        playerGuess = this.value;

        if (playerGuess === allQuestions[i].correctAnswer) {
            $("#gameScreen").hide();
            $("#resultsScreen").show();
            $("#restart").hide();
            $("#gameScreen").hide();
            $("#show-number").hide();
            $("#progBarWrapper").hide();
            $("#result").text(results[0]);
            $("#resultImg").attr("src", allQuestions[i].image);
            correctAnswers++;
            stop();
            i++;
            setTimeout(gameLoop, 2000);
        }
        else {
            $("#result").text(results[1]);
            $("#resultImg").attr("src", allQuestions[i].image);
            $("#gameScreen").hide();
            $("#resultsScreen").show();
            $("#show-number").hide();
            $("#restart").hide();
            $("#progBarWrapper").hide();
            stop();
            i++;
            wrongAnswers++;
            setTimeout(gameLoop, 2000);

        }
    });

    function gameLoop() {
        $(".counter").hide();
        $("#gameScreen").show();
        $("#restart").hide();
        $("#resultsScreen").hide();
        $("#progBarWrapper").show();
        number = 20;
        $("#show-number").html("<h2>" + number + "</h2>");
        $("#show-number").hide();
        run();
        populateDOM(allQuestions[i])
        
    }

    //  When the stop button gets clicked, run the stop function.
    //  When the resume button gets clicked, execute the run function.    

    $("#answers").on("click", stop);

    $("#restart").on("click", function () {
        $("#gameScreen").show();
        $("#restart").hide();
        $(".counter").hide();
        $("#show-number").hide();
        unanswered = 0;
        correctAnswers = 0;
        wrongAnswers = 0;
        i = 0;
        gameLoop();

    });

    function run() {
        // number = 10;
        clearInterval(intervalId);
        intervalId = setInterval(decrement, 1000);
    }

    //  The decrement function.//  Decrease number by one.
    function decrement() {
        number--;
        updateProgBar();
        //  Show the number in the #show-number tag.
        $("#show-number").html("<h2>" + number + "</h2>");
        //  Once number hits zero...
        if (number === 0) {
            //  ...run the stop function.
            //  Alert the user that time is up.
            $("#result").text(results[2]);
            $("#resultImg").attr("src", allQuestions[i].image);
            $("#gameScreen").hide();
            $("#show-number").hide();
            $("#resultsScreen").show();
            $("#progBarWrapper").hide();
            stop();
            i++;
            unanswered++;
            setTimeout(gameLoop, 2000);
        }

    }

    //  The stop function and reset the timer
    function stop() {
        clearInterval(intervalId);
        number = 20;
    }

    //register click for correct answer
    function populateDOM(currentQuestion) {
        if (allQuestions.length > i ){
            $("#question").text(currentQuestion.question);
            $("#A").text(currentQuestion.answers[0]);
            $("#B").text(currentQuestion.answers[1]);
            $("#C").text(currentQuestion.answers[2]);
            $("#D").text(currentQuestion.answers[3]);
            $("#A").attr("value", currentQuestion.answers[0]);
            $("#B").attr("value", currentQuestion.answers[1]);
            $("#C").attr("value", currentQuestion.answers[2]);
            $("#D").attr("value", currentQuestion.answers[3]);
        }
        else writeStats();
    }


    function writeStats() {
        stop();
        $("#progBarWrapper").hide();
        $("#gameScreen").hide();
        $("#restart").show();
        $(".counter").show();
        $("#show-number").hide();
        $("#correctAnswers").text("Correct Answers: " + correctAnswers);
        $("#wrongAnswers").text("Wrong Answers: " + wrongAnswers);
        $("#unanswered").text("Unanswered: " + unanswered);
    }



    function updateProgBar() {

        $("#progBar").attr("aria-valuenow",number);
        $("#progBar").attr("style","width:"+number*5+"%");

    }

});