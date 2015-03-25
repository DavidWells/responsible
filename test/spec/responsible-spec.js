describe('responsible', function () {

  /**
   * mobile() method
   * Adds responsive CSS back to page
   */
  describe('mobile()', function () {

    beforeEach(function () {
      responsible.mobile();
    });

    var viewport = document.querySelector("meta[name=viewport]").getAttribute('content');
    it('viewport should be reset', function () {
      expect(viewport).toEqual('width=device-width, user-scalable=yes, initial-scale=1');
    });

    /*
    // need to fake the document
     var isLoaded = document.getElementById('responsible-css');
    it('Responsive CSS should be reloaded', function () {
      expect(isLoaded.length).toEqual(1);
    });*/


  });

  /**
   * desktop() method
   * retrieves set values (object|strings)
   */

  describe('desktop()', function () {

     beforeEach(function () {
       responsible.desktop();
     });

     var viewport = document.querySelector("meta[name=viewport]").getAttribute('content');
     /*it('viewport should be reset', function () {
       //expect(viewport).toEqual('width=device-width, user-scalable=yes, initial-scale=1');
     });*/

  });

});
