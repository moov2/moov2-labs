Labs.localStorage = {};

Labs.localStorage.localTextSelector = "#local-text";

Labs.localStorage.localText;

Labs.localStorage.initialise = function () {
    if (Labs.localStorage.isLocalStoragePage()) {
        Labs.localStorage.localText = $(Labs.localStorage.localTextSelector);
        Labs.localStorage.localText.wysiwyg({ events: {
                keyup: Labs.localStorage.wysiwygChanged,
                click: Labs.localStorage.wysiwygChanged
            }
        });
        Labs.localStorage.loadWysiwyg();
        Labs.localStorage.updateStatus();
        setInterval(Labs.localStorage.updateStatus, 5000);
    }
}

Labs.localStorage.isLocalStoragePage = function () {
    return $(Labs.localStorage.localTextSelector).length > 0;
}

Labs.localStorage.updateStatus = function () {
    var seconds = 0;
    if (window.localStorage.getItem('wysiwyg-text')) {
        seconds = ((new Date()).getTime() - (new Date()).setTime(window.localStorage.getItem('timestamp'))) / 1000;
        $("#local-storage-info").html('Last Saved: ' + seconds + ' seconds ago');
    }
}

Labs.localStorage.wysiwygChanged = function (e) {
    Labs.localStorage.saveWysiwyg();
}

Labs.localStorage.saveWysiwyg = function () {
    window.localStorage.setItem('wysiwyg-text', Labs.localStorage.localText.wysiwyg("getContent"));
    window.localStorage.setItem('timestamp', (new Date()).getTime());
}

Labs.localStorage.loadWysiwyg = function () {
    if (window.localStorage.getItem('wysiwyg-text')) {
        Labs.localStorage.localText.wysiwyg("setContent", window.localStorage.getItem('wysiwyg-text'));
    }
}