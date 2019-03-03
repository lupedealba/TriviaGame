var QUIZ_LENGTH = 12;

var myQuestions = [
    {
        question: "What is the name of the dragon in the movie MULAN?",
        answers: {
            a: 'Flounder',
            b: 'Mushu',
            c: 'Niko'
        },
        correctAnswer: 'b'
    },
    {
        question: "What is the name of the man that wanted to marry POCAHONTAS?",
        answers: {
            a: 'Jejea',
            b: 'Naruto',
            c: 'Kokoum'
        },
        correctAnswer: 'c'
    },
    {
        question: "What is the name of the crab that babysat The Little Mermaid?",
        answers: {
            a: 'John',
            b: 'Sebastian',
            c: 'Mr.Crabs'
        },
        correctAnswer: 'b'
    },
    {
        question: "What is the name of the bird that babysat The Lion King?",
        answers: {
            a: 'Zazu',
            b: 'Kokoum',
            c: 'Petree'
        },
        correctAnswer: 'a'
    },
    {
        question: "What is the name of the snake on the jungle book?",
        answers: {
            a: 'Zazu',
            b: 'Kaa',
            c: 'Baloo'
        },
        correctAnswer: 'b'
    },
    {
        question: "What is the name of the moose on the movie Frozen?",
        answers: {
            a: 'Bagheera',
            b: 'Mushu',
            c: 'Sven'
        },
        correctAnswer: 'c'
    }
];
///

function generateQuiz(questions){

        function showQuestions(questions){
        
        var output = ['<form action="/" id="quizForm">'];
        var answers;
        
        for(var i=0; i<questions.length; i++){

            answers = [];

            for(var letter in questions[i].answers){

                answers.push(
                    '<label>'
                        + '<input type="radio" name="question'+i+'" value="'+letter+'">'
                        + "&nbsp;" + letter + ': '
                        + questions[i].answers[letter] + "&nbsp;"
                    + '</label>'
                );
            }

            output.push(
                '<br/><div class="question">' + questions[i].question + '</div>'
                + '<div class="answers">' + answers.join('') + '</div>'
            );
        }

                output.push('<button id="submit" class="btn btn-primary">Get Results</button></form>')

        $("#quiz").html(output.join(''));
    }

        function showResults(questions){
                

        var userAnswer = '';
        var numCorrect = 0;

        for(var i=0; i<questions.length; i++){

                        userAnswer = $("#quiz").find('.answers').eq(i).find('input[name=question'+i+']:checked').val();
                        console.log(i, userAnswer);

            if(userAnswer===questions[i].correctAnswer){

                numCorrect++;

                $("#quiz").find('.answers').eq(i).attr("style", "color: lightgreen");
            }
            else{
                $("#quiz").find('.answers').eq(i).attr("style", "color: red");
            }
        }

        $("#results").html(numCorrect + ' out of ' + questions.length);
    }
        showQuestions(questions);

        $("#submit").click(processQuiz);

        function processQuiz(e){
                e.preventDefault();
                clearInterval(quizTimer);
                showResults(questions);
        }
}

function startQuiz() {
        $("#start").hide();
        $("#quiz").show();
       
        var countdown = QUIZ_LENGTH+1;

        quizTimer = setInterval(function(){
                if( countdown<=QUIZ_LENGTH+1 && countdown>=1) {
                        countdown--;
                        $("#timer").text(countdown);
                        if(countdown==1){
                                $("#timer").text("TIME IS UP!");
                                $("#submit").trigger("click");
                        }
                }
        }, 1000);
}

$(function(){
        $("#quiz").hide();
        $("#start").click(startQuiz);
        generateQuiz(myQuestions);
});
