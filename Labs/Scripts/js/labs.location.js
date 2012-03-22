var Labs = Labs || {};

$(document).ready(function () {
    Labs.location.init();
});

Labs.location = function () {

    var locationPageSelector = '#location-page';
    var errorElementSelector = '#error';
    var messageElementSelector = '#message';
    var mapOptions = {
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    var mapId = 'map';

    var init = function () {
        if (isLocationPage()) {
            if (navigator.geolocation) {
                message('Getting your location...');
                navigator.geolocation.getCurrentPosition(getLocationSuccess, getLocationError);
            }
            else {
                getLocationError('Not supported');
            }
        }
    }

    var isLocationPage = function () {
        return $(locationPageSelector).length > 0;
    }

    var getLocationSuccess = function (position) {
        clearMessage();
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        SetGmapsLocation(lat, lng);
    }

    var getLocationError = function (error) {
        clearMessage();
        var errors = {
            1: 'Permission denied',
            2: 'Position unavailable',
            3: 'Request timeout'
        };
        error("Error: " + errors[error.code]);
    }

    var error = function (error) {
        $(errorElementSelector).text(error);
    }

    var clearMessage = function () {
        message('');
    }

    var message = function (message) {
        $(messageElementSelector).text(message);
    }

    var SetGmapsLocation = function (lat, lng) {
        map = new google.maps.Map(document.getElementById(mapId), mapOptions);

        initialLocation = new google.maps.LatLng(lat, lng);
        map.setCenter(initialLocation);
        var marker = new google.maps.Marker({position:initialLocation, map:map});
    }

    return {
        init: init
    };
} ();