const startVoiceSearch = () => {
    // Check if SpeechRecognition is available in the browser
    const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
        alert("Speech Recognition is not supported in this browser. Please try using Google Chrome or Microsoft Edge.");
        console.error("SpeechRecognition API is not supported in this browser.");
        return;
    }

    try {
        // Create a new SpeechRecognition instance
        const recognition = new SpeechRecognition();
        recognition.lang = "en-US"; // Set recognition language

        // Event handler for successful recognition
        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            console.log("Voice Search Result:", transcript); // Log result to console
            alert(`You said: ${transcript}`); // Display result to user
        };

        // Event handler for recognition errors
        recognition.onerror = (event) => {
            console.error("SpeechRecognition Error:", event.error);
            alert(`Speech Recognition Error: ${event.error}`);
        };

        // Log when recognition starts and ends
        recognition.onstart = () => {
            console.log("Speech recognition started...");
        };
        recognition.onend = () => {
            console.log("Speech recognition ended.");
        };

        // Start recognition
        recognition.start();
    } catch (error) {
        console.error("Error initializing SpeechRecognition:", error);
        alert(`Error: ${error.message}`);
    }
};
