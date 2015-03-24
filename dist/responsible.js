/*! responsible.js v1.2.0 | (c) 2015 @davidwells | https://github.com/davidwells/responsible */
/**
# Responsive CSS done Right

Give mobile visitors the option of viewing the desktop version of the site with no page reloads or bullshit.

Help improve the user experience on the web

## Prerequisites

In order to use the library you need to separate out your responsive CSS into a separate file.

So any media Queries targeting mobile devices (or tablets) should be moved to a new css file.

By default the script looks for a file named responsive.css but you can override this with options

*/

(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else if (typeof exports === 'object') {
        module.exports = factory;
    } else {
        root.responsible = factory();
    }
})(this, function() {


    // Cross-browser event listening
    addListener = function(element, eventName, listener) {
         if (!element) { return; }

         if (element.addEventListener) {
             element.addEventListener(eventName, listener, false);
         } else if (element.attachEvent) {
             element.attachEvent("on" + eventName, listener);
         } else {
             element['on' + eventName] = listener;
         }
     };
    removeListener = function(element, eventName, listener) {
         if (!element) { return; }

         if (element.removeEventListener) {
             element.removeEventListener(eventName, listener, false);
         } else if (element.detachEvent) {
             element.detachEvent("on" + eventName, listener);
         } else {
             element["on" + eventName] = null;
         }
     };
    _logStr = function(string) {
       if (window.console) { // IE...
         window.console.log("Responsible: " + string);
       }
    };
    _argsOrDefault = function(args, key) {
          if (typeof args[key] !== 'undefined') {
            return args[key];
          } else {
            return Defaults[key];
          }
    };

    mergeOptions = function(arguments) {
        ops = {};
        switch (typeof arguments[0]) {
            // no custom settings defined, return empty
            case 'undefined':
              return Defaults;
              break;
            // Ex: responsible.mobile("/css/responsive.css", 1200 );
            case 'string':
              ops.path = arguments[0];
              ops.deviceWidth  = arguments[1] || Defaults.deviceWidth;
              if (typeof (arguments[(arguments.length - 1)]) === 'function') {
                // if last arg a function, assign to callback
                ops.doneFunction  = arguments[(arguments.length - 1)] || null;
              }
              return ops;
              break;

            // Ex: responsible.mobile({path:"/css/responsive.css", deviceWidth: 1200 });
            case 'object':
              if (arguments[0].path === undefined) {
                _logStr('Missing "path" argument!');
                return false;
              }

              ops.path = _argsOrDefault(arguments[0], 'path');
              ops.targetWidth = _argsOrDefault(arguments[0], 'targetWidth');

              // Function to call when clicking on cancel/OK
              ops.doneFunction = arguments[1] || null;
              return ops;
              break;

            default:
              _logStr('Unexpected type of arg! Expected "string" or "object", got ' + typeof arguments[0]);
              return ops;

          }
    };


    // Merge script defaults with user options
    extend = function(a, b){
      console.log('Extend');
        for (var key in b) {
          console.log(key)
          if (b.hasOwnProperty(key)) {
            a[key] = b[key];
          }
        }

        return a;
    };

    // Create cookie
    _createCookie = function(name, value, days, custom_time) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toGMTString();
        }
        if (custom_time) {
            expires = "; expires=" + days.toGMTString();
        }
        document.cookie = name + "=" + value + expires + "; path=/";
    };
    // Read cookie
    _readCookie = function(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1, c.length);
            }
            if (c.indexOf(nameEQ) === 0) {
                return c.substring(nameEQ.length, c.length);
            }
        }
        return null;
    };
    /*! _getWidth = function() {
       // get viewport width of browser
       var elem = (document.compatMode === "CSS1Compat") ?
       document.documentElement :
       document.body;

       return elem.clientWidth;
     };*/
    _getViewPort = function() {
         var viewport = document.querySelector("meta[name=viewport]");
         if (viewport) {
             return viewport;
         } else {
             // insert viewport
             viewport = document.createElement('meta');
             viewport.name = "viewport";
             viewport.content = "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0";
             document.getElementsByTagName('head')[0].appendChild(viewport);
             return viewport;
         }
    };
    // File Operations
    _loadCSS = function(path) {
        var isLoaded = document.getElementById('responsible-css');
        if(isLoaded) { return false; }

        var cssRef = document.createElement("link");
        cssRef.id = "responsible-css";
        cssRef.setAttribute("rel", "stylesheet");
        cssRef.setAttribute("type", "text/css");
        cssRef.setAttribute("href", path);

        document.getElementsByTagName("head")[0].appendChild(cssRef);
    };
    // might be able to just disable stylesheet
    _removeCSS = function(filename) {
        filename = filename || Defaults.path;
        var cssFiles = document.getElementsByTagName('link');
        // search backwards within nodelist for matching cssFiles to remove
        for (var i = cssFiles.length; i >= 0; i--) {
          console.log(cssFiles[i]);
            if (cssFiles[i] && cssFiles[i].getAttribute("href") !== null && cssFiles[i].getAttribute("href").indexOf(filename) !== -1) {
                cache = cssFiles[i].getAttribute("href");
                cssFiles[i].parentNode.removeChild(cssFiles[i]);

            }

        }
    };

    var responsible = {},
    Defaults = {
      targetWidth: 1280,
      deviceWidth : 'device-width',
      path: 'responsive.css'
    },
    viewport = _getViewPort(),
    cache;


    _desktopAddToggle = function(){
        var toggle = document.getElementById('responsible-toggle');
        if(toggle) { return false; }

         var firstElement = document.body.children[0],
         div = document.createElement("div");
         div.id = "responsible-toggle";
         div.style.padding = "30px 0 45px";
         div.style.width = "100%";
         div.style.color = "#eaeaea";
         div.style.fontSize = "60px";
         div.style.fontWeight = "bold";
         div.style.backgroundColor = "#444";
         div.style.textAlign = "center";
         div.style.cursor = "pointer";
         div.innerText = "Toggle Mobile Site";
         // insert at top of page
         document.body.insertBefore(div, firstElement);
         addListener(div, 'click', responsible.mobile);
     };

     _desktopRemoveToggle = function(){
            var toggle = document.getElementById('responsible-toggle');

            if(toggle) {
                 console.log('Destroy toggle');
                 removeListener(toggle, 'click', responsible.mobile);
                 document.body.removeChild(toggle);
            }
      };

    /**
     * Triggers desktop mode
     *
     * Usage:
     *
     * ```js
     * responsible.desktop(); // toggles desktop view
     * // pass in arguments
     * responsible.desktop({'targetWidth': 1170 });
     * ```
     */
    responsible.desktop = function() {
        var Settings = mergeOptions(arguments);
        console.log('SEttings', Settings);
        var Options = (Settings) ? extend(Defaults, Settings) : Defaults;

        _removeCSS( Options.path );
        viewport.setAttribute("content",
            'width=' + Options.targetWidth + ", user-scalable=yes, initial-scale=.25, maximum-scale=.35");
        _desktopAddToggle();

        setTimeout(function() {
          // make it zoomable
          viewport.setAttribute("content",
              'width=' + Options.targetWidth + ", user-scalable=yes, initial-scale=.25, maximum-scale=1");

        }, 300);
        //viewportWidth = _getWidth(); // Desktop fix
        //var width = (viewportWidth > Options.targetWidth) ? viewportWidth : Options.targetWidth;
        //document.body.style.width = width + "px";
    };
    /**
     * Triggers mobile mode
     *
     * Usage:
     *
     * ```js
     * responsible.mobile(); // toggles desktop view
     * // pass in arguments
     * responsible.mobile({'targetWidth': 1170 });
     * ```
     */
    responsible.mobile = function() {

      var Settings = mergeOptions(arguments);
      console.log('SEttings', Settings);
      var Options = (Settings) ? extend(Defaults, Settings) : Defaults;
      console.log('cached pathhere ', cache);
      console.log('customizations', Options);
        // Load responsive CSS

        console.log("add responsive CSS", Options.path);
        var path = (cache) ? cache : Options.path;
        _loadCSS( path );

        // Set viewport back to mobile
        viewport.setAttribute('content', 'width=device-width, user-scalable=yes, initial-scale=1');
        document.body.style.width = "100%";
        if(Options.doneFunction){
          console.log('has done');
          Options.doneFunction();
        }
    };

    return responsible;

});