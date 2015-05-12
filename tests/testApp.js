/**
 * Created by nathan on 5/12/15.
 */

describe('test App', function() {
    var app, db, view = null;

    beforeEach(function() {
        db = new Db();
        spyOn(db, 'notes');
        view = new View();
        spyOn(view, 'append');
        app = new App(db,view);

    });

    it('has load app method', function () {
        app.loadApp();
    });

    it('appends when loading frame', function() {
        app.loadFrame([]);
        expect(view.append).toHaveBeenCalled();
    });

    it('appends notes when loading frame', function() {
        app.loadFrame([{
            'content':'note',
            'noteId':'1'
        }]);
        var html = '<div class="frame"><div class="pane"><ul class="notes"><li class="note" id="1">note</li></ul></div></div>';
        expect(view.append).toHaveBeenCalledWith(html,'body');
    });

    it('gets notes when loading app', function() {
        app.loadApp();
        expect(db.notes).toHaveBeenCalledWith(app.loadFrame);
    });
});