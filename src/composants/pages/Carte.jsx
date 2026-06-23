import React, { useState } from 'react';
import BarreLaterale from '../communs/BarreLaterale';
import EnTete from '../tableau-de-bord/EnTete';
import PiedPage from '../tableau-de-bord/PiedPage';
import CarteSenegal from '../carte/CarteSenegal';
import PanneauMeteo from '../meteo/PanneauMeteo';
import { useMeteo } from '../../hooks/useMeteo';
import { useRegions } from '../../hooks/useRegions';

const Carte = () => {
  const [panneauVisible, setPanneauVisible] = useState(true);
  const { 
    regionSelectionnee, 
    donneesMeteo, 
    chargement, 
    erreur, 
    chargerMeteoRegion,
    setRegionSelectionnee 
  } = useMeteo('dakar');
  
  const { temperaturesRegions, obtenirCouleurRegion } = useRegions(regionSelectionnee);

  const handleRegionClick = (cleRegion) => {
    setRegionSelectionnee(cleRegion);
    chargerMeteoRegion(cleRegion);
    setPanneauVisible(true);
  };

  const handleFermerPanneau = () => {
    setPanneauVisible(false);
  };

  const dateMiseAJour = new Date().toLocaleDateString('fr-FR') + ' ' + 
    new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="App">
      <div className="flex h-screen overflow-hidden">
        <BarreLaterale pageActive="carte" />
        
        <main className="flex-1 flex flex-col overflow-hidden">
          <EnTete dateMiseAJour={dateMiseAJour} />

          <div className="flex-1 flex overflow-hidden">
            <div className="flex-1 p-6 overflow-y-auto">
              <div className="bg-white rounded-xl shadow-sm p-6 h-full">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <h2 className="text-gray-800 font-semibold text-lg">Carte interactive du Sénégal</h2>
                    <i className="fas fa-info-circle text-gray-400 text-sm cursor-help"></i>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="px-3 py-1.5 text-sm bg-agri-light text-agri-dark rounded-lg hover:bg-agri-green hover:text-white transition">
                      <i className="fas fa-layer-group mr-1"></i>
                      Légende
                    </button>
                    <button className="px-3 py-1.5 text-sm bg-agri-light text-agri-dark rounded-lg hover:bg-agri-green hover:text-white transition">
                      <i className="fas fa-download mr-1"></i>
                      Exporter
                    </button>
                  </div>
                </div>

                <CarteSenegal
                  regions={{}}
                  temperatures={temperaturesRegions}
                  regionSelectionnee={regionSelectionnee}
                  onRegionClick={handleRegionClick}
                  obtenirCouleurRegion={obtenirCouleurRegion}
                />
              </div>
            </div>

            {panneauVisible && (
              <PanneauMeteo
                regionKey={regionSelectionnee}
                donneesMeteo={donneesMeteo}
                chargement={chargement}
                erreur={erreur}
                onReessayer={() => chargerMeteoRegion(regionSelectionnee)}
                onFermer={handleFermerPanneau}
              />
            )}
          </div>

          <PiedPage />
        </main>
      </div>
    </div>
  );
};

export default Carte;