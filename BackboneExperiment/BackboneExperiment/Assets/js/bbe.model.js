window.Game = Backbone.Model.extend({
    urlRoot: function ()
    {
        //var url = window.document.location.hostname;
        //if (window.document.location.port)
        //    url += ':' + window.document.location.port;
        return '/api/games';//url +
    },//"../api/games",
    defaults: {
        "id": null,
        "title": "",
        "genre": ""
    }
});
