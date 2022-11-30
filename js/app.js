const quizBox = document.getElementById('quiz');
const resultsBox = document.getElementById('results');
const submitButton = document.getElementById('submit');
let terminarResponder = false;

function buildQuiz() {
    const output = [];
    myQuestions.forEach(
        (currentQuestion, questionNumber) => {
            const answers = [];
            for (letter in currentQuestion.answers) {
                answers.push(
                    `<label class=${letter} >
                    <input type="radio"  name="question${questionNumber}" value="${letter}" class="rad_butn">
                    ${letter} : ${currentQuestion.answers[letter]}
                    </label>`
                );
            }
            output.push(
                `<div class="slide">
                    <div class="question"> ${(questionNumber + 1)}.${currentQuestion.question}  </div>
                    <div class="answers"> ${answers.join("")} </div>
                </div>`
            );
        }
    );
    quizBox.innerHTML = output.join('');
}
function showResults() {
    terminarResponder = true;
    const answersBoxes = quizBox.querySelectorAll('.answers');
    let numCorrect = 0;

    myQuestions.forEach((currentQuestion, questionNumber) => {
        const answersBox = answersBoxes[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answersBox.querySelector(selector) || {});

        
        const checkBoxes = answersBox.querySelectorAll('input');
        checkBoxes.forEach((currentCheck) => {
            currentCheck.setAttribute('disabled', true);
        });

        // PiNTA EL COLOR ROJO SI ESTA MAL

        if (!userAnswer.value) {
            answersBox.style.color = 'red';
            return;
        }

        const labelCheck = answersBox.querySelector(`label[class=${userAnswer.value}]`);

        if (userAnswer.value === currentQuestion.correctAnswer) {
            numCorrect++;
            labelCheck.style.color = 'green';
        } else {
            labelCheck.style.color = 'red';
        }

    });

    resultsBox.innerHTML = `${numCorrect} correctos de ${myQuestions.length}`
}

function showSlide(n) {
    slides[currentSlide].classList.remove('active-slide');
    slides[n].classList.add('active-slide');
    currentSlide = n;
    // Si estas en la primera pregunta:
    if (currentSlide === 0) {
        previousButton.style.display = 'none';
    } else {
        previousButton.style.display = 'inline-block';
    }
    // Si estas en la ultima pregunta:
    if (currentSlide === slides.length - 1) {
        nextButton.style.display = 'none';
        if(!terminarResponder)
            submitButton.style.display = 'inline-block';
    } else {
        nextButton.style.display = 'inline-block';
        submitButton.style.display = 'none';
    }
}

function showNextSlide() {
    showSlide(currentSlide + 1);
}

function showPreviousSlide() {
    showSlide(currentSlide - 1);
}

const myQuestions = [];
/*
for(i=0; i<data.length; i++ ){
    myQuestions.push(data[i]);
}*/

const newObject = localStorage.getItem("questionBank");
let dataStored = JSON.parse(newObject);

// Si tienes datos en memoria 
if (dataStored) {
    for (i = 0; i < dataStored.length; i++) {
        myQuestions.push(dataStored[i]);
    }
    document.getElementById('quizLength').innerHTML = dataStored.length
} else {
    for (i = 0; i < data.length; i++) {
        myQuestions.push(data[i]);
    }
    document.getElementById('quizLength').innerHTML = data.length;
}

document.getElementById('quizLength').innerHTML = myQuestions.length;

buildQuiz();

const previousButton = document.getElementById('previous');
const nextButton = document.getElementById('next');
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

showSlide(currentSlide);

submitButton.addEventListener('click', showResults);

previousButton.addEventListener("click", showPreviousSlide);
nextButton.addEventListener("click", showNextSlide);


