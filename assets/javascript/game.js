$(document).ready(function () {
    /* You'll create a trivia game that shows only one question until the player answers it or their time runs out.
    
    If the player selects the correct answer, show a screen congratulating them for choosing the right option. After a few seconds, display the next question -- do this without user input.
    
    The scenario is similar for wrong answers and time-outs.
    
    If the player runs out of time, tell the player that time's up and display the correct answer. Wait a few seconds, then show the next question.
    If the player chooses the wrong answer, tell the player they selected the wrong option and then display the correct answer. Wait a few seconds, then show the next question.
    On the final screen, show the number of correct answers, incorrect answers, and an option to restart the game (without reloading the page). */

    //make objects for each question
    var questionOne = {
        question: "What's your name?",
        answers: ['Sally', 'Bob', 'Allen', 'Kris'],
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

    var allQuestions = [questionOne, questionTwo, questionThree];

    var playerGuess;

    var results = ["Correct", "Incorrect", "Time's Up"];

    console.log(allQuestions[2]);
    var i = 0;
    ///when player clicks an answer

    var number;

    //move question information into DOM

    gameLoop();

    function gameLoop() {
        $("#gameScreen").show();
        $("#resultsScreen").hide();
        console.log(i);
        number = 10;
        if (i < allQuestions.length) {

            populateDOM(allQuestions[i]);
        }
        $(".answerButtons").on("click", function () {
            console.log("HI");
            console.log(this.value);
            
            playerGuess = this.value;

            if (playerGuess === allQuestions[i].correctAnswer) {
                console.log("CORRECT");
                number = 1;
                decrement();
                $("#gameScreen").hide();
                $("#resultsScreen").show();
                $("#result").text(results[0]);
                $("#resultImg").attr("src", allQuestions[i].image);
                // stop();
                
                // i++;
                // setTimeout (gameLoop, 4000);
                
            }
            else {
                $("#result").text(results[1]);
                $("#resultImg").attr("src", allQuestions[i].image);
                $("#gameScreen").hide();
                $("#resultsScreen").show();
                // stop();
                number = 0;
                // i++;
                // setTimeout (gameLoop, 4000);
            }
        });
        //ALL THE TIMER STUFF
        //  Interval Demonstration
        //  Set our number counter to 100.
        
        //  Variable that will hold our interval ID when we execute
        //  the "run" function
        var intervalId;
        //  When the stop button gets clicked, run the stop function.
        $("#stop").on("click", stop);
        //  When the resume button gets clicked, execute the run function.
        $("#resume").on("click", run);
        //  The run function sets an interval
        //  that runs the decrement function once a second.
        //  *****BUG FIX******** 
        //  Clearing the intervalId prior to setting our new intervalId will not allow multiple instances.
        function run() {
            clearInterval(intervalId);
            intervalId = setInterval(decrement, 1000);
        }
        //  The decrement function.
        function decrement() {
            //  Decrease number by one.
            number--;
            //  Show the number in the #show-number tag.
            $("#show-number").html("<h2>" + number + "</h2>");
            //  Once number hits zero...
            if (number === 0) {
                //  ...run the stop function.
                stop();
                //  Alert the user that time is up.
                alert("Time Up!");
               // i++;
                gameLoop();
            }

        }
        //  The stop function
        function stop() {
            //  Clears our intervalId
            //  We just pass the name of the interval
            //  to the clearInterval function.
            clearInterval(intervalId);
        }
        //  Execute the run function.
        run();
        //

    }


    //register click for correct answer
    function populateDOM(currentQuestion) {
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


});