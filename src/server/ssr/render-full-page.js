import sanitise from './sanitise-javascript';

export default (html, preloadedState, sheets) => Promise.resolve(
  `
  <!DOCTYPE html>
<html>

<head>
  <link href="https://fonts.googleapis.com/css?family=PT+Sans" rel="stylesheet">
  <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">
  <link rel="icon" href="/favicon.ico" type="image/x-icon">
  <meta charset='utf-8'>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
  <link href="/style.css" rel="stylesheet"></head>
  <style type="text/css" id="jss-server-side">
      ${sheets.toString()}
  </style>

<body>
  <div id="react-root">${html}</div>
  <script>
    // WARNING: See the following for security issues around embedding JSON in HTML:
    // http://redux.js.org/recipes/ServerRendering.html#security-considerations
    window.__PRELOADED_STATE__ = ${sanitise(preloadedState)}
  </script>
<script type="text/javascript" src="/manifest.js"></script><script type="text/javascript" src="/vendor.js"></script><script type="text/javascript" src="/main.js"></script></body>

</html>`,
);