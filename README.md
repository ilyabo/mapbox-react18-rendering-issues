# Mapbox React 18 rendering issue

The viewport sync between Mapbox and a React/SVG overlay is slightly lagging when using React 18. It goes away when downgrading to React 17 or when using the legacy `ReactDOM.render()` instead of `ReactDOM.createRoot()` for rendering the app.


Looks like the issue is caused by the [Automatic Batching](https://reactjs.org/blog/2022/03/08/react-18-upgrade-guide.html#automatic-batching) and wrapping `setViewport` into `flushSync` solves it at least in this demo app.
