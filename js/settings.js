"use strict";
import Quiz from "./quiz.js"
export default class Settings {
  constructor() {
    this.question;
    this.categoryElement = document.getElementById("category");
    this.emptyFiled = document.getElementById("emptyFiled");
    this.difficultyElement = document.getElementsByName("difficulty");
    this.maxQuestion = document.getElementById("maxQuestion");
    this.numberOfQuestionsElement =
      document.getElementById("numberOfQuestions");
    this.question;
    this.startBtn = document.getElementById("startBtn");
    this.startBtn.addEventListener("click", () => {
     if(!this.checkEmpty() && this.validationQuestionNumber())
     {
        this.startQuiz();
        this.numberOfQuestionsElement.value = ""
     }
    });
  }
  async startQuiz() {
    this.category = this.categoryElement.value;
    this.amount = this.numberOfQuestionsElement.value;
    this.difficulty = Array.from(this.difficultyElement).filter(
      (el) => el.checked
    )[0].value;
    let response = await fetch(
      `https://opentdb.com/api.php?amount=${this.amount}&category=${this.category}&difficulty=${this.difficulty}`
    );
    this.question = await response.json();
    this.question = this.question.results;
    if (this.question.length > 0) {
      $("#startQuiz").fadeOut(300, () => {
        $("#quiz").fadeIn(500);
      });
      new Quiz(this.question);
    }
  }

  validationQuestionNumber() {
    let regex = /^(?:[1-9]|[1-4][0-9]|50)$/;
    if (regex.test(this.numberOfQuestionsElement.value) == true) {
        this.maxQuestion.classList.replace("d-block", "d-none");

      return true;
    } else {
      this.startBtn.style.disabled = true;
      this.maxQuestion.classList.replace("d-none", "d-block");

      return false;
    }
  }
  checkEmpty() {
    if (this.numberOfQuestionsElement.value == "") {
      this.emptyFiled.classList.replace("d-none", "d-block");

      return true;
    } else {
      this.emptyFiled.classList.replace("d-block", "d-none");

      return false;
    }
  }
}
