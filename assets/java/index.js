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
        },
        {
            question: "Which of these skills belong to this Tinker?",
            choices: ["Cog","Timberchain","Rearm","Rocket Missile"],
            answer: 2
        },
        {
            question: "How many hero kills are needed for a 'Rampage'?",
            choices: ["2","3","4","5"],
            answer: 3
        }
    ];

    var correct = 0;
    var wrong = 0;
    var time = 25;
    var triviaStatus = false;
    var randQuestion;
    var index; 
    var usedQuestions = [];

    $("#reset").hide();
    $(".game").hide();
    $("#next").hide();
    

    $("#start").on("click",function () {

        $("#timeLeft").text("Time Remaining: " + 25)
        $("#start").hide();
        $(".game").show();


        selectQuestion();
        startTimer();

    })

    $("#reset").on("click", function () {
        
        // refreshes page
        location.reload();
        
    })


    $("#next").on("click", function () {
        $("#timeLeft").text("Time Remaining: " + 25)
        removeQuestion();
    })


    function selectQuestion () {
        
        index = Math.floor(Math.random() * haha.length); // random number from total objects in array
        randQuestion = haha[index]; // uses random number to select object in array
        usedQuestions.push(randQuestion);
        haha.splice(haha.indexOf(randQuestion), 1 );
        usedTotal = usedQuestions.length;

        $("#question").html(randQuestion.question); // dispalys question
        $("#next").hide();

        if (usedQuestions != haha.length) {
            for (i = 0; i <randQuestion.choices.length; i++) {
                var userOptions = $("<li>");
                userOptions.addClass("list-group-item list-group-item-action answerOptions");
                userOptions.html(randQuestion.choices[i]);
                userOptions.attr("data-number", i);
                $("#choices").append(userOptions);
            }

                    // check if the user selected correct answer
            $(".answerOptions").on("click", function () {
                userPick = parseInt($(this).attr("data-number"));

                if (userPick === randQuestion.answer) {
       
                    correct++;
                    $("#correct").text(correct);
                    stopTimer();

                    if (usedTotal !== 4) {
                        $("#next").show();
                        // prevent user from selecting another option
                        $(".answerOptions").off('click');
                        console.log(usedTotal);
                    }

                    else {

                        $(".game").hide();
                        $("#next").hide();
                        $("#score").show();
                        $("#reset").show();

                        for (i=0; i < usedTotal; i++) {
                            haha.push(usedQuestions[i]);
                        }
                    }

                }

                else {
                    wrong++;
                    $("#wrong").text(wrong);
                    stopTimer();

                    if (usedTotal !== 4) {
                        $("#next").show();
                        // prevent user from selecting another option
                        $(".answerOptions").off('click');
                        console.log(usedTotal);
                    }

                    else {

                        $(".game").hide();
                        $("#next").hide();
                        $("#score").show();
                        $("#reset").show();

                        for (i=0; i < usedTotal; i++) {
                            haha.push(usedQuestions[i]);
                        }
                    }

                }
                
            })
        }
        
    }

    function removeQuestion() {
        $("#question").empty();
        $("#choices").empty();
        selectQuestion();
        startTimer();
    }
    // -1 sec every interval
    function startTimer() {

        time = 25;

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
      

        if (timeNum === 0) {
            wrong++;
            $("#wrong").text(wrong);
            stopTimer();
            $("#next").show();
        }


    }

    function stopTimer() {
        clearInterval(countdown);
        triviaStatus = false;
    }

})    