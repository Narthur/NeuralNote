/**
 * Created by nathan on 5/12/15.
 */

describe('test App', function() {
    var app, db, view = null;

    beforeEach(function() {
        db = new Db();
        spyOn(db, 'getNotes');
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

    it('appends getNotes when loading frame', function() {
        app.loadFrame([{
            'content':'note',
            'noteId':'1'
        }]);
        var html = '<div class="frame"><div class="pane"><ul class="getNotes"><li class="note" id="1">note</li></ul></div></div>';
        expect(view.append).toHaveBeenCalledWith(html,'body');
    });

    it('gets getNotes when loading app', function() {
        app.loadApp();
        expect(db.getNotes).toHaveBeenCalledWith(app.loadFrame);
    });
});