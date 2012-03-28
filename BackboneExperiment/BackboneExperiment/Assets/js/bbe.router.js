window.AppRouter = Backbone.Router.extend({
    routes: {
        "": "list",
        "games/new": "newGame",
        "games/:id": "gameDetails"
    },
    initialize: function () {
        $('#header').html(new HeaderView().render().el);
    },
    list: function () {
        this.gameList = new Games();
        var self = this;
        this.gameList.fetch({
            success: function () {
                self.gameListView = new GameListView({ model: self.gameList });
                $('#sidebar').html(self.gameListView.render().el);
                if (self.requestedId) self.gameDetails(self.requestedId);
            }}
        );
    },
    gameDetails: function (id) {
        if (this.gameList) {
            this.game = this.gameList.get(id);
            if (this.gameView) this.gameView.close();
            this.gameView = new GameView({ model: this.game });
            $('#content').html(this.gameView.render().el);
        } else {
            this.requestedId = id;
            this.list();
        }
    },
    newGame: function () {
        if (!this.gameListView) this.list();
        if (this.gameView) this.gameView.close();
        this.gameView = new GameView({ model: new Game() });
        this.navigate("games/new", false);
        $('#content').html(this.gameView.render().el);
    }
});
