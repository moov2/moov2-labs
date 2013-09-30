var Labs = Labs || {};

$(document).ready(function () {
    Labs.offlineVideo.init();
});

Labs.offlineVideo = function () {

    var blob, db, request,
        dbVersion = 1,
        dbName = 'offlinevideodemo',
        objectStoreName = 'offlinevideos';

    var addVideoToPage = function (video) {

        $('.js-video-container').html('<video class="js-video" style="width: 320px; height: 240px;" controls></video>');
        $('.js-video-container video').attr('src', window.URL.createObjectURL(video));
    };

    var createObjectStore = function (database) {
        database.createObjectStore(objectStoreName);
    };

    var getVideoFromLocalDB = function () {
        var transaction = db.transaction([objectStoreName], 'readwrite');

        transaction.objectStore(objectStoreName).get('video').onsuccess = function (event) {
            if (!event.target.result) {
                getVideoFromServer();
                return;
            }

            addVideoToPage(event.target.result);
        };
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
        }, true);

        xhr.send();
    };

    var init = function () {
        request = indexedDB.open(dbName, dbVersion);

        request.onupgradeneeded = function(event) {
            createObjectStore(event.target.result)
        };

        request.onsuccess = function () {
            db = request.result;

            db.onerror = function () {
                console.log("Error creating/accessing IndexedDB database");
            };

            getVideoFromLocalDB();
        };

        $('.js-clear').on('click', function () {
            indexedDB.deleteDatabase(dbName);
        });

        return;
    };

    saveVideoToLocalDB = function (blob) {
        var transaction = db.transaction([objectStoreName], 'readwrite');
        transaction.objectStore(objectStoreName).put(blob, 'video');

        addVideoToPage(blob);
    };

    return {
        init: init
    };
}();
