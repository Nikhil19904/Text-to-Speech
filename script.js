// Variables for UI elements
const textInput = document.getElementById("text-input");
const speakButton = document.getElementById("speak-btn");
const stopButton = document.getElementById("stop-btn");
const resetButton = document.getElementById("reset-btn");
const voiceSelect = document.getElementById("voice-select");
const languageSelect = document.getElementById("language-select");
const rateSlider = document.getElementById("rate");
const pitchSlider = document.getElementById("pitch");
const rateValue = document.getElementById("rate-value");
const pitchValue = document.getElementById("pitch-value");

// Initialize SpeechSynthesis API
let voices = [];
let synth = window.speechSynthesis;

function populateVoiceList() {
    voices = synth.getVoices();
    voiceSelect.innerHTML = ''; // Clear the existing list
    voices.forEach(voice => {
        const option = document.createElement('option');
        option.textContent = voice.name + ' (' + voice.lang + ')';
        option.setAttribute('data-lang', voice.lang);
        option.setAttribute('data-name', voice.name);
        voiceSelect.appendChild(option);
    });
}

// Handle speech synthesis
function speakText() {
    const text = textInput.value;
    if (!text) return;

    const utterance = new SpeechSynthesisUtterance(text);
    const selectedVoiceName = voiceSelect.selectedOptions[0].getAttribute('data-name');
    const selectedLanguage = languageSelect.value;
    
    // Set language and voice
    utterance.lang = selectedLanguage;
    utterance.voice = voices.find(voice => voice.name === selectedVoiceName);
    utterance.pitch = parseFloat(pitchSlider.value);
    utterance.rate = parseFloat(rateSlider.value);
    
    synth.speak(utterance);
}

// Stop speech synthesis
function stopSpeech() {
    synth.cancel();
}

// Update rate and pitch values
rateSlider.addEventListener('input', () => {
    rateValue.textContent = rateSlider.value;
});

pitchSlider.addEventListener('input', () => {
    pitchValue.textContent = pitchSlider.value;
});

// Event listeners for buttons
speakButton.addEventListener('click', speakText);
stopButton.addEventListener('click', stopSpeech);
resetButton.addEventListener('click', () => {
    textInput.value = '';
    stopSpeech();
});

// Populate voice options and language change event
languageSelect.addEventListener('change', populateVoiceList);
synth.onvoiceschanged = populateVoiceList;

// Initialize voice list on load
populateVoiceList();
