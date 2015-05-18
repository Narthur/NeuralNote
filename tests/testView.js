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

    it('has setCss method', function() {
       var view = new View();
        view.setCss('height','300px','body');
    });

    it('has getCss method', function() {

    });
});