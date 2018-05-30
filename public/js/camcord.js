var video = document.querySelector('video');
function trackingInit(){
	var tracker = new tracking.ObjectTracker('face');
	tracker.setInitialScale(4);
    tracker.setStepSize(2);
    tracker.setEdgesDensity(0.1);
    tracking.track(video, tracker, { camera: true });
    console.log(video);
    tracker.on("track", function(event) {
        event.data.forEach(function(rect) {
            setFaceCoords(rect.x + (rect.width/2), rect.y + (rect.height/2));
        });
    });
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

document.getElementById('btn-stop-recording').onclick = function() {
    this.disabled = true;
    recorder.stopRecording(stopRecordingCallback);
    video.removeAttribute('hidden');
};