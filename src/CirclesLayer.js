import React from 'react';

const CirclesLayer = (props) => {
  const {data, project, viewport} = props;
  if (!viewport) return null;
  const {width, height} = viewport;
  return (
    <svg width={width} height={height}>
      <g>
        {data?.map((item, i) => {
          const [x, y] = project([item.lon, item.lat]);
          return (
              <circle key={i} cx={x} cy={y} r={item.size} fill={item.color}/>
          );
        })}
      </g>
    </svg>
  );
};

export default CirclesLayer;
