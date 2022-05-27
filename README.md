# Mapbox React 18 rendering issue

The viewport sync between Mapbox and a React/SVG overlay is slightly lagging when using React 18. It goes away when downgrading to React 17 or when using the legacy `ReactDOM.render()` instead of `ReactDOM.createRoot()` for rendering the app.


