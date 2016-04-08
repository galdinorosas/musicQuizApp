$(document).ready(function() {


    $(".userInput").submit(function(e) {
        e.preventDefault();
    });

    $(".timer").runner();

    $('.submitButton').tooltip();

    var questionsAndAnswers = [{
        "question": "Which alternative artist made the song Reptilia?",
        "optionOne": "Franz Ferdinand",
        "optionTwo": "The Strokes",
        "optionThree": "The Killers",
        "optionFour": "Arctic Monkeys",
        "answer": "The Strokes"
    }, {
        "question": "Which English rock band made the song Citizen Erased?",
        "optionOne": "Muse",
        "optionTwo": "Radiohead",
        "optionThree": "Linkin Park",
        "optionFour": "Coldplay",
        "answer": "Muse"
    }, {
        "question": "What is the name of female vocalist in the band No Doubt?",
        "optionOne": "Karen O",
        "optionTwo": "Haley Williams",
        "optionThree": "Gwen Stefani",
        "optionFour": "Florence Welch",
        "answer": "Gwen Stefani"
    }, {
        "question": "Who is the name of the actor in the show Community, who is also the artist in Childish Gambino?",
        "optionOne": "Danny Pudi",
        "optionTwo": "Donald Glover",
        "optionThree": "Joel Mchale",
        "optionFour": "Ken Jeong",
        "answer": "Donald Glover"
    }, {
        "question": "Which group member first left the American hip-hop group N.W.A?",
        "optionOne": "Eazy-E",
        "optionTwo": "Dr. Dre",
        "optionThree": "MC Ren",
        "optionFour": "Ice Cube",
        "answer": "Ice Cube"

    }, {}];

    // This will play the current playing song.

    $(".playButton").on("click", function() {

        $("#songPlaying")[0].play();

    });

    // This pause the current playing song.

    $(".pauseButton").on("click", function() {

        $("#songPlaying")[0].pause();

    });

    $(".visibleQuestion").text(questionsAndAnswers[0].question);
    $(".text1").text(questionsAndAnswers[0].optionOne);
    $(".text2").text(questionsAndAnswers[0].optionTwo);
    $(".text3").text(questionsAndAnswers[0].optionThree);
    $(".text4").text(questionsAndAnswers[0].optionFour);

    var quizLength;

    $(".optionsButton").on("click", function() {

        if ($(".introStartGameContainer").css("display") == "none") {
            $(".timer").runner("toggle");
        }

        if ($(".optionsContainer").css("display") == "none") {
            $(".optionsContainer").show(500);
        } else {
            $(".optionsContainer").slideUp("slow");
        }
    });

    // This is the function to switch the src of the song and to play.
    function songFunction(src) {
        $("#songPlaying")[0].pause();
        $("#songPlaying").prop("src", src);
        $("#songPlaying")[0].volume = 0.5;
        $("#songPlaying")[0].load();
        $("#songPlaying")[0].play();

    }

    var correctAnswers = 0;
    var index = 1;

    // Submit button functionality during the question/answer screen.
    $(".submitButton").on("click", function() {

        if ($('ul input').is(':checked')) {
            if (index < 6) {
                $(".visibleQuestion").text(questionsAndAnswers[index].question);
                $(".text1").text(questionsAndAnswers[index].optionOne);
                $(".text2").text(questionsAndAnswers[index].optionTwo);
                $(".text3").text(questionsAndAnswers[index].optionThree);
                $(".text4").text(questionsAndAnswers[index].optionFour);
            }

            if ($("#option1").is(":checked") && questionsAndAnswers[index - 1].optionOne === questionsAndAnswers[index - 1].answer) {

                correctAnswers++;

            } else if ($("#option2").is(":checked") && questionsAndAnswers[index - 1].optionTwo === questionsAndAnswers[index - 1].answer) {

                correctAnswers++;

            } else if ($("#option3").is(":checked") && questionsAndAnswers[index - 1].optionThree === questionsAndAnswers[index - 1].answer) {

                correctAnswers++;
            } else if ($("#option4").is(":checked") && questionsAndAnswers[index - 1].optionFour === questionsAndAnswers[index - 1].answer) {

                correctAnswers++;
            }

            index++;

            $("#currentQuestionNumber").text(index);

            // The code below will play the song related to the question.
            switch (index) {
                case 2:
                    songFunction("sound/citizenErased.mp3");
                    break;
                case 3:
                    songFunction("sound/hellaGood.mp3");
                    break;
                case 4:
                    songFunction("sound/sweatpants.mp3");
                    break;
                case 5:
                    songFunction("sound/straightOuttaCompton.mp3");
                    break;
                case 6:
                    // This will have the question/answer screen dissapear and the end screen display.
                    quizLength = $(".timer").runner("lap");
                    $(".timer").runner("reset", true);

                    console.log(quizLength);

                    $("#currentQuestionNumber").text("DONE");
                    $("#quizTime").text(quizLength);

                    $(".questionAndAnswerContainer").fadeOut(800, function() {
                        $("#totalCorrectAnswers").text(correctAnswers + "/5");
                        $(".endContainer").fadeIn(800);
                    });
                    break;
            }

            // This will uncheck all the radio buttons after the user clicks submit.
            $("#option1").prop("checked", false);
            $("#option2").prop("checked", false);
            $("#option3").prop("checked", false);
            $("#option4").prop("checked", false);

        } else {
            return;
        }
    });

    // The start game button will display the question/answer screen and start to play music.

    $(".startGameButton").on("click", function() {

        $(".introStartGameContainer").fadeOut(800, function() {

            $(".questionAndAnswerContainer").fadeIn(800);
        });

        songFunction("sound/Reptilia.mp3");

        $("#songPlaying")[0].volume = 0.5;
        $("#songPlaying")[0].load();
        $("#songPlaying")[0].play();
        $("#currentQuestionNumber").text(index);
        $(".timer").runner("start");

    });

    // This is the new game button functionality. Resets all values to the original settings and displays the intro container.

    $(".newGameButton, .optionsNewGameButton").on("click", function() {
        $(".timer").runner("reset", true);
        quizLength = 0;


        $(".visibleQuestion").text(questionsAndAnswers[0].question);
        $(".text1").text(questionsAndAnswers[0].optionOne);
        $(".text2").text(questionsAndAnswers[0].optionTwo);
        $(".text3").text(questionsAndAnswers[0].optionThree);
        $(".text4").text(questionsAndAnswers[0].optionFour);

        correctAnswers = 0;
        index = 1;
        $(".optionsContainer").slideUp(600);


        $(".questionAndAnswerContainer").css("display", "none");
        $(".endContainer").css("display", "none");

        $(".introStartGameContainer").fadeIn(800);

        $("#songPlaying")[0].pause();
        $("#currentQuestionNumber").text("#");

    });

    // This code is to allow the user to click on the answer box to check the radio button.
    $("#answerOne").on("click", function(event) {
        console.log("check", $(event.target).attr('value'));
        $("#option1").prop("checked", true);

    });

    $("#answerTwo").on("click", function() {
        console.log("check");
        $("#option2").prop("checked", true);

    });

    $("#answerThree").on("click", function() {
        console.log("check");
        $("#option3").prop("checked", true);

    });

    $("#answerFour").on("click", function() {
        console.log("check");
        $("#option4").prop("checked", true);

    });

});
