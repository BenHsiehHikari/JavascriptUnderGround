let questions;
let questionsCount;
let currentQuestion;
let score = 0;

let questionTitleElem = document.querySelector("#title");
let anwersElem = document.querySelector("#answer");
let actionBtn = document.querySelector("#action_btn");


function getQuestions(){
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200){
      questions = JSON.parse(this.responseText).questions;
      questionCount = questions.length;
      currentQuestion = 0;
    }
  }
  xhr.open("GET","./questions.json", false);
  xhr.send();
}

function displayQuestion(question){
  questionTitleElem.innerHTML = "";
  anwersElem.innerHTML = "";

  let questionTitle = document.createTextNode(question.title);
  questionTitleElem.appendChild(questionTitle);

  question.answers.forEach(answer => {
      let label = document.createElement("label");
      
      let answerInput = document.createElement("input");
      answerInput.setAttribute("type", "radio");
      answerInput.setAttribute("name", "answer");
      answerInput.setAttribute("value", answer.id);
      answerInput.classList.add("answer");

      let answerTitle = document.createTextNode(answer.answer);
      label.appendChild(answerInput);
      label.appendChild(answerTitle);

      anwersElem.appendChild(label);
  });

}

actionBtn.addEventListener("click", function () {
	let answers = document.querySelectorAll(".answer");
	for (let i = 0; i < answers.length; i++) {
		let answer = answers[i];
		let question = questions[currentQuestion];

		if (answer.checked && answer.value == question.correct) {
			answer.parentNode.classList.add("correct");
			score++;
		} else if (answer.checked && answer.value != question.correct) {
			answer.parentNode.classList.add("incorrect");
		}

		answer.disabled = true;
	}

	currentQuestion++;

	let nextBtn = document.querySelector("#next_btn");
	nextBtn.classList.remove("hide");
	this.classList.add("hide");
});

nextBtn.addEventListener("click", function () {
	if (currentQuestion == questionsCount) {
		document.querySelector("#question").classList.add("hide");
		document.querySelector("#scores").classList.remove("hide");
		document.querySelector("#score").innerHTML = score + "/" + questionsCount;
		return;
	}

	displayQuestion(questions[currentQuestion]);
	actionBtn.classList.remove("hide");
	this.classList.add("hide");
});


getQuestions();
displayQuestion(questions[currentQuestion]);