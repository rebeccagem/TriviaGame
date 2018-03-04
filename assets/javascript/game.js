$(document).ready(function () {

    var unanswered = 0;
    var correctAnswers = 0;
    var wrongAnswers = 0;
    var playerGuess;
    var number;




    //make objects for each question
    var questionOne = {
        question: "Which one of Jupiter’s moons is the most Earth-like?",
        answers: ['Io', 'Ganymede', 'Europa', 'Callisto'],
        correctAnswer: 'Europa',
        image: "https://media.giphy.com/media/86JRLeRAE0oXm/giphy.gif"
    };

    var questionTwo = {
        question: "Which one of these planets does not have rings?",
        answers: ['Neptune', 'Venus', 'Saturn', 'Uranus'],
        correctAnswer: 'Venus',
        image: "https://media.giphy.com/media/MFRBVdwxheLKw/giphy.gif"
    };

    var questionThree = {
        question: "Which galaxy is on course to collide with ours?",
        answers: ['Milky Way', 'Messier 81', 'Segue', 'Andromeda'],
        correctAnswer: 'Andromeda',
        image: "https://media.giphy.com/media/lHWFnpn51Jy92/giphy.gif"
    };

    var questionFour = {
        question: "How long does it take for sunlight to reach earth?",
        answers: ['8 Minutes', '2 Hours', '6.5 Seconds', '1 Year'],
        correctAnswer: '8 Minutes',
        image: "https://media.giphy.com/media/VfQputoAtpIyc/giphy.gif"
    };

    var questionFive = {
        question: "What is at the center of our galaxy, the Milky Way?",
        answers: ['Earth', 'Black Hole', 'The Sun', 'Supernova'],
        correctAnswer: 'A Black Hole',
        image: "https://media.giphy.com/media/r6TMBbTRPQbHW/giphy.gif"
    };

    var intervalId;

    var allQuestions = [questionOne, questionTwo, questionThree, questionFour, questionFive];

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
            setTimeout(gameLoop, 6000);
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