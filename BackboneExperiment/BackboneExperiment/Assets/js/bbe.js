_.templateSettings = {
    interpolate: /\{\{(.+?)\}\}/g
};

var bbe = function () {
    if (!this.app) this.app = undefined;
    var init = function () {
        this.app = new AppRouter;
        Backbone.history.start()
    }
    return {
        init: init,
        app: app
    }
}();

$(document).ready(function () {
    bbe.init();
});
