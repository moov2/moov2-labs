window.GameListView = Backbone.View.extend({
    tagName: 'ul',
    initialize: function () {
        this.model.bind('reset', this.render, this);
        var self = this;
        this.model.bind('add', function (game) {
            $(self.el).append(new GameListItemView({ model: game }).render().el);
        });
    },
    render: function (eventName) {
        $(this.el).empty();
        _.each(this.model.models, function (game) {
            $(this.el).append(new GameListItemView({ model: game }).render().el)
        }, this);
        return this;
    }
});

window.GameListItemView = Backbone.View.extend({
    tagName: 'li',

    template: _.template($('#tpl-game-list-item').html()),

    initialize: function () {
        this.model.bind("change", this.render, this);
        this.model.bind("destroy", this.close, this);
    },

    render: function (eventName) {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    },

    close: function () {
        $(this.el).unbind();
        $(this.el).remove();
    }
});

window.GameView = Backbone.View.extend({
    template: _.template($('#tpl-game-details').html()),
    initialize: function () {
        this.model.bind("change", this.render, this);
        this.model.bind("destroy", this.close, this);
    },
    render: function (eventName) {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    },
    events: {
        "change input": "change",
        "click .save": "saveGame",
        "click .delete": "deleteGame"
    },
    change: function (event) {
        var target = event.target;
        console.log('changing ' + target.id + ' from: ' + target.defaultValue + ' to: ' + target.value);
    },
    saveGame: function () {
        this.model.set({
            title: $('#title').val(),
            genre: $('#genre').val()
        });
        if (this.model.isNew()) {
            var self = this;
            bbe.app.gameList.create(this.model, {
                success: function () {
                    bbe.app.navigate('games/' + self.model.id, false);
                }
            });
        } else {
            this.model.save();
        }
        return false;
    },
    deleteGame: function () {
        this.model.destroy({
            success: function () {
                alert('Game deleted successfully');
                window.history.back();
            }
        });
    },
    close: function () {
        $(this.el).unbind();
        $(this.el).empty();
    }
});

window.HeaderView = Backbone.View.extend({
    template: _.template($('#tpl-header').html()),
    initialize: function () {
        this.render();
    },
    render: function (eventName) {
        $(this.el).html(this.template());
        return this;
    },
    events: {
        "click .new": "newGame"
    },
    newGame: function (event) {
        bbe.app.navigate("games/new", true);
        return false;
    }
});
