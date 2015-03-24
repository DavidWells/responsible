# Responsible JS - Responsive Websites done right

Give mobile visitors the option of viewing the desktop version of the site with no page reloads or bullshit.

### ** Help improve the user experience on the web **

### [Live Demo](http://davidwells.tv/code/responsible/)

## Prerequisites

In order to use the library you need to separate out your responsive CSS into a separate file.

This means any media queries targeting mobile devices (or tablets) should be moved to a new css file.

See [/demo/css](/demo/css) for an example of `old-combined-styles.css` split up into `styles.css` and `responsive.css`.

By default the script looks for a file named responsive.css but you set the correct path with the cssPath param.

## Manual installation

Drop your files into your required folders, make sure you're using the files from the dist folder, which is the compiled production-ready code. Ensure you place the script before the closing ``</body>`` tag so the DOM tree is populated when the script runs.

```html
<body>
    <!-- html content above -->
  <script src="dist/responsible.js"></script>
  <script>
  responsible.init(cssPath: 'http://yoursite.com/css/responsive.css');
  </script>
</body>
```

## Usage:

Include the script on your page and initialize:

```js
// launches script with default settings
responsible.init(cssPath: 'http://yoursite.com/css/responsive.css');
```

By default, the script inject the responsive toggles into the dom for you. You can override that by passing in different settings:

```js
// launches script with custom settings
responsible.init({
      cssPath: 'responsive.css', // path to responsive css file containing media queries
      desktopWidth: 1280, // the desired width of the mobile desktop view
      toggleThreshold: 980, // if the window is smaller than this width, the mobile toggle will display
      desktopToggleDisplay: true, // set to false to hide mobile toggle
      desktopToggleText: "Toggle Mobile Site", // Text on the 'Back to mobile' Toggle
      mobileToggleDisplay: true, // set to false to hide mobile toggle
      mobileToggleText: "View Full Site", // Text on the 'View full site' Toggle
      mobileToggleAlign: 'right', // right or left
      mobileToggleBottom: '0px' // offset from bottom
    });
```

### Set your own toggles

If you want to turn off the built in toggles, you can set both ToggleDisplay settings to false and trigger the desktop or mobile mode manually with custom events.

Like for example, if you want to have the mobile/desktop toggles in your site footer or menu instead of the baked in toggles.

```js
responsible.init({
      desktopToggleDisplay: false,
      mobileToggleDisplay: false,
});
```

```html
<!-- Toggle Desktop from custom button click -->
<button onClick="script:responsible.desktop();">Toggle Desktop</button>
<!-- Toggle Mobile from custom button click -->
<button onClick="script:responsible.mobile();">Toggle Mobile View</button>
```

## Inspired By:

Github has a pretty solid mobile experience for users but when switching from mobile to desktop it requires a full page reload, this library sidesteps that and creates a seamless experience for mobile browsing

