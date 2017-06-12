/* Browser specific support.*/
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

/* Create a new instance of SR, that will control the recognition for the application. */
const recognition = new SpeechRecognition();

/* SR Settings */
recognition.interimResults = true;  // Display results on the fly (even non-final).
recognition.lang = 'pl';

recognition.onresult = event => console.log(event);

recognition.onend = () => recognition.start();

recognition.start();