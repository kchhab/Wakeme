window.onload = function() {
    var video = document.getElementById('video');
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var alarm = document.getElementById('alarm');
    var eyeClosedTimer;
    var alarmTimer;

    // Get access to the camera
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(function(stream) {
            video.srcObject = stream;
            video.play();
        })
        .catch(function(err) {
            console.log("An error occurred: " + err);
        });

    // Initialize tracking
    var tracker = new tracking.ObjectTracker(['face', 'eye']);
    tracker.setInitialScale(4);
    tracker.setStepSize(2);
    tracker.setEdgesDensity(0.1);

    tracking.track('#video', tracker, { camera: true });

    tracker.on('track', function(event) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        var eyesDetected = false;

        event.data.forEach(function(rect) {
            if (rect.type === 'eye') {
                eyesDetected = true;
                context.strokeStyle = '#a64ceb';
                context.strokeRect(rect.x, rect.y, rect.width, rect.height);
                context.font = '11px Helvetica';
                context.fillStyle = "#fff";
                context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
                context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);
            }
        });

        if (!eyesDetected) {
            if (!eyeClosedTimer) {
                eyeClosedTimer = setTimeout(function() {
                    alarmTimer = setTimeout(function() {
                        alarm.play();
                    60000); // 1 minute
            }
        } else {
            clearTimeout(eyeClosedTimer);
            clearTimeout(alarmTimer);
            eyeClosedTimer = null;
            alarm.pause();
            alarm.currentTime = 0;
        }
    });
};
