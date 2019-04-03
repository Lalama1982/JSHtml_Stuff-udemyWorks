/*
by enclosing in a top layer function, this could be used as a plug-in and variables defined outside of this,
i.e. answer by another function,
internal functions, variables will not be overridden
will not interfer with this function
*/
(function() {
    function Question(question, answers, correct){
        this.question = question;
        this.answers = answers;
        this.correct = correct;
    }

    Question.prototype.displayQuestion = function() {
        console.log(this.question);

        for (var i=0; i< this.answers.length; i++){
            console.log(i+': '+this.answers[i]);
        }
    }

    Question.prototype.checkAnswer = function(ans,callBack) {
        /* keepScore (score) object is accepted as "callBack" */
        var sc;
        if (ans == this.correct){
            console.log('Correct Answer');
            sc = callBack(true); /* passing to "TRUE" boolean to add */
        }else{
            console.log('Wrong Answer');
            sc = callBack(false); /* passing to "FALSE" boolean to not to add */
        }
        this.displayScore(sc);
    }

    Question.prototype.displayScore = function(score){
        console.log('Your current score: '+score);
        console.log('-------------------------------');
    }

    var q1 = new Question('Question 01 ?', ['Q01_Ans_01','Q01_Ans_02'],1);
    var q2 = new Question('Question 02 ?', ['Q02_Ans_01','Q02_Ans_02','Q02_Ans_03'],2);
    var q3 = new Question('Question 03 ?', ['Q03_Ans_01','Q03_Ans_02','Q03_Ans_03','Q03_Ans_04'],3);

    var questions = [q1,q2,q3];
    
    /* defining a function to accept TRUE/FALSE and return the accumulated score for every "correct"*/
    function score(){
        var sc = 0;
        return function(correct){
            if (correct){
                sc++;
            }
            return sc;
        }
    }
    
    var keepScore = score();
    
    function nextQuestion(){    
        var n = Math.floor(Math.random()*questions.length);

        questions[n].displayQuestion();

        var answer = prompt('Please select the answer?'); /* without the "parseInt" value of the variable is actually a strin */
        console.log('answer: '+answer);
        
        /* this is to continuously ask the question and once enter "exit", stop prompting */
        if (answer !== 'exit') {
            /* piggy backing the answer & "score" function object as "keepScore" variable*/
            questions[n].checkAnswer(parseInt(answer),keepScore);
            nextQuestion();    
        }
        
    }

    nextQuestion();
    
})();

