import React from 'react';
import { REGIONS } from '../../utils/constantes';
import { obtenirIconeMeteo, obtenirCouleurIcone } from '../../utils/helpers';

const CarteMeteo = ({ donneesMeteo, regionKey }) => {
  const region = REGIONS[regionKey];
  if (!region || !donneesMeteo) return null;

  const icone = obtenirIconeMeteo(donneesMeteo.condition, donneesMeteo.icone);
  const couleurIcone = obtenirCouleurIcone(donneesMeteo.icone);

  return (
    <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <i className={`fas ${icone} ${couleurIcone} text-4xl`}></i>
            <div>
              <h3 className="text-xl font-bold text-gray-800">
                {donneesMeteo.temperature.toFixed(1)}°C
              </h3>
              <p className="text-sm text-gray-600 capitalize">{donneesMeteo.description}</p>
            </div>
          </div>
          <div className="mt-2 flex items-center gap-4 text-sm text-gray-600">
            <span><i className="fas fa-tint mr-1"></i> {donneesMeteo.humidite}%</span>
            <span><i className="fas fa-wind mr-1"></i> {(donneesMeteo.vitesseVent * 3.6).toFixed(0)} km/h</span>
            <span><i className="fas fa-thermometer-half mr-1"></i> Ressenti {donneesMeteo.ressenti.toFixed(1)}°C</span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm font-medium text-gray-700">{region.nom}</div>
          <div className="text-xs text-gray-500">{region.description}</div>
          <div className="mt-1 px-2 py-0.5 bg-white/60 rounded-full text-xs text-gray-600">
            {new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarteMeteo;