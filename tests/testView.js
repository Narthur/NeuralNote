/**
 * Created by nathan on 5/12/15.
 */

describe('test View', function () {
    var view = null;

    beforeEach(function() {
        view = new View();
    });

    it('exists', function () {
        expect(View).toEqual(jasmine.anything());
    });

    it('has append method', function () {
        view.append('html','target');
    });

    it('has setCss method', function() {
        view.setCss('height','300px','body');
    });

    it('has getCss method', function() {
        view.getCss('height');
    });

    it('has each method', function() {
        var callback = function() {}
        view.each('target', callback);
    });
});