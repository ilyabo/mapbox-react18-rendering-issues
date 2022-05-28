# Mapbox React 18 rendering issue

https://user-images.githubusercontent.com/351828/170812048-9d039c51-e6d2-4db9-a9fd-7bd1f173c713.mp4

The viewport sync between Mapbox and a React/SVG overlay is slightly lagging when using React 18. It goes away when downgrading to React 17 or when using the legacy `ReactDOM.render()` instead of `ReactDOM.createRoot()` for rendering the app.


Looks like the issue is caused by the [Automatic Batching](https://reactjs.org/blog/2022/03/08/react-18-upgrade-guide.html#automatic-batching) and wrapping `setViewport` into `flushSync` solves it at least in this demo app.
