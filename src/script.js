let speech = new SpeechSynthesisUtterance();
let voices = [];
let voiceSelect = document.querySelector("#voice");

function loadVoices() {
  voices = window.speechSynthesis.getVoices();
  console.log(voices);
  if (voices.length === 0) return;
  voiceSelect.innerHTML = "";
  voices.forEach((v, i) => {
    let option = new Option(v.name + " (" + v.lang + ")", i);
    voiceSelect.add(option);
  });
  speech.voice = voices[0];
  voiceSelect.value = 0;
}

loadVoices();
window.speechSynthesis.onvoiceschanged = loadVoices;


voiceSelect.addEventListener("change", function () {
  speech.voice = voices[this.value];
});


document.querySelector("[data-action='listen']").addEventListener("click", () => {
  let text = document.querySelector("#tts-text").value;

  if (!text.trim()) {
    alert("Please enter some text first!");
    return;
  }

  speech.text = text;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(speech);
});