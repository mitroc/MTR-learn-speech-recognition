/* Browser specific support.*/
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

/* Create a new instance of SR and SR grammar, that will control the recognition for the application. */
const recognition = new SpeechRecognition();

/* Helper to check if recognition is ongoing. */
let isRecognizing;

/* SR Settings */
recognition.interimResults = true;  // Display results on the fly (even non-final).
recognition.lang = 'en';

/* Create a text field where the transctipt is displayed. */
let paragraph = document.createElement('p');
paragraph.className = 'speech-sentence';

const speech = document.querySelector('#speech');
speech.appendChild(paragraph);

/* Add event listener fired when service returns a recognised phrase. Unbinds when done. */
recognition.onresult = event => {
  // Get the transcripted sentence.
  const initialSentence = event.results[0][0].transcript;

  paragraph.textContent = replaceWords(initialSentence);

  showCat(event);
  colorConfidence(event);
  appendNewLine(event);
  scrollContent(speech);
  getColor(event);
};

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
    if (button.innerText === 'Switch Recognition To Polish') {
      recognition.lang = 'pl';
      recognition.stop();
      langBtns.forEach(btn => btn.innerText = 'Switch Recognition To English')
    } else {
      langBtns.forEach(btn => btn.innerText = 'Switch Recognition To Polish')
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
  const colors = ['aqua', 'azure', 'beige', 'bisque', 'black', 'blue', 'brown', 'chocolate', 'coral', 'crimson', 'cyan', 'fuchsia', 'ghostwhite', 'gold', 'goldenrod', 'gray', 'green', 'indigo', 'ivory', 'khaki', 'lavender', 'lime', 'linen', 'magenta', 'maroon', 'moccasin', 'navy', 'olive', 'orange', 'orchid', 'peru', 'pink', 'plum', 'purple', 'red', 'salmon', 'sienna', 'silver', 'snow', 'tan', 'teal', 'thistle', 'tomato', 'turquoise', 'violet', 'white', 'yellow'];
  const isResultFinal = event.results[0].isFinal;
  const sentence = event.results[0][0].transcript.toLowerCase();
  const colorParagraph = document.querySelector('#color-example');

  function animateElement(element, color) {
    const keyframes = [
      {
        transform: 'translate3D(0,0,0) rotate(0) ',
        color: color,
        background: color,
        borderRadius: '0%',
        width: '100px',
        height: '100px',
        paddingBottom: 'initial'
      },
      {
        transform: 'translate3D(0,50px,0) rotate(0) ',
        color: color,
        background: color,
        borderRadius: '0%',
        width: '50px',
        height: '50px',
        paddingBottom: 0
      },
      {
        transform: 'translate3D(200px,50px,0) rotate(360deg) ',
        color: color,
        background: color,
        borderRadius: '0%',
        width: '50px',
        height: '50px',
        paddingBottom: 0
      },
      {
        transform: 'translate3D(0,0,0) rotate(-360deg) ',
        color: color,
        background: color,
        borderRadius: '50%',
        width: '100px',
        height: '100px',
        paddingBottom: 0
      },
      {
        transform: 'translate3D(0,0,0) rotate(-360deg) ',
        color: color,
        background: color,
        borderRadius: '0%',
        width: '100px',
        height: '100px',
        paddingBottom: 0
      },
      {
        transform: 'translate3D(0,0,0) rotate(-360deg) ',
        color: 'initial',
        background: 'initial',
        borderRadius: '0%',
        width: 'initial',
        height: 'initial',
        paddingBottom: 'initial'
      }, {
        transform: 'translate3D(0,0,0) rotate(-360deg) ',
        color: 'initial',
        background: 'initial',
        borderRadius: '0%',
        width: 'initial',
        height: 'initial',
        paddingBottom: 'initial'
      }, {
        transform: 'translate3D(0,0,0) rotate(-360deg) ',
        color: 'initial',
        background: 'initial',
        borderRadius: '0%',
        width: 'initial',
        height: 'initial',
        paddingBottom: 'initial'
      },
    ];

    const options = {
      duration: 6000,
      iterations: 1,
    }

    element.animate(
      keyframes,
      options
    )
  }

  if (isResultFinal) {
    colors.forEach(color => {
      let isColorIncluded = sentence.includes(color);

      if (isColorIncluded) {
        animateElement(colorParagraph, color);
      }
    })
  }
}

/* Replace text with something else */
function replaceWords(text) {
  return text
    .replace(/explosive\S*|bomb\S*|weapon\S*|gun\S*|wybuch\S*|\bbroń|\bbroni\s|pistolet\S*/gi, '💣 I SEE YOU. ANTONIO M. !💀');
}

/* Replace text with cat picture */
function showCat(event) {
  const includedArr = event.results[0][0].transcript.match(/cat\S*|kitten\S*|kot\S*|kiciuś\S*|kicia\S*/gi);

  if (includedArr && event.results[0].isFinal) {
    let a = document.createElement('img');
    a.src = 'http://loremflickr.com/160/120';
    speech.appendChild(a);
  }
}