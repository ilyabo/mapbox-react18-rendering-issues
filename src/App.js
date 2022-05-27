import React, {useCallback, useEffect, useRef, useState} from 'react';
import * as mapboxgl from 'mapbox-gl';
import CirclesLayer from "./CirclesLayer";
import 'mapbox-gl/dist/mapbox-gl.css';

const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json';

const DATA = (() => {
  const data = [];
  for (let i = 0; i < 1000; i++) {
    const lon = Math.random() * 360 - 180;
    const lat = Math.random() * 180 - 90;
    data.push({
      lon,
      lat,
      size: Math.random() * 10,
      color: `hsl(${Math.random() * 360}, ${Math.random()*50+10}%, ${Math.random()*50+50}%)`,
    });
  }
  return data;
})();

function App() {
  const mapContainerRef = useRef();
  const mapRef = useRef();
  const [viewport, setViewport] = useState();

  const handleMapViewChanged = () => {
    const container = mapContainerRef.current;
    if (mapRef.current && container) {
      const {lng, lat} = mapRef.current.getCenter();
      setViewport({
        width: container.clientWidth,
        height: container.clientHeight,
        latitude: lat,
        longitude: lng,
        zoom: mapRef.current.getZoom(),
      });
    }
  };

  useEffect(() => {
    if (mapContainerRef.current && !mapRef.current) {
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: MAP_STYLE,
      });
      mapRef.current = map;
      map.on('viewreset', handleMapViewChanged);
      map.on('move', handleMapViewChanged);
      handleMapViewChanged();
    }
  }, [mapContainerRef.current]);

  const project = useCallback(
    ([lon, lat]) => {
      const {x, y} = mapRef.current.project(new mapboxgl.LngLat(lon, lat));
      return [x, y];
    },
    [mapRef.current?.project]
  );


  return (
    <div
      style={{width: "100%", height: "100%", position: "absolute"}}
    >
      <div
        ref={mapContainerRef}
        style={{width: "100%", height: "100%", position: "absolute"}}
      />
      <div style={{width: "100%", height: "100%", position: "absolute", pointerEvents: "none"}}>
        <CirclesLayer
          project={project}
          viewport={viewport}
          data={DATA}
        />
      </div>
    </div>
  );
}


export default App;
