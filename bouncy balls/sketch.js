
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
    
}

var movers = [];

function setup() {
  createCanvas(1200, 800);
  movers[0] = new Mover(1,30,40);
}

function mouseClicked(){

  movers.push(new Mover(random(1,4),mouseX, mouseY));
}

function draw() {
  background(255);
  
  for (var i = 0; i < movers.length; i++) {
    var wind = createVector(0.01, 0);
    var gravity = createVector(0, 0.1*movers[i].mass);

    var c = 0.03;
    
    
    var friction = movers[i].velocity.copy();
    friction.mult(-1);
    friction.normalize();
    friction.mult(c);


    movers[i].applyForce(friction);
    movers[i].applyForce(wind);
    movers[i].applyForce(gravity);
    movers[i].update();
    movers[i].display();
    movers[i].checkEdges();
  }
}

var Mover = function(m, x, y) {
  
  // select your device here based on its index
  const mySynth = WebMidi.outputs[1];
  // f# minor scale
  const notes = ["F#3", "G#3", "A3", "B3", "C#3", "D3", "E3", 
                "F#4", "G#4", "A4", "B4", "C#4", "D4", "E4"]

  this.mass = m;
  this.position = createVector(x, y);
  this.velocity = createVector(0, 0);
  this.acceleration = createVector(0, 0);

  this.applyForce = function(force) {
    var f = p5.Vector.div(force, this.mass);
    this.acceleration.add(f);
  };
    
  this.update = function() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  };

  this.display = function() {
    noStroke();
    fill(0);
    ellipse(this.position.x, this.position.y, m*10, m*10);
  };

  this.checkEdges = function() {
    // width is built-in var that knows the canvas width
    if (this.position.x > width) {
      this.position.x = width;
      this.velocity.x *= -1;
    } else if (this.position.x < 0) {
      this.velocity.x *= -1;
      this.position.x = 0;
    }
    // height is a built-in for p5
    // play a note here because this is when the ball hits the bottom
    if (this.position.y > height) {
      // we need to check if the ball is stopping moving after this otherwise it'll put out a ton of notes...
      
      if (this.velocity.y > 1) {
        // play a random note from the scale
        var rando_note = notes[Math.floor(Math.random()*notes.length)]
        mySynth.playNote(rando_note, {duration:250});
      }
      
      this.velocity.y *= -1;
      this.position.y = height;
    }

  };

};
  