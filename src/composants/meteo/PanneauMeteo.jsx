import React from 'react';
import { REGIONS } from '../../utils/constantes';
import { calculerRisque, genererDonneesHistoriques, obtenirIconeMeteo, obtenirCouleurIcone, obtenirDirectionVent, obtenirConseilAgricole } from '../../utils/helpers';
import JaugeRisque from './JaugeRisque';
import Graphique7Jours from './Graphique7Jours';
import Chargement from '../communs/Chargement';
import Erreur from '../communs/Erreur';

const PanneauMeteo = ({ regionKey, donneesMeteo, chargement, erreur, onReessayer, onFermer }) => {
  const region = REGIONS[regionKey];
  
  if (!region) return null;

  const risque = donneesMeteo ? calculerRisque(donneesMeteo.temperature, donneesMeteo.humidite) : null;
  const historique = donneesMeteo ? genererDonneesHistoriques(donneesMeteo.temperature, donneesMeteo.humidite) : null;
  const iconeMeteo = obtenirIconeMeteo(donneesMeteo?.condition, donneesMeteo?.icone);
  const couleurIcone = obtenirCouleurIcone(donneesMeteo?.icone);
  const directionVent = obtenirDirectionVent(donneesMeteo?.directionVent);
  const conseilAgricole = obtenirConseilAgricole(risque?.score || 0);

  return (
    <div className="w-96 bg-white border-l border-gray-200 overflow-y-auto flex-shrink-0">
      <div className="p-6 relative">
        <button 
          onClick={onFermer}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600"
        >
          <i className="fas fa-times"></i>
        </button>

        {chargement && <Chargement />}
        
        {erreur && !chargement && (
          <Erreur message={erreur} onReessayer={onReessayer} />
        )}
        
        {!chargement && !erreur && donneesMeteo && (
          <>
            <div className="mb-6">
              <p className="text-gray-500 text-sm mb-1">Région sélectionnée</p>
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-agri-dark">{region.nom}</h2>
                  <p className="text-gray-500 text-sm">{region.description}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2">
                    <i className={`fas ${iconeMeteo} ${couleurIcone} text-3xl`}></i>
                    <span className="text-4xl font-bold text-gray-800">
                      {donneesMeteo.temperature.toFixed(1)}°C
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm">
                    Ressenti {donneesMeteo.ressenti.toFixed(1)}°C
                  </p>
                  <p className="text-gray-400 text-xs capitalize">{donneesMeteo.description}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="border border-gray-200 rounded-lg p-3 text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <i className="fas fa-thermometer-half text-red-500"></i>
                  <span className="text-xs text-gray-500">Température</span>
                </div>
                <span className="text-lg font-bold text-gray-800">
                  {donneesMeteo.temperature.toFixed(1)}°C
                </span>
              </div>
              <div className="border border-gray-200 rounded-lg p-3 text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <i className="fas fa-tint text-blue-500"></i>
                  <span className="text-xs text-gray-500">Humidité</span>
                </div>
                <span className="text-lg font-bold text-gray-800">{donneesMeteo.humidite}%</span>
              </div>
              <div className="border border-gray-200 rounded-lg p-3 text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <i className="fas fa-wind text-teal-500"></i>
                  <span className="text-xs text-gray-500">Vent</span>
                </div>
                <span className="text-lg font-bold text-gray-800">
                  {(donneesMeteo.vitesseVent * 3.6).toFixed(0)} km/h
                </span>
                <p className="text-[10px] text-gray-500">{directionVent}</p>
              </div>
            </div>

            {risque && (
              <JaugeRisque 
                score={risque.score} 
                libelle={risque.libelle} 
                couleur={risque.couleur} 
              />
            )}

            {historique && (
              <Graphique7Jours 
                donneesHistoriques={historique.jours} 
                dates={historique.dates} 
              />
            )}

            <div className="bg-agri-light rounded-lg p-4 border border-green-200">
              <div className="flex items-start gap-3">
                <div>
                  <h4 className="font-semibold text-agri-dark mb-1">Conseil agricole</h4>
                  <p className="text-sm text-gray-700 leading-relaxed">{conseilAgricole}</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PanneauMeteo;