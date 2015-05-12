/**
 * Created by nathan on 5/12/15.
 */

describe('test View', function () {
    it('exists', function () {
        expect(View).toEqual(jasmine.anything());
    });

    it('has append method', function () {
        var view = new View();
        view.append('html','target');
    });
});