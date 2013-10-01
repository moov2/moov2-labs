var Labs = Labs || {};

$(document).ready(function () {
    Labs.offlineVideo.init();
});

Labs.offlineVideo = function () {

    var blob, db, request,
        dbVersion = 1,
        dbName = 'offlinevideodemo',
        objectStoreName = 'offlinevideos',
        blobSupportedName = 'blobsupported',
        blobSupported = false;

    var addVideoToPage = function (video) {
        $('.js-video-container').html('<video class="js-video" style="width: 320px; height: 240px;" controls></video>');
        $('.js-video-container video').attr('src', window.URL.createObjectURL(video));
    };

    var checkBlobSupported = function () {
        try {
            var transaction = db.transaction([blobSupportedName], 'readwrite');
            transaction.objectStore(blobSupportedName).put(new Blob(), 'key');
            transaction.objectStore(blobSupportedName).delete('key');
            blobSupported = true;
        } catch (err) {
            blobSupported = false;
        } finally {
            console.log('blob supported = ' + blobSupported);
            getVideoFromLocalDB();
        }
    };

    var createObjectStore = function (database) {
        database.createObjectStore(objectStoreName);
        database.createObjectStore(blobSupportedName);
    };

    var fixBinary = function (bin) {
        var length = bin.length;
        var buf = new ArrayBuffer(length);
        var arr = new Uint8Array(buf);

        for (var i = 0; i < length; i++) {
            arr[i] = bin.charCodeAt(i);
        }

        return buf;
    }

    var getVideoFromLocalDB = function () {
        var transaction = db.transaction([objectStoreName], 'readwrite'),
            blob;

        transaction.objectStore(objectStoreName).get('video').onsuccess = function (event) {
            if (!event.target.result) {
                getVideoFromServer();
                return;
            }

            if (blobSupported) {
                blob = event.target.result;
            } else {
                var data = fixBinary(atob(event.target.result));
                blob = new Blob([data], {type: 'video/mp4'});
            }

            addVideoToPage(blob);
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
            console.log('onupgradeneeded');
            createObjectStore(event.target.result)
        };

        request.onsuccess = function () {
            db = request.result;

            db.onerror = function () {
                console.log("Error creating/accessing IndexedDB database");
            };

            checkBlobSupported();
        };

        $('.js-clear').on('click', function () {
            db.close();
            indexedDB.deleteDatabase(dbName);
        });

        return;
    };

    saveVideoToLocalDB = function (blob) {
        var reader = new FileReader();

        reader.onloadend = function(e) {
            // check here if blob is supported.
            data = (!blobSupported) ? btoa(this.result) : blob;

            var transaction = db.transaction([objectStoreName], 'readwrite');
            transaction.objectStore(objectStoreName).put(data, 'video');

            addVideoToPage(blob);
        };

        if (reader.readAsBinaryString) {
            reader.readAsBinaryString(blob);
        } else {
            reader.readAsText(blob);
        }
    };

    return {
        init: init
    };
}();
