/* Browser specific support.*/
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

/* Create a new instance of SR and SR grammar, that will control the recognition for the application. */
const recognition = new SpeechRecognition();

/* Helper to check if recognition is ongoing. */
let isRecognizing;

/* SR Settings */
recognition.interimResults = true;  // Display results on the fly (even non-final).
recognition.lang = 'en';

/* Add event listener fired when service returns a recognised phrase. Unbinds when done. */
recognition.onresult = event => {
  // Get the transcripted sentence.
  const sentence = event.results[0][0].transcript;
  paragraph.textContent = sentence;

  colorConfidence(event);
  appendNewLine(event);
  scrollContent(speech);
  getColor(event);
};

/* Create a text field where the transctipt is displayed. */
let paragraph = document.createElement('p');
paragraph.className = 'speech-sentence';

const speech = document.querySelector('#speech');
speech.appendChild(paragraph);

/* Append new paragraphs when previous sentence is verified. */
function appendNewLine(event) {
  if (event.results[0].isFinal) {
    paragraph = document.createElement('p');
    paragraph.className = 'speech-sentence';
    speech.appendChild(paragraph);
  }
}

/* Format output according to the confidence value */
function colorConfidence(event) {
  const confidence = event.results[0][0].confidence;

  if (confidence < 0.4) {
    paragraph.style.color = '#ff3d00';
  } else if (confidence < 0.6) {
    paragraph.style.color = '#ffa726';
  } else if (confidence < 0.8) {
    paragraph.style.color = '#7cb342';
  } else if (confidence <= 1) {
    paragraph.style.color = '#1b5e20';
  }
}

/* Scrolls content to the top so the newly attached line is always visible */
function scrollContent(element) {
  element.scrollTop = speech.scrollHeight;
}

/* Add event listener to Start-Stop button */
function buttonsHandle() {
  const startStopMainBtn = document.querySelector('#service-button-main');
  const startStopSideBtn = document.querySelector('#service-button-side');
  const startStopBtns = [startStopMainBtn, startStopSideBtn];
  const langBtnMain = document.querySelector('#lang-button-main');
  const langBtnSide = document.querySelector('#lang-button-side');
  const langBtns = [langBtnMain, langBtnSide];

  /* Start-Stop buttons event handler */
  function toggleStartStop(buttons) {
    if (isRecognizing) {
      recognition.abort();
      recognition.onend = () => recognition.stop();
      buttons.forEach(btn => btn.innerText = 'Start Recording');
      isRecognizing = false;
    } else {
      recognition.start();
      recognition.onend = () => recognition.start();
      buttons.forEach(btn => btn.innerText = 'Stop Recording');
      isRecognizing = true;
    }
  }

  /* Set event listeners to Start-Stop buttons */
  startStopBtns.forEach(
    btn => btn.addEventListener('click', function () {
      toggleStartStop(startStopBtns);
    })
  );

  /* Language buttons event handler */
  function toggleLanguage(buttons, button) {
    if (button.innerText === 'Switch Language: PL') {
      recognition.lang = 'pl';
      recognition.stop();
      langBtns.forEach(btn => btn.innerText = 'Switch Language: EN')
    } else {
      langBtns.forEach(btn => btn.innerText = 'Switch Language: PL')
      recognition.lang = 'en';
      recognition.stop();
    }
  }

  /* Set event listeners to Language buttons */
  langBtns.forEach(
    btn => btn.addEventListener('click', function () {
      toggleLanguage(langBtns, this);
    }, false)
  );

}
buttonsHandle();

/* Recognize color */
function getColor(event) {
  const colors = ['beige', 'beżowy', 'black', 'czarny', 'blue', 'niebieski', 'brown', 'brązowy', 'gold', 'złoty', 'szary', 'gray', 'green', 'zielony', 'orange', 'pomarańczowy', 'pink', 'różowy', 'purple', 'fioletowy', 'czerwony', 'red', 'srebrny', 'silver', 'turquoise', 'turkusowy', 'purpurowy', 'violet', 'biały', 'white', 'żółty', 'yellow'];
  const isResultFinal = event.results[0].isFinal;
  const sentence = event.results[0][0].transcript.toLowerCase();
  const colorParagraph = document.querySelector('#color-example');

  if (isResultFinal) {
    colors.forEach(color => {
      let isColorIncluded = sentence.includes(color);

      if (isColorIncluded) {
        colorParagraph.style.background = color;
        colorParagraph.style.borderRadius = '50%';
        colorParagraph.style.overflow = 'hidden';
        colorParagraph.style.width = '50px';
        colorParagraph.style.height = '50px';
        animateElement(colorParagraph);
      }
    })
  }
}

function animateElement(element) {
  const keyframes = [
    { transform: 'translateX(0) rotate(0) ', color: 'initial' },
    { transform: 'translateX(100px) rotate(180deg) ', color: 'initial' },
    { transform: 'translateX(0) rotate(360deg) ', color: 'initial' }
  ];

  const options = {
    duration: 3000,
    iterations: Infinity,
  }

  element.animate(
    keyframes,
    options
  )
}

animateElement(document.querySelector('#color-example'));
