// script.js

const btn = document.querySelector('.talk');
const content = document.querySelector('.content');

function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.volume = 1;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
}

function wishMe() {
    const hour = new Date().getHours();
    let greeting = '';

    if (hour >= 0 && hour < 12) {
        greeting = "Good Morning!";
    } else if (hour >= 12 && hour < 17) {
        greeting = "Good Afternoon!";
    } else {
        greeting = "Good Evening!";
    }

    speak(greeting);
}

window.addEventListener('load', () => {
    speak("Initializing Jarvis...");
    wishMe();
});

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onresult = (event) => {
    const currentIndex = event.resultIndex;
    const transcript = event.results[currentIndex][0].transcript;
    content.textContent = transcript;
    takeCommand(transcript.toLowerCase());
};

btn.addEventListener('click', () => {
    content.textContent = "Listening...";
    recognition.start();
});

function openUrl(url, message) {
    window.open(url, "_blank");
    speak(message);
}

function takeCommand(message) {
    if (message.includes('hey') || message.includes('hello')) {
        speak("Hello! How can I assist you today?");
    } else if (message.includes("open google")) {
        openUrl("https://google.com", "Opening Google...");
    } else if (message.includes("open youtube")) {
        openUrl("https://youtube.com", "Opening YouTube...");
    } else if (message.includes("open facebook")) {
        openUrl("https://facebook.com", "Opening Facebook...");
    } else if (message.includes("open twitter")) {
        openUrl("https://twitter.com", "Opening Twitter...");
    } else if (message.includes("open instagram")) {
        openUrl("https://instagram.com", "Opening Instagram...");
    } else if (message.includes("open linkedin")) {
        openUrl("https://linkedin.com", "Opening LinkedIn...");
    } else if (message.includes("open whatsapp")) {
        openUrl("https://web.whatsapp.com", "Opening WhatsApp Web...");
    } else if (message.includes("open notes")) {
        openUrl('Notes:///', "Opening Notes...");
    } else if (message.includes("open calculator")) {
        openUrl('Calculator:///', "Opening Calculator...");
    } else if (message.includes("open calendar")) {
        openUrl('Calendar:///', "Opening Calendar...");
    } else if (message.includes('what is') || message.includes('who is') || message.includes('what are')) {
        openUrl(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "Searching for information on the internet...");
    } else if (message.includes('wikipedia')) {
        openUrl(`https://en.wikipedia.org/wiki/${message.replace("wikipedia", "")}`, "Searching Wikipedia...");
    } else if (message.includes('time')) {
        const time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric", hour12: true });
        speak(`The time is ${time}`);
    } else if (message.includes('date')) {
        const date = new Date().toLocaleDateString();
        speak(`Today's date is ${date}`);
    } else {
        openUrl(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "Searching for information...");
    }
}
