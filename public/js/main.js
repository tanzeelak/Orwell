console.log("Big brother is always watching.");
//Tracking.js Demo Code
window.onload = function() {
  var video = document.getElementById("video");
  var canvas = document.getElementById("canvas");
  var context = canvas.getContext("2d");
  var tracker = new tracking.ObjectTracker("face");
  tracker.setInitialScale(4);
  tracker.setStepSize(2);
  tracker.setEdgesDensity(0.1);
  tracking.track("#video", tracker, { camera: true });
  tracker.on("track", function(event) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    event.data.forEach(function(rect) {
      context.strokeStyle = "#a64ceb";
      context.strokeRect(rect.x, rect.y, rect.width, rect.height);
      console.log(rect.x);
      console.log(rect.y);
      console.log(rect.width);
      console.log(rect.height);
      moveDiv(rect.x, rect.y);
    });
  });
  var gui = new dat.GUI();
  gui.add(tracker, "edgesDensity", 0.1, 0.5).step(0.01);
  gui.add(tracker, "initialScale", 1.0, 10.0).step(0.1);
  gui.add(tracker, "stepSize", 1, 5).step(0.1);
};

function moveDiv(x, y) {
    charId = document.getElementById('box');
    charId.style.top = y + "px";
    charId.style.left = x + "px";
}