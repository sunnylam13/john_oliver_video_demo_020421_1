jQuery(document).ready(function($) {

//////////////////////////////////////////////////
// GLOBAL VARIABLES

////////////////////////////////////////////
/////     VIDEOS
///////////////////////////////////////////////

// var videos = {
//   video1: "http://d11xl8qd9mv10s.cloudfront.net/Media%20Content/Video/Last%20Week%20Tonight%20with%20John%20Oliver%20-%20S02E01.mp4",
//   video2: "http://d11xl8qd9mv10s.cloudfront.net/Media%20Content/Video/Last%20Week%20Tonight%20with%20John%20Oliver%20-%20S02E02.mp4"
// }

// videos should have no extension
// var videos = {
//   video1: "video/john.oliver.clip.s02e01.030515",
//   video2: "video/john.oliver.clip.s02e02.030515"
// }

/** amazon s3 vid links
* https://d11xl8qd9mv10s.cloudfront.net/site_video/john.oliver.clip.s02e01.030515.mp4

https://d11xl8qd9mv10s.cloudfront.net/site_video/john.oliver.clip.s02e02.030515.mp4 **/

var videos = {
  video1: "https://d11xl8qd9mv10s.cloudfront.net/site_video/john.oliver.clip.s02e01.030515.mp4",
  video2: "https://d11xl8qd9mv10s.cloudfront.net/site_video/john.oliver.clip.s02e02.030515.mp4"
}

// provide global video object

var video = document.getElementById("video");

video.src = videos.video1 + getFormatExtension();
video.load();

////////////////////////////////////////////

////////////////////////////////////////////
/////     CONTROLS
///////////////////////////////////////////////

var controlLinks = document.querySelectorAll("a.control");

for (var i = 0; i < controlLinks.length; i++) {
  controlLinks[i].onclick = handleControl;
}

///////////////////////////////////////////////


////////////////////////////////////////////
/////     EFFECTS
///////////////////////////////////////////////

var effectLinks = document.querySelectorAll("a.effect");

for (var i = 0; i < effectLinks.length; i++) {
  effectLinks[i].onclick = setEffect;
}

///////////////////////////////////////////////


////////////////////////////////////////////
/////     VIDEO LINKS
///////////////////////////////////////////////

var videoLinks = document.querySelectorAll("a.videoSelection");

for (var i = 0; i < videoLinks.length; i++) {
  videoLinks[i].onclick = setVideo;
}

///////////////////////////////////////////////

////////////////////////////////////////////
/////     PUSH BUTTONS
///////////////////////////////////////////////

pushUnpushButtons("video1",[]);
pushUnpushButtons("normal",[]);

///////////////////////////////////////////////

//////////////////////////////////////////////////
// HANDLER FUNCTIONS
////////////////////////////////////////////

function handleControl (e) {
  // grab the id attribute of the element that invoked the handler
  var id = e.target.getAttribute("id");

  // update handleControl for the videos
  var video = document.getElementById('video');

  if (id == "play") {
    pushUnpushButtons("play",["pause"]);

    // if play is pushed we want the video to play
    if (video.ended) {
      // if the video is ended and its true then load the video
      video.load();
    }
    // when this play button is pushed you want the video to play
    video.play();

  } else if (id == "pause") {
    pushUnpushButtons("pause",["play"]);

    // run the pause method on the video object
    video.pause();

  } else if (id == "loop") {
    if (isButtonPushed("loop")) {
      pushUnpushButtons("",["loop"]);
    } else {
      pushUnpushButtons("loop",[]);
    }

    // run the loop method
    video.loop = !video.loop;

  } else if (id == "mute") {
    if (isButtonPushed("mute")) {
      pushUnpushButtons("",["mute"]);
    } else {
      pushUnpushButtons("mute",[]);
    }

    // run the mute method
    video.muted = !video.muted;

  }
}

function setEffect (e) {
  var id = e.target.getAttribute("id");

  if (id == "normal") {
    pushUnpushButtons("normal",["western","noir","scifi"]);
    // add special effects with another helper
    effectFunction = null;
  } else if (id== "western") {
    pushUnpushButtons("western",["normal","noir","scifi"]);
    // add special effects with another helper
    effectFunction = western;
  } else if (id=="noir") {
    pushUnpushButtons("noir",["normal","western","scifi"]);
    // add special effects with another helper
    effectFunction = noir;
  } else if (id=="scifi") {
    pushUnpushButtons("scifi",["normal","western","noir"]);
    // add special effects with another helper
    effectFunction = scifi;
  } // if you add a ; here you break the setEffect function
}

function setVideo (e) {
  var id = e.target.getAttribute("id");

  // switching test videos
  // switching to video2
  var video = document.getElementById('video');

  if (id == "video1") {
    pushUnpushButtons("video1",["video2"]);
  } else if (id == "video2") {
    pushUnpushButtons("video2",["video1"]);
  }

  // switching test videos
  // switching to video2
  video.src = videos[id] + getFormatExtension();
  video.load();
  video.play();

  pushUnpushButtons("play",["pause"]);
}

////////////////////////////////////////////

////////////////////////////////////////////
/////     HELPER FUNCTIONS
///////////////////////////////////////////////

function pushUnpushButtons (idToPush, idArrayToUnpush) {
  
  ////////////////////////////////////////////
  /////     PUSH THE BUTTONS
  ///////////////////////////////////////////////
  // check if the idToPush argument exists and not an empty string
  if (idToPush != "") {
    var anchor = document.getElementById(idToPush);

    // in that id find me the classes
    var theClass = anchor.getAttribute("class");

    // if something is selected then the indexOf will be greater than 1
    if (!theClass.indexOf("selected") >= 0) {
      // you will create a new class based on the original class + selected like "noir selected"
      theClass = theClass + " selected";
      // then you will add the new class to the target
      anchor.setAttribute("class", theClass);

      // create the URL to the pressed image
      // var newImage = "url(images/" + idToPush + "pressed.png)";
      // anchor.style.backgroundImage = newImage;
      
      // change the background of the button
      // $(this).css('background', '#e74c3c');
      anchor.style.backgroundColor = "rgba(231, 76, 60, 0.2)";
    }
  }

  ////////////////////////////////////////////
  /////     UNPUSH BUTTONS
  ///////////////////////////////////////////////
  
  for(var i = 0; i < idArrayToUnpush.length; i++){
    anchor = document.getElementById(idArrayToUnpush[i]);
    theClass = anchor.getAttribute("class");
    if (theClass.indexOf("selected") >= 0) {
      // remove the selected class by setting it to empty and replacing it
      theClass = theClass.replace("selected","");
      // now the "class selected" is just "class" so stick that on the target
      anchor.setAttribute("class", theClass);
      // remove the background image so we see the unpushed button image which is default
      anchor.style.backgroundImage = "";

      // change the background of the button back to normal
      // simply enter an empty string
      anchor.style.backgroundColor = "";
    }
  }
}

function isButtonPushed (id) {
  // grab the target like id="noir"
  var anchor = document.getElementById(id);
  // grab the class of that anchor
  // like class="effect" for id="noir"
  var theClass = anchor.getAttribute("class");
  // returns true if the anchor has the "selected" class
  return (theClass.indexOf("selected") >= 0);
}

// can the browser actually play the video?
// testing
// this function returns an extension type based on the analysis by the canPlayType method
// this can be added to the name of the video file base to form the full filename link
function getFormatExtension () {
  if (video.canPlayType("video/mp4") != "") {
    return ".mp4";
  } else if (video.canPlayType("video/webm") != "") {
    return ".webm";
  } else if (video.canPlayType("video/ogg") != "") {
    return ".ogv";
  }
}

function endedHandler () {
  pushUnpushButtons("",["play"]);
}

function processFrame () {
  // acquire target
  var video = document.getElementById("video");

  if (video.paused || video.ended) {
    // adding the return breaks and ends this function
    return;
  };

  // target the canvas#buffer
  var bufferCanvas = document.getElementById("buffer");
  // target the canvas#display
  var displayCanvas = document.getElementById("display");

  // you must setup both the canvas#buffer and canvas#display as usual
  // this is a requirement for canvas
  var buffer = bufferCanvas.getContext("2d");
  var display = displayCanvas.getContext("2d");

  ////////////////////////////////////////////
  /////     FILL THE BUFFER
  ///////////////////////////////////////////////

  // to create the buffer
  // we take current video frame... copy it to canvas#buffer
  // once there we can process the frame
  buffer.drawImage(video,0,0,bufferCanvas.width,bufferCanvas.height);
  // specifying var video grabs an entire frame
  // that entire frame is the image
  
  // then we grab the image data from var buffer
  // store in var frame
  // now we can process it
  var frame = buffer.getImageData(0,0,bufferCanvas.width,bufferCanvas.height);
  // 0,0,bufferCanvas.width,bufferCanvas.height simply means we want all the data...
  // the full image
  
  // NOTE:  SecurityError: Failed to execute 'getImageData' on 'CanvasRenderingContext2D': The canvas has been tainted by cross-origin data.
  
  ////////////////////////////////////////////
  /////     PROCESS THE BUFFER
  ///////////////////////////////////////////////
  
  // process var frame
  // find out the length of the frame data
  // divide by 4 because it uses RGBA
  var length = frame.data.length/4;

  // loop ovr data and grab RGB for each pixel
  // each pixel takes up 4 spaces in array
  // r is 1st; g is 2nd; b is 3rd
  for (var i = 0; i < length; i++) {
    var r = frame.data[i*4+0];
    var g = frame.data[i*4+1];
    var b = frame.data[i*4+2];

    // if effectFunction is true (thus not NULL); call the effectFunction
    // each i iteration means processing pixel 1,2...n
    if (effectFunction) {
      effectFunction(i,r,g,b,frame.data);
    }
  }

  // var frame processed
  // use context putImageData method to put data into the display canvas or var display
  display.putImageData(frame,0,0);
  // method takes data in frame and writes it into the canvas as the specific x, y position
  
  ///////////////////////////////////////////////
  
  ////////////////////////////////////////////
  /////     REPEAT PROCESS FRAME BY FRAME
  ///////////////////////////////////////////////
  
  // process the next frame without delay (hence 0)
  setTimeout(processFrame, 0);
  
  ///////////////////////////////////////////////

}

////////////////////////////////////////////
/////     VIDEO ERROR HANDLING
///////////////////////////////////////////////

function errorHandler () {
  var video = document.getElementById("video");
  if (video.error) {
    video.poster = "images/technicaldifficulties.jpg";
    alert(video.error.code);
  }
}

///////////////////////////////////////////////

////////////////////////////////////////////
/////     EFFECT FUNCTIONS
///////////////////////////////////////////////

function bwcartoon(pos, r, g, b, outputData) {
  var offset =  pos * 4;
  if( outputData[offset] < 120 ) {
    outputData[offset] = 80;
    outputData[++offset] = 80;
    outputData[++offset] = 80;
  } else {
    outputData[offset] = 255;
    outputData[++offset] = 255;
    outputData[++offset] = 255;
  }
  outputData[++offset] = 255;
  ++offset;
}

function noir(pos, r, g, b, data) {
  var brightness = (3*r + 4*g + b) >>> 3;
  if (brightness < 0) brightness = 0;
  data[pos * 4 + 0] = brightness;
  data[pos * 4 + 1] = brightness;
  data[pos * 4 + 2] = brightness;
}

function western(pos, r, g, b, data) {
  var brightness = (3*r + 4*g + b) >>> 3;
  data[pos * 4 + 0] = brightness+40;
  data[pos * 4 + 1] = brightness+20;
  data[pos * 4 + 2] = brightness-20;
  data[pos * 4 + 3] = 255; //220;
}

function scifi(pos, r, g, b, data) {
  var offset = pos * 4;
  data[offset] = Math.round(255 - r) ;
  data[offset+1] = Math.round(255 - g) ;
  data[offset+2] = Math.round(255 - b) ;
}

///////////////////////////////////////////////

//////////////////////////////////////////////////
// EXECUTION CODE

// if we play a video and don't have a loop selected, the video plays to the end and stops...
// the play button would remain pressed 
// what we want is it to automatically pop back out
// so it's ready to be pressed again

video.addEventListener("ended", endedHandler,false);
// the "ended" event

// to process video we need play event
// when the video plays start processing
video.addEventListener("play", processFrame, false);

// watch for error events
video.addEventListener("error", errorHandler, false);

//////////////////////////////////////////////////

});  //end doc.onready function
