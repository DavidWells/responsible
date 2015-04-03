describe('responsible', function () {

  /* Test Mobile Desktop View */
  describe('Toggle Desktop View', function () {

    beforeEach(function () {
        var viewport = document.querySelector("meta[name=viewport]").getAttribute('content');
        console.log('initial viewport', viewport);

    });

    /*var head = document.getElementsByTagName('head');
    console.log('test', head);
    var body = document.getElementsByTagName('body');
    console.log('test', body);*/

    // make test think its on mobile device with 9999999 width threshold
    responsible.init({toggleThreshold: 9999999});
    // trigger desktop view
    responsible.desktop();

    var mobileDesktopViewPort = document.querySelector("meta[name=viewport]").getAttribute('content');
    console.log(mobileDesktopViewPort);

    it('viewport should be reset', function () {
      expect(mobileDesktopViewPort).toEqual('width=1280, user-scalable=yes, initial-scale=.25, maximum-scale=.35');
    });


  });

  /* Test Flip back to Mobile View */
  describe('Toggle Mobile View', function () {

    // make test think its on mobile device
    responsible.init({toggleThreshold: 9999999});
    // toggle desktop mode
    responsible.desktop();
    // toggle back to mobile
    responsible.mobile();

    var mobileViewPort = document.querySelector("meta[name=viewport]").getAttribute('content');
    //console.log(mobileViewPort);

    it('viewport should be reset', function () {
      expect(mobileViewPort).toEqual('width=device-width, user-scalable=yes, initial-scale=1');
    });


  });



});
