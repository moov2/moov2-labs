window.Games = Backbone.Collection.extend({
    model: Game,
    url: function ()
    {
        var url = "";
        if (window.document.location.hostname.indexOf('moov2') > -1)
            url += "/backbone";
        return url + '/api/games';
    }
});
