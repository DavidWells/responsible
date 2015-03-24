

<!-- Start src/responsible.js -->

# Responsive CSS done Right

Give mobile visitors the option of viewing the desktop version of the site with no page reloads or bullshit.

Help improve the user experience on the web

## Prequisties

In order to use the library you need to separate out your responsive CSS into a separate file.

So any media Queries targeting mobile devices (or tablets) should be moved to a new css file.

By default the script looks for a file named responsive.css but you can override this with options

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

