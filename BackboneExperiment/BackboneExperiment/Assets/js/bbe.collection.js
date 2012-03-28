window.Games = Backbone.Collection.extend({
    model: Game,
    url: function ()
    {
        //var url = window.document.location.hostname;
        //if (window.document.location.port)
        //    url += ':' + window.document.location.port;
        return '/api/games';//url +
    }//'../api/games'
});
