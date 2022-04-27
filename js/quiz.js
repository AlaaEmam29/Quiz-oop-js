"use strict";

export default class Quiz {
  constructor(questions) {
    this.currentQuestion = document.getElementById("currentQuestion");
    this.totalNumberOfQuestions = document.getElementById(
      "totalNumberOfQuestions"
    );
    this.questionData = document.getElementById("question");
    this.rowAnswer = document.getElementById("rowAnswer");
    this.number = 0;
    this.validationNumber = 0;
    this.score = 0;
    this.flag = false;
this.tryBtn = document.getElementById("tryBtn");
    this.questions = questions;
    this.totalNumber = this.questions.length
    this.submitBtn = document.getElementById("nextBtn");
    this.showQuestion();
    this.submitBtn.addEventListener("click", () => {
    this.nextQuestion();




    });
    this.tryBtn.addEventListener("click", () => {
    this.tryAgain()
    })
}
tryAgain()
{
    $("#finish").fadeOut(500,()=>{
        $("#startQuiz").fadeIn(500)
    })
}
  showQuestion() {
    this.totalNumberOfQuestions.innerHTML = this.totalNumber;
    this.questionData.innerHTML = this.questions[this.number].question;
    this.currentQuestion.innerHTML = this.number + 1;
    this.getAnswer();

  }
  getAnswer() {
    this.arrayOfAnswer = [
      ...this.questions[this.number].incorrect_answers,
      this.questions[this.number].correct_answer,
    ];
    let currentIndex = this.arrayOfAnswer.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [this.arrayOfAnswer[currentIndex], this.arrayOfAnswer[randomIndex]] = [
        this.arrayOfAnswer[randomIndex],
        this.arrayOfAnswer[currentIndex],
      ];
    }


this.temp = ``
for (let i = 0; i < this.arrayOfAnswer.length; i++) {
    this.temp += `
    <div class="form-check pb-2">
        <label class="form-check-label">
            <input type="radio" class="form-check-input" name="answers" id="a${i+1}" value="${this.arrayOfAnswer[i]}" >
            ${this.arrayOfAnswer[i]}
        </label>
    </div>
    `
}
document.getElementById("rowAnswer").innerHTML = this.temp;
  }

  nextQuestion() {

  this.checkUserAnswer()
  ? $("#correct").fadeIn(700,()=>{ $("#correct").fadeOut(700)})
  : $("#inCorrect").fadeIn(700,()=>{ $("#inCorrect").fadeOut(700)});
      this.number++;
      if(this.number < this.totalNumber) {
          this.showQuestion();
        }
      else
      {
        this.finishQuiz();

      }
    }
    finishQuiz() {
$("#quiz").fadeOut(500,()=>{
    $("#finish").fadeIn(500)
})
document.getElementById("score").innerHTML = this.score
    }
  checkUserAnswer() {
   try
   {
    this.userAnswer = Array.from(document.getElementsByName("answers"));
    this.userAnswer = this.userAnswer.filter((el) => el.checked)[0].value;
 

    this.correct_answer = this.questions[this.number].correct_answer;
    if (this.userAnswer == this.correct_answer) {
      this.score++;
      return true;
    } else {
      this.score;
      return false;
    }
   }
   catch(e) {
      if(e)
      {
        this.flag = true;

      }
      else
      {
        this.flag = false;

      }
   }
  }
}
