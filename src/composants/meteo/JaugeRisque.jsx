import React from 'react';

const JaugeRisque = ({ score, libelle, couleur }) => {
  const rotation = -90 + (score / 100) * 180;
  
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-gray-800">Indice de risque climatique</span>
          <i className="fas fa-info-circle text-gray-400 text-sm"></i>
        </div>
        <span 
          className="text-white text-xs font-bold px-2 py-1 rounded-full"
          style={{ backgroundColor: couleur }}
        >
          {libelle}
        </span>
      </div>

      <div className="flex justify-center mb-2">
        <div className="relative w-48 h-24 overflow-hidden">
          <div className="absolute w-48 h-48 rounded-full border-[16px] border-gray-200 top-0 left-0"></div>
          <div 
            className="absolute w-48 h-48 rounded-full border-[16px] border-transparent top-0 left-0"
            style={{
              borderTopColor: couleur,
              borderRightColor: score > 50 ? couleur : 'transparent',
              transform: `rotate(${rotation}deg)`,
              transition: 'transform 0.5s ease-out'
            }}
          ></div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center">
            <span className="text-3xl font-bold text-gray-800">{score}</span>
            <span className="text-gray-500 text-sm">/100</span>
          </div>
        </div>
      </div>
      <p className="text-center text-sm font-medium text-gray-700 mb-1">{libelle}</p>
      <p className="text-center text-xs text-gray-500">
        {score > 70 
          ? 'Limitez les travaux en plein champ entre 12h et 16h.' 
          : score > 40 
            ? 'Conditions normales, restez vigilant.' 
            : 'Conditions favorables pour les cultures.'}
      </p>
    </div>
  );
};

export default JaugeRisque;