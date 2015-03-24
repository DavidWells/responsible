

<!-- Start src/responsible.js -->

# Responsive CSS done Right

Give mobile visitors the option of viewing the desktop version of the site with no page reloads or bullshit.

* Help improve the user experience on the web **

## Prerequisites

In order to use the library you need to separate out your responsive CSS into a separate file.

So any media Queries targeting mobile devices (or tablets) should be moved to a new css file.

By default the script looks for a file named responsive.css but you can override this with options

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
      //console.log('Extend');
        for (var key in b) {
          //console.log(key)
          if (b.hasOwnProperty(key)) {
            a[key] = b[key];
          }
        }

        return a;
    };

## desktop()

Triggers desktop mode

Usage:

```js
responsible.desktop(); // toggles desktop view
// pass in arguments
responsible.desktop({'targetWidth': 1170 });
```

## mobile()

Triggers mobile mode

Usage:

```js
responsible.mobile(); // toggles desktop view
// pass in arguments
responsible.mobile({'targetWidth': 1170 });
```

<!-- End src/responsible.js -->

