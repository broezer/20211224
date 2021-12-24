// Based on https://editor.p5js.org/cacheflowe/sketches/JWQn2Wn4E
// A template for rendering a looping animation to video file.
// Step 1:
// Import the following Javascript in index.html:
// <script type="module" src="https://cacheflowe.github.io/haxademic.js/src/p5-recorder.es6.js"></script>
// Step 2: 
// Copy the code above `setup()` below
// Step 3:
// In `draw()` call `updateLoopRecording()` after you've draw your stuff:
// `if(saveVideo) updateLoopRecording();`
// Step 4:
// Download your video with the button that shows up under your sketch
// Step 5:
// Convert your downloaded .webm video to mp4 here: 
// https://ffmpegwasm.netlify.app/

////////////////////////////////////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////
// Editable properties:
// Edit `loopFrames` to change the loop duration
// And disable `saveVideo` while you're working on your sketch
var loopFrames = 400; // 8-second loop (50fps * 8)
let saveVideo = true;
let xStep = 0;

// Loop properties that help you loop elements in your animation.
// These are updated in `updateLoopRecording()`
let frameCountLooped = 1;
let loopProgress = 0;
let loopProgressRadians = 0;

// call this function at the end of `draw()`
var recorder = null;
function updateLoopRecording() {
  // create a looped framecount & normalized progress
  frameCountLooped = frameCount % loopFrames;
  loopProgress = frameCountLooped / loopFrames;
  loopProgressRadians = loopProgress * TWO_PI;
  // update video recorder
  if(saveVideo) {
    if(!recorder) recorder = new p5Recorder(loopFrames);
    recorder.renderVideo();
  }
}
/////////////////////////////////////////////
/////////////////////////////////////////////
////////////////////////////////////////////////


function setup() {
  createCanvas(400, 400);
  frameRate(50);
  background('black');
}

function draw() {


  translate(width/2,-height/2);
  rotate(QUARTER_PI);
  drawLoopedShapes();
  
  
  
  updateLoopRecording();

}

function drawLoopedShapes() {
  // draw something on a loop!
  
  var w = width;
  var h = height;
  //background('black');
    translate(-w/20, (h/20));
    rectMode(CENTER)
    

    for (var i=0; i< 10; i+=1){
      if (i%2 == 0){
          scale(1 + (0.01 * xStep) * i);
          push();
          fill('black');
          translate(i * (w/10) * xStep,  (i * xStep * (h/10)))
          circle(0, 0, w/10);
          fill('white');
          circle(0, 0 ,  w/10);
          pop();
      }else{
          push();
          fill('black');
          translate( i * xStep * (h/10) , i * (h/10) )
          circle(0, 0, w/10);
          fill('white');
          circle(0, 0, w/10);
          pop();
        
      }
    }
  
  //console.log(loopProgressRadians);
  xStep = xStep + (0.1 * sin(loopProgressRadians));
}
