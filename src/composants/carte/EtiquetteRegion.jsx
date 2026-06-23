import React from 'react';
import { REGIONS } from '../../utils/constantes';

const EtiquetteRegion = ({ cleRegion, temperature, estSelectionnee }) => {
  const point = REGIONS[cleRegion];
  if (!point) return null;

  return (
    <g className="pointer-events-none">
      <text 
        x={point.cx} 
        y={point.cy - 8} 
        className="text-xs fill-white font-medium" 
        textAnchor="middle"
        style={{ textShadow: '0 1px 3px rgba(0,0,0,0.3)' }}
      >
        {point.nom}
      </text>
      <text 
        x={point.cx} 
        y={point.cy + 14} 
        className="text-xs fill-white font-bold" 
        textAnchor="middle"
        style={{ textShadow: '0 1px 3px rgba(0,0,0,0.3)' }}
      >
        {temperature !== null && temperature !== undefined ? `${temperature.toFixed(1)}°C` : '--°C'}
      </text>
      <circle 
        cx={point.cx} 
        cy={point.cy + 30} 
        r="5" 
        fill={estSelectionnee ? '#ffd700' : 'rgba(255,255,255,0.6)'}
        stroke="white"
        strokeWidth="1"
      />
    </g>
  );
};

export default EtiquetteRegion;