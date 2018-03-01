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
            stop();
            i++;
            wrongAnswers++;
            setTimeout(gameLoop, 2000);

        }
    });

    function gameLoop() {
        $("#gameScreen").show();
        $("#restart").hide();
        $("#resultsScreen").hide();
        $("#show-number").show();
        populateDOM(allQuestions[i])
        run();
    }

    //  When the stop button gets clicked, run the stop function.
    //  When the resume button gets clicked, execute the run function.    

    $("#answers").on("click", stop);

    $("#restart").on("click", function () {
        $("#gameScreen").show();
        $("#restart").hide();
        $(".counter").hide();
        $("#show-number").show();
        unanswered = 0;
        correctAnswers = 0;
        wrongAnswers = 0;
        i = 0;
        gameLoop();

    });

    function run() {
        number = 10;
        clearInterval(intervalId);
        intervalId = setInterval(decrement, 1000);
    }

    //  The decrement function.//  Decrease number by one.
    function decrement() {
        number--;
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
            stop();
            i++;
            unanswered++;
            setTimeout(gameLoop, 2000);
        }

    }

    //  The stop function and reset the timer
    function stop() {
        clearInterval(intervalId);
        number = 10;
    }

    //register click for correct answer
    function populateDOM(currentQuestion) {
        if (allQuestions.length >= (i + 1)) {
            console.log("I: " + i + " All Q: " + allQuestions.length);
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
        $("#gameScreen").hide();
        $("#restart").show();
        $(".counter").show();
        $("#show-number").hide();
        $("#correctAnswers").text("Correct Answers: " + correctAnswers);
        $("#wrongAnswers").text("Wrong Answers: " + wrongAnswers);
        $("#unanswered").text("Unanswered: " + unanswered);
    }



});


    //  Interval Demonstration
    //  Set our number counter to 100.

    //  Variable that will hold our interval ID when we execute
    //  the "run" function

    // //  When the stop button gets clicked, run the stop function.
    // $("#stop").on("click", stop);
    // //  When the resume button gets clicked, execute the run function.
    // $("#resume").on("click", run);
    // //  The run function sets an interval
    // //  that runs the decrement function once a second.
    // //  *****BUG FIX******** 
    // //  Clearing the intervalId prior to setting our new intervalId will not allow multiple instances.
    // function run() {
    //     clearInterval(intervalId);
    //     intervalId = setInterval(decrement, 1000);
    // }
    // //  The decrement function.
    // function decrement() {
    //     //  Decrease number by one.
    //     number--;
    //     //  Show the number in the #show-number tag.
    //     $("#show-number").html("<h2>" + number + "</h2>");
    //     //  Once number hits zero...
    //     if (number === 0) {
    //         //  ...run the stop function.
    //         stop();
    //         //  Alert the user that time is up.
    //         alert("Time Up!");
    //         // i++;
    //         gameLoop();
    //     }

    // }
    // //  The stop function
    // function stop() {
    //     //  Clears our intervalId
    //     //  We just pass the name of the interval
    //     //  to the clearInterval function.
    //     clearInterval(intervalId);
    // }
    // //  Execute the run function.
    // run();
    // //
