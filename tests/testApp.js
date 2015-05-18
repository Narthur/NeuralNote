/**
 * Created by nathan on 5/12/15.
 */

describe('test App', function() {
    var app, db, view = null;

    beforeEach(function() {
        db = new Db();
        spyOn(db, 'getNotes').and.callThrough();
        view = new View();
        spyOn(view, 'append');
        spyOn(view, 'each').and.callThrough();
        spyOn(view, 'getCss').and.returnValue('300px');
        spyOn(view, 'setCss');
        app = new App(db,view);
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
        expect(db.getNotes).toHaveBeenCalledWith(jasmine.anything());
    });

    it('specifies linkedTo note when getting notes', function() {
       app.addPane(7);
        expect(db.getNotes).toHaveBeenCalledWith(jasmine.anything(),7);
    });

    it('appends pane', function() {
       app.loadPane([{
           'content':'note',
           'noteId':'1'
       }]);
        var html = '<div class="pane"><ul class="getNotes"><li class="note" id="1">note</li></ul></div>';
        expect(view.append).toHaveBeenCalledWith(html,'.frame');
    });

    it('has processNoteClick method', function() {
       app.processNoteClick();
    });

    it('gets notes when processing note click', function() {
        app.processNoteClick(7);
        expect(db.getNotes).toHaveBeenCalledWith(jasmine.anything(),7);
    });

    it('registers action for each pane', function() {
       app.loadPane(['notes']);
        expect(view.each).toHaveBeenCalledWith('.pane',jasmine.anything());
    });

    it('gets css position for panes', function() {
        app.shiftPane('pane');
        expect(view.getCss).toHaveBeenCalledWith('right','pane');
    });

    it('sets css position for panes', function() {
       app.shiftPane('pane');
        expect(view.setCss).toHaveBeenCalledWith('right','600px','pane');
    });
});