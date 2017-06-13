/* Browser specific support.*/
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

/* Create a new instance of SR, that will control the recognition for the application. */
const recognition = new SpeechRecognition();

/* SR Settings */
recognition.interimResults = true;  // Display results on the fly (even non-final).
recognition.lang = 'pl';

/* Add event listener fired when service returns a recognised phrase. Unbinds when done. */
recognition.onresult = event => {
  // Get the transcripted sentence.
  const sentence = event.results[0][0].transcript;
  paragraph.textContent = sentence;

  colorConfidence(event);
  appendNewLine(event);
  scrollContent(speech);
};

// recognition.onend = () => recognition.start();
// recognition.start();
let isRecognizing;

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
    paragraph.style.color = 'red';
  } else if (confidence < 0.6) {
    paragraph.style.color = 'orange';
  } else if (confidence < 0.8) {
    paragraph.style.color = 'blue';
  } else if (confidence <= 1) {
    paragraph.style.color = 'green';
  }
}

/* Scrolls content to the top so the newly attached line is always visible */
function scrollContent(element) {
  element.scrollTop = speech.scrollHeight;
}

/* Start-Stop buttons event handler */
function toggleStartStop(button) {
  if (isRecognizing) {
    recognition.stop();
    recognition.onend = () => recognition.stop();
    button.innerText = "Start Recording";
    isRecognizing = false;
  } else {
    recognition.start();
    recognition.onend = () => recognition.start();
    button.innerText = "Stop Recording";
    isRecognizing = true;
  }
}

/* Add event listener to Start-Stop button */
const startStopMainBtn = document.querySelector('#service-button-main');
startStopMainBtn.addEventListener('click', function () {
  toggleStartStop(this);
}, false)
