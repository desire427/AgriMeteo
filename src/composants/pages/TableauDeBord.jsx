import React, { useState, useEffect } from 'react';
import BarreLaterale from '../communs/BarreLaterale';
import EnTete from '../tableau-de-bord/EnTete';
import Statistiques from '../tableau-de-bord/Statistiques';
import CarteSenegal from '../carte/CarteSenegal';
import PanneauMeteo from '../meteo/PanneauMeteo';
import { useMeteo } from '../../hooks/useMeteo';
import { useRegions } from '../../hooks/useRegions';
import { useGeolocalisation } from '../../hooks/useGeolocalisation';
import { trouverRegionLaPlusProche } from '../../services/serviceRegion';

const TableauDeBord = () => {
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
  const { position } = useGeolocalisation();

  // Charger la région par défaut
  useEffect(() => {
    chargerMeteoRegion('dakar');
  }, []);

  // Géolocalisation
  useEffect(() => {
    if (position) {
      const { latitude, longitude } = position;
      if (latitude >= 12 && latitude <= 17.5 && longitude >= -17.5 && longitude <= -11) {
        const regionProche = trouverRegionLaPlusProche(latitude, longitude);
        setRegionSelectionnee(regionProche);
        chargerMeteoRegion(regionProche);
      }
    }
  }, [position]);

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
        <BarreLaterale pageActive="tableau-de-bord" />
        
        <main className="flex-1 flex flex-col overflow-hidden">
          <EnTete dateMiseAJour={dateMiseAJour} />

          <div className="flex-1 flex overflow-hidden">
            <div className="flex-1 p-6 overflow-y-auto">
              <div className="bg-white rounded-xl shadow-sm p-6 h-full">
                <div className="flex items-center gap-2 mb-4">
                  <h2 className="text-gray-800 font-semibold text-lg">Carte des régions du Sénégal</h2>
                  <i className="fas fa-info-circle text-gray-400 text-sm cursor-help"></i>
                </div>

                <CarteSenegal
                  regions={{}} // Les régions sont déjà dans les constantes
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

          <Statistiques donneesMeteo={donneesMeteo} />
        </main>
      </div>
    </div>
  );
};

export default TableauDeBord;