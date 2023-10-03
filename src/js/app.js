import ruData from '../data/birds';
import questionPass from '../assets/img/bird-holding-question-mark.jpeg';
import fallSound from '../assets/sounds/fail.mp3';
import winSound from '../assets/sounds/win.mp3';
import soundAccompaniment from './helpers/audio';

let j = 0;
let round = ruData[j];
let score = 0;
let attemptNumber = 0;
const MAX_SCORE = 30;

const audioPlayer = document.querySelector('.audio');
const audioPlayerMini = document.querySelector('.audio-mini');

const birdName = document.querySelector('.question__title');
const questionImg = document.querySelector('.question__img');
const instruction = document.querySelector('.instruction');
const cardImg = document.querySelector('.card__img');
const cardInfo = document.querySelector('.card__info');
const cardName = document.querySelector('.card__name');
const cardSpecies = document.querySelector('.card__species');
const cardDescription = document.querySelector('.card__desc');
const nextBtn = document.querySelector('.btn_next');
const resultPage = document.querySelector('.game-over');
const quizPage = document.querySelector('.main');
const restartBtn = document.querySelector('.btn_restart');
const gameScore = document.querySelector('.score');
const gameResult = document.querySelector('.game-over__result');

const getRandomInt = max => Math.floor(Math.random() * max);

let currentQuestion;
const getRandomQuestion = () => {
  currentQuestion = round[getRandomInt(6)];
};

const pageItem = document.querySelectorAll('.page__item');
const setUl = () => {
  pageItem[j].classList.add('active');
  const ul = document.querySelectorAll('.option');
  // const li = document.createElement('li')
  ul.forEach(li => {
    li.innerHTML = '';
  });

  for (let i = 0; i < ul.length; i++) {
    const marker = document.createElement('span');
    marker.className = 'marker';
    ul[i].append(marker);
    ul[i].insertAdjacentText('beforeend', round[i].name);
  }
  const audioUlr = currentQuestion.audio;
  audioPlayer.src = audioUlr;
};

const showCard = event => {
  instruction.style.display = 'none';
  let currentCardId = event.target.id;

  cardImg.style.display = 'inline-block';
  cardImg.src = round[currentCardId - 1].image;

  cardInfo.style.display = 'flex';

  cardName.textContent = round[currentCardId - 1].name;
  cardSpecies.textContent = round[currentCardId - 1].species;
  cardDescription.textContent = round[currentCardId - 1].description;

  audioPlayerMini.style.display = 'flex';
  audioPlayerMini.src = round[currentCardId - 1].audio;
};
const hideCard = () => {
  instruction.style.display = 'block';
  cardImg.style.display = 'none';
  cardInfo.style.display = 'none';
  cardName.textContent = '';
  cardSpecies.textContent = '';
  cardDescription.textContent = '';
  audioPlayerMini.style.display = 'none';
};
let success = false;
const hideQuestion = () => {
  birdName.textContent = '******';
  questionImg.src = questionPass;
};
const attempts = [];
const handleAnswer = e => {
  const cardElement = e.target;
  const cardId = cardElement.id;
  const cardMarker = e.target.querySelector('span');
  if (cardId == currentQuestion.id) {
    if (!success) {
      audioPlayer.pause();
      soundAccompaniment(winSound);
      score += 5 - attemptNumber;
    }
    success = true;
    nextBtn.disabled = false;
    cardMarker.style.backgroundColor = 'green';
    nextBtn.classList.add('active');
    birdName.textContent = currentQuestion.name;
    questionImg.src = currentQuestion.image;
  } else {
    if (!success) {
      nextBtn.classList.remove('active');
      cardMarker.style.backgroundColor = 'red';
      soundAccompaniment(fallSound);
      if (!attempts.includes(cardId)) {
        attemptNumber++;
        attempts.push(cardId);
      }
    }
  }
};

const watch = () => {
  gameScore.textContent = `Счет: ${score}`;
  const options = document.querySelector('.options');
  options.addEventListener('click', e => {
    showCard(e);
    handleAnswer(e);
    gameScore.textContent = `Счет: ${score}`;
  });
};

nextBtn.addEventListener('click', e => {
  if (j < 5) {
    pageItem[j].classList.remove('active');
    j++;
    round = ruData[j];

    success = false;
    document
      .querySelectorAll('.marker')
      .forEach(el => (el.style.backgroundColor = 'fff'));

    attemptNumber = 0;
    attempts.length = 0;
    main();

    nextBtn.disabled = true;
    nextBtn.classList.remove('active');
  } else {
    pageItem[j].classList.remove('active');
    // roundItem[0].classList.add('active');
    quizPage.style.display = 'none';
    resultPage.style.display = 'block';
    gameResult.textContent = `Вы прошли викторину и набрали ${score} из ${MAX_SCORE} возможных баллов`;
    if (score === MAX_SCORE) {
      gameResult.textContent = `Вы прошли викторину и набрали максимальное количество баллов!`;
      restartBtn.style.display = 'none';
    }
  }
});

restartBtn.addEventListener('click', e => {
  j = 0;
  success = false;
  score = 0;
  gameScore.textContent = `Счет: ${score}`;
  resultPage.style.display = 'none';
  quizPage.style.display = 'block';
  main();
});

const main = () => {
  round = ruData[j];
  getRandomQuestion();
  // console.log(currentQuestion);
  hideQuestion();
  hideCard();
  setUl();
  watch();
};
main();
