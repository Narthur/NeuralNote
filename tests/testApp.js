/**
 * Created by nathan on 5/12/15.
 */

describe('test App', function() {
    var app, db = null;

    beforeEach(function() {
        db = new Db();
        spyOn(db, 'notes');
        app = new App(db);

    });

    it('has app class', function () {
        expect(App).toEqual(jasmine.anything());
    });

    it('has load frame method', function () {
        app.loadFrame();
    });

    it('gets notes for frame', function () {
        app.loadFrame();
        expect(db.notes).toHaveBeenCalled();
    });
});