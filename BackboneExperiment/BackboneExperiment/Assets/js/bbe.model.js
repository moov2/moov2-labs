window.Game = Backbone.Model.extend({
    urlRoot: function ()
    {
        var url = "";
        if (window.document.location.hostname.indexOf('moov2') > -1)
            url += "/backbone";
        return url + '/api/games';
    },
    defaults: {
        "id": null,
        "title": "",
        "genre": ""
    }
});
