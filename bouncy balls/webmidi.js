
// Enable WEBMIDI.js and trigger the onEnabled() function when ready
WebMidi
    .enable()
    .then(onEnabled)
    .catch(err => alert(err));

// Function triggered when WEBMIDI.js is ready
function onEnabled() {

    // Display available MIDI output devices
    if (WebMidi.outputs.length < 1) {
        document.body.innerHTML+= "No device detected.";
    } else {
        WebMidi.outputs.forEach((device, index) => {
        document.body.innerHTML+= `${index}: ${device.name} <br>`;
        });
    }

    const mySynth = WebMidi.outputs[3];

    // mySynth.playNote("F#3", {duration: 1000})
    // mySynth.playNote("A3", {duration: 1000})
    // mySynth.playNote("C#3", {duration: 1000})
    // mySynth.playNote("E3", {duration: 1000})
    return mySynth;

}

export function onEnabled()