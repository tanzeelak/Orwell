var video = document.querySelector('video');
function trackingInit(){
    var tracker = new clm.tracker({scoreThreshold : 0.4});
    tracker.init();
    tracker.start(video);
    setInterval(function updateCoords(){
        var halfvidX = video.offsetWidth/2.0
        var halfvidY = video.offsetHeight/2.0;
        var pos = tracker.getCurrentPosition();
        if(tracker.getScore() >= 0.4){
            setFaceCoords((pos[37][0] - halfvidX)/halfvidX, (pos[37][1] - halfvidY)/halfvidY);
        }else{
            setFaceCoords(0, 0);
        }
        //console.log(pos[37], halfvidX)
    }, 100);
}


function captureCamera(callback) {
    navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then(function(camera) {
        callback(camera);
    }).catch(function(error) {
        alert('Unable to capture your camera. Please check console logs.');
        console.error(error);
    });
}

function stopRecordingCallback() {
    video.src = video.srcObject = null;
    video.src = URL.createObjectURL(recorder.getBlob());
    video.play();
    recorder.camera.stop();
    recorder.destroy();
    recorder = null;
}

var recorder; // globally accessible

captureCamera(function(camera) {
    setSrcObject(camera, video);
    video.play();

    recorder = RecordRTC(camera, {
        type: 'video'
    });

    recorder.startRecording();

    // release camera on stopRecording
    recorder.camera = camera;
});

function stopRecording() {
  recorder.stopRecording(stopRecordingCallback);
  video.removeAttribute('hidden');
}
