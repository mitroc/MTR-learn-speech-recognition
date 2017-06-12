/* Browser specific support.*/
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

/* Create a new instance of SR, that will control the recognition for the application. */
const recognition = new SpeechRecognition();

/* SR Settings */
recognition.interimResults = true;  // Display results on the fly (even non-final).
recognition.lang = 'pl';
recognition.onresult = event => {
  // Get the transcripted sentence.
  const sentence = event.results[0][0].transcript;
  paragraph.textContent = sentence;
};
recognition.onend = () => recognition.start();
recognition.start();

/* Create a text field where the transctipt is displayed. */
let paragraph = document.createElement('p');
paragraph.className = 'speech-sentence';

const speech = document.querySelector('#speech');
speech.appendChild(paragraph);

