var Labs = Labs || {};

$(document).ready(function () {
    Labs.offlineVideo.init();
});

Labs.offlineVideo = function () {

    var blob;

    var init = function () {
        var xhr = new XMLHttpRequest();

         xhr.open("GET", "/videos/offline-video-example.mp4", true);
         xhr.responseType = "blob";
         xhr.addEventListener("load", function () {
            if (xhr.status !== 200) {
                return;
            }

            blob = xhr.response;
            console.log('success');
        }, false);

        xhr.send();
    };

    return {
        init: init
    }
});
