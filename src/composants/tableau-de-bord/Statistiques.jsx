import React from 'react';
import { calculerRisque } from '../../utils/helpers';

const Statistiques = ({ donneesMeteo }) => {
  const risque = donneesMeteo ? calculerRisque(donneesMeteo.temperature, donneesMeteo.humidite) : null;
  const alerteActive = risque && risque.score > 70;

  return (
    <div className="bg-agri-dark text-white px-6 py-4 flex-shrink-0">
      <div className="grid grid-cols-4 gap-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center">
            <i className="fas fa-sun text-yellow-400 text-lg"></i>
          </div>
          <div>
            <p className="text-xs text-gray-400">Alerte en cours</p>
            <p className="font-semibold">{alerteActive ? '1 alerte' : '0 alerte'}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
            <i className="fas fa-cloud-rain text-blue-400 text-lg"></i>
          </div>
          <div>
            <p className="text-xs text-gray-400">Saison des pluies</p>
            <p className="font-semibold">Juil. - Oct.</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div>
            <p className="text-xs text-gray-400">Culture principale</p>
            <p className="font-semibold">Mil, Maïs, Arachide</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
            <i className="fas fa-users text-purple-400 text-lg"></i>
          </div>
          <div>
            <p className="text-xs text-gray-400">Utilisateurs</p>
            <p className="font-semibold">2,541 agriculteurs</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistiques;