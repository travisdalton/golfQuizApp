const STORE = [
        //1
        {
        
            question: "Modern golf was popularized in around the 15th century, in which country?",
            answers: [
                "Ireland",
                "England", 
                "Scotland",
                "America"
            ],
            correctAnswer: "Scotland"
        },
        //2
        {
            question: "If you take a re-do on your shot, this is called what?",
            answers: [
                "Cheating",
                "Fore",
                "Do-over",
                "Mulligan"
            ],
            correctAnswer: "Mulligan"
        },
        //3
        {
            question: "What do you call the predetermined number of shots it would take a scratch golfer to complete a hole, round, or tournament?",
            answers: [
                "Par",
                "Fore",
                "Birdie",
                "Unattainable"
            ],
            correctAnswer: "Par"
        },
        //4
        {
            question: "What is it called when someone scores one under par on a hole?",
            answers: [
                "Eagle",
                "Birdie",
                "Dove",
                "Osprey"
            ],
            correctAnswer: "Birdie"
        },
        //5
        {
            question: "When a group reaches the green, who gets to putt first?",
            answers: [
                "The player closest to the hole",
                "The player furthest from the hole",
                "The player that reached the green first",
                "The player that reached the green last"
            ],
            correctAnswer: "The player furthest from the hole"
        },
        //6
        {
            question: "Which of the following is not a Major?",
            answers: [
                "The Masters",
                "The Canadian Open",
                "The US Open",
                "The Open"
            ],
            correctAnswer: "The Canadian Open"
        },
        //7
        {
            question: "Which of the following handicaps indicates the best golfer?",
            answers: [
                "0",
                "12",
                "18",
                "27"
            ],
            correctAnswer: "0"
        },
        //8
        {
            question: "Who is the winningest golfer of all time?",
            answers: [
                "Sam Snead",
                "Tiger Woods",
                "Sam Snead and Tiger Woods are tied",
                "Neither Sam Snead nor Tiger Woods"
            ],
            correctAnswer: "Sam Snead and Tiger Woods are tied"
        }
    ];

    //variables to store the score and question info
    let score = 0;
    let questionNumber = 0;

    //creating/displaying each question
    function generateQuestion() {
        if (questionNumber < STORE.length) {
         return createThing(questionNumber);
      } else {
        $('.questionBox').hide();
        finalScore();
        $('.questionNumber').text(8);
        }
    }

    //update the score variable by one and update the displayed score
    function updateScore() {
        score++;
        $('.score').text(score);
    }

    //update the question variable by one and update the displayed question number
    function updateQuestionNumber() {
        questionNumber++;
        $('.questionNumber').text(questionNumber + 1);
    }

    //reset score and question number variables and visible text
    function resetStats() {
        score = 0;
        questionNumber = 0;
        $('.score').text(0);
        $('.questionNumber').text(0);
    }

    //start the quiz and hide the start and response and final score
    function startQuiz() {
        $('.altBox').hide();
        $('.quizStart').on('click', '.teeOff', function(event) {
            $('.quizStart').hide();
            $('.questionNumber').text(1);
            $('.questionBox').show();
            $('.questionBox').prepend(generateQuestion());
        });
    }

    //submit the selected answer and verify then go to either correct or incorrect answer
    function submitAnswer() {
        $('.teeBox').on('submit', function(event) {
            event.preventDefault();
            $('.altBox').hide();
            $('.response').show();
            let selected = $('input:checked');
            let answer = selected.val();
            let correct = STORE[questionNumber].correctAnswer;
            if (answer === correct) {
                correctAnswer();
            } else {
                wrongAnswer();
            }
        })
    }

    //creates html for each question (DIFFICULT SECTION)
    function createThing(questionIndex) {
        let formMaker = $(
            `<form>
                <fieldset>
                    <legend class = "questionText">${STORE[questionIndex].question}</legend>
                </fieldset>
            <form>`)
        let fieldSelector = $(formMaker).find('fieldset');

        STORE[questionIndex].answers.forEach(function (answerValue, answerIndex) {
            $(`<label class="progressSoFar" for = "${answerIndex}">
                <input class = "radio" type = "radio" id = "${answerIndex}" value = "${answerValue}" name = "answer" required>
                <span>${answerValue}</span>
                </label>`).appendTo(fieldSelector);
        });
        $(`<button type = "submit" class = "submitButton button">Submit</button>`)
        .appendTo(fieldSelector);
        return formMaker;
    }


    //if answer is correct provide feedback
    function correctAnswer() {
        $('.response').html(
            `<h2>That's Correct!</h2>
            <img src="images/philThumbsUp.jpg" alt="Phil Mickelson giving thumbs up" class="images" width="200px">
            <p class="progressSoFar">You're headed for the Tour!</p>
            <button type="button" class="nextButton button">Next</button>`
        );
        updateScore();
    }

    //if answer is incorrect provide feedback
    function wrongAnswer() {
        $('.response').html(
            `<h2>Fore! You really shanked that one...</h2>
            <img src="images/patrickReedBrokeClub.jpg" alt="Patrick Reed breaks club over his knee" class="images" width="200px">
            <p class="progressSoFar">The right answer was:</p>
            <p class="progressSoFar">${STORE[questionNumber].correctAnswer}</p>
            <button type="button" class="nextButton button">Next</button>`
        )
    }

    //generate next question
    function nextQuestion() {
        $('.teeBox').on('click', '.nextButton', function(event) {
            $('.altBox').hide();
            $('.questionBox').show();
            updateQuestionNumber();
            $('.questionBox form').replaceWith(generateQuestion());
        });
    }

    //final score

    function finalScore() {
        $('.final').show();

        const perfect = [
            "You're the GOAT!",
            'images/tigerFistPump.jpg',
            'Tiger Woods fist pump',
            "You're headed for the tour!"
        ]

        const good = [
            "Not Bad!",
            'images/jackAugusta',
            'Jack Nicklaus celebrating 1986 Masters',
            'Better head to the range to polish up a few things!'
        ]

        const bad = [
            "Maybe you're left-handed?",
            'images/tigerDUI',
            'Tiger Woods mugshot',
            'Maybe you should try bowling instead.'
        ]

        if (score > 7) {
            array = perfect;
        } else if (score < 8 && score >= 4) {
            array = good;
        } else {
            array = bad;
        }
        return $('.final').html(
            `<h2>${array[0]}</h2>
            <img src=${array[1]}" alt=${array[2]} class="images">
            <h3>You got ${score} / 8</h3>
            <p class="progressSoFar">${array[3]}</p>
            <button type="submit" class="restartButton button">Restart</button>`
        );
    }

    //restarting the quiz
    function restartQuiz () {
        $('.teeBox').on('click', '.restartButton', function(event) {
            event.preventDefault();
            resetStats();
            $('.altBox').hide();
            $('.quizStart').show();
        });
    }

    //run all
    function runQuiz() {
        startQuiz();
        generateQuestion();
        submitAnswer();
        nextQuestion();
        restartQuiz();
    }


    $(runQuiz);







