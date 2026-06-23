import React from 'react';
import { cheminsRegions } from '../../utils/cheminsRegions';
import EtiquetteRegion from './EtiquetteRegion';
import ControlesCarte from './ControlesCarte';

const CarteSenegal = ({ 
  regions, 
  temperatures, 
  regionSelectionnee, 
  onRegionClick,
  obtenirCouleurRegion 
}) => {
  return (
    <div className="relative bg-blue-50 rounded-xl overflow-hidden" style={{ height: '500px' }}>
      <svg viewBox="0 0 1000 736" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
        <rect width="1000" height="736" fill="#e3f2fd" opacity="0.3" />
        <rect width="1000" height="736" fill="#f5f9ff" opacity="0.7" />

        {Object.keys(cheminsRegions).map((cle) => (
          <path
            key={cle}
            id={`region-${cle}`}
            className="map-region cursor-pointer transition-all duration-200 hover:opacity-80"
            onClick={() => onRegionClick(cle)}
            d={cheminsRegions[cle]}
            fill={obtenirCouleurRegion(cle)}
            stroke="white"
            strokeWidth={regionSelectionnee === cle ? 3 : 1.5}
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        ))}

        {Object.keys(regions).map((cle) => (
          <EtiquetteRegion
            key={cle}
            cleRegion={cle}
            temperature={temperatures[cle]}
            estSelectionnee={regionSelectionnee === cle}
          />
        ))}

        <ControlesCarte />
      </svg>

      <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-md p-3">
        <div className="text-xs font-semibold text-gray-700 mb-2">Température (°C)</div>
        <div className="flex items-center gap-1">
          <div className="w-8 h-2 rounded-full bg-gradient-to-r from-green-500 via-yellow-400 to-red-500"></div>
        </div>
        <div className="flex justify-between text-[10px] text-gray-500 mt-1 w-32">
          <span>30</span>
          <span>32</span>
          <span>34</span>
          <span>36</span>
          <span>38</span>
          <span>40</span>
        </div>
      </div>

      <button className="absolute bottom-4 right-4 bg-white rounded-lg shadow-md px-4 py-2 flex items-center gap-2 text-sm text-gray-700 hover:bg-gray-50">
        <i className="fas fa-crosshairs text-agri-green"></i>
        Ma position
      </button>
    </div>
  );
};

export default CarteSenegal;