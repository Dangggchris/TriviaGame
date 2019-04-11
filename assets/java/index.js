$(document).ready(function() {

    var haha = [
        {
            question: "Which of these characters have Int as their primary attribute?",
            choices: ["Zeus","Mars","Arc Warden","Bristleback"],
            answer: 0
        },
        {
            question: "Which of these characters have Str as their primary attribute?",
            choices: ["Viper","Invoker","Anti-Mage","Nightstalker"],
            answer: 3
        }
    ]

    var correct = 0;
    var wrong = 0;
    var time = 25;
    var triviaStatus = false;
    var allQuestions = haha.length;
    var randQuestion;
    var index; 

    $("#reset").hide();
    $(".game").hide();
    

    $("#start").on("click",function () {
        $("#start").hide();
        $(".game").show();
        selectQuestion();
        startTimer();
    })


    function selectQuestion () {
        index = Math.floor(Math.random() * haha.length); // random number from total objects in array
        randQuestion = haha[index]; // uses random number to select object in array


        $("#question").html(randQuestion.question); // dispalys question
        for (i = 0; i <randQuestion.choices.length; i++) {
            var userOptions = $("<li>");
            userOptions.addClass("list-group-item answerOptions");
            userOptions.html(randQuestion.choices[i]);
            userOptions.attr("data-number", i);
            $("#choices").append(userOptions);
        }
    }

    // -1 sec every interval
    function startTimer() {
        if (!triviaStatus) {

            triviaStatus = true;
            countdown = setInterval(decrement, 1000); 
            
        }
    }

    // subtracts 1 from time
    function decrement() {
        time--;

        timeNum = parseInt(time);
        $("#timeLeft").text("Time Remaining: " + time);
        console.log(time);

        if (timeNum === 0) {
            wrong++;
            clearInterval(countdown);
        }


        // if (time === 0);
        // clearInterval(countdown);

    }

})    