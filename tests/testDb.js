/**
 * Created by nathan on 5/12/15.
 */

describe('test Db', function() {
    it('exists', function () {
        expect(Db).toEqual(jasmine.anything());
    });

    it('has notes method', function () {
        var db = new Db();
        db.notes();
    });
});