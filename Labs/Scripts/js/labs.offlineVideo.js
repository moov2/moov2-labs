var Labs = Labs || {};

$(document).ready(function () {
    Labs.offlineVideo.init();
});

Labs.offlineVideo = function () {

    var blob;
    var db = new PouchDB('offlinevideo');

    var addVideoToPage = function (video) {
        $('.js-video-container').html('<video class="js-video" style="width: 320px; height: 240px;" controls></video>');
        $('.js-video-container video').attr('src', window.URL.createObjectURL(video));
    };

    var getVideoFromLocalDB = function () {
        db.getAttachment('offline-video', '/video', function(err, res) {
            if (res) {
                addVideoToPage(res);
                return;
            }

            getVideoFromServer();
        });
    };

    var getVideoFromServer = function () {
        var xhr = new XMLHttpRequest();

        xhr.open("GET", "/videos/offline-video-example.mp4", true);
        xhr.responseType = "blob";
        xhr.addEventListener("load", function () {
            if (xhr.status !== 200) {
                return;
            }

            blob = xhr.response;
            saveVideoToLocalDB(blob);
        }, false);

        xhr.send();
    };

    var init = function () {
        getVideoFromLocalDB();

        $('.js-clear').on('click', function () {
            PouchDB.destroy('offlinevideo');
        });

        return;
    };

    saveVideoToLocalDB = function (blob) {
        db.put({_id: 'offline-video'}, function(err, response) {
            if (!response) {
                $('.js-video-container').html('<p>Storing of videos is not supported in this browser.</p>');
                return;
            }

            db.putAttachment(response.id, '/video', response.rev, blob, 'video/mp4', function (err, res) {
                addVideoToPage(blob);
            });
        });
    };

    return {
        init: init
    };
}();
