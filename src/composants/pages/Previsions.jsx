import React, { useState, useEffect } from 'react';
import BarreLaterale from '../communs/BarreLaterale';
import EnTete from '../tableau-de-bord/EnTete';
import PiedPage from '../tableau-de-bord/PiedPage';
import Chargement from '../communs/Chargement';
import Erreur from '../communs/Erreur';
import { useMeteo } from '../../hooks/useMeteo';
import { REGIONS } from '../../utils/constantes';
import { calculerRisque, genererDonneesHistoriques, obtenirIconeMeteo } from '../../utils/helpers';

const Previsions = () => {
  const [previsionsRegions, setPrevisionsRegions] = useState({});
  const [chargement, setChargement] = useState(false);
  const [erreur, setErreur] = useState(null);
  const { chargerMeteoRegion } = useMeteo();

  useEffect(() => {
    const chargerToutesPrevisions = async () => {
      setChargement(true);
      setErreur(null);
      
      try {
        const previsions = {};
        for (const [cle, region] of Object.entries(REGIONS)) {
          try {
            const donnees = await chargerMeteoRegion(cle);
            previsions[cle] = donnees;
          } catch (e) {
            previsions[cle] = null;
          }
        }
        setPrevisionsRegions(previsions);
      } catch (err) {
        setErreur('Impossible de charger les prévisions pour toutes les régions.');
      } finally {
        setChargement(false);
      }
    };
    
    chargerToutesPrevisions();
  }, []);

  const getCouleurRisque = (score) => {
    if (score > 70) return 'text-red-600 bg-red-100';
    if (score > 50) return 'text-orange-600 bg-orange-100';
    if (score > 30) return 'text-yellow-600 bg-yellow-100';
    return 'text-green-600 bg-green-100';
  };

  if (chargement) return (
    <div className="flex h-screen">
      <BarreLaterale pageActive="previsions" />
      <div className="flex-1 flex items-center justify-center">
        <Chargement message="Chargement des prévisions..." />
      </div>
    </div>
  );

  if (erreur) return (
    <div className="flex h-screen">
      <BarreLaterale pageActive="previsions" />
      <div className="flex-1 flex items-center justify-center">
        <Erreur message={erreur} onReessayer={() => window.location.reload()} />
      </div>
    </div>
  );

  const dateMiseAJour = new Date().toLocaleDateString('fr-FR') + ' ' + 
    new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="App">
      <div className="flex h-screen overflow-hidden">
        <BarreLaterale pageActive="previsions" />
        
        <main className="flex-1 flex flex-col overflow-hidden">
          <EnTete dateMiseAJour={dateMiseAJour} />

          <div className="flex-1 p-6 overflow-y-auto">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-gray-800 font-semibold text-lg">Prévisions météo par région</h2>
                  <p className="text-gray-500 text-sm">Consultez les conditions météo actuelles pour chaque région du Sénégal</p>
                </div>
                <button className="px-4 py-2 bg-agri-green text-white rounded-lg text-sm hover:bg-agri-dark transition">
                  <i className="fas fa-sync-alt mr-2"></i>
                  Actualiser
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {Object.entries(REGIONS).map(([cle, region]) => {
                  const donnees = previsionsRegions[cle];
                  const risque = donnees ? calculerRisque(donnees.temperature, donnees.humidite) : null;
                  const icone = donnees ? obtenirIconeMeteo(donnees.condition, donnees.icone) : 'fa-cloud';

                  return (
                    <div key={cle} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-gray-800">{region.nom}</h3>
                        {donnees ? (
                          <i className={`fas ${icone} text-2xl ${donnees.temperature > 30 ? 'text-yellow-500' : 'text-blue-500'}`}></i>
                        ) : (
                          <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
                        )}
                      </div>

                      {donnees ? (
                        <>
                          <div className="flex items-end justify-between mb-2">
                            <div>
                              <span className="text-2xl font-bold">{donnees.temperature.toFixed(1)}°C</span>
                              <p className="text-xs text-gray-500">Ressenti {donnees.ressenti.toFixed(1)}°C</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-gray-600">{donnees.humidite}%</p>
                              <p className="text-xs text-gray-500">Humidité</p>
                            </div>
                          </div>

                          {risque && (
                            <div className={`px-2 py-1 rounded-md text-xs font-medium ${getCouleurRisque(risque.score)}`}>
                              <i className="fas fa-exclamation-triangle mr-1"></i>
                              {risque.libelle}
                            </div>
                          )}

                          <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
                            <span className="capitalize">{donnees.description}</span>
                            <span>Vent {(donnees.vitesseVent * 3.6).toFixed(0)} km/h</span>
                          </div>
                        </>
                      ) : (
                        <div className="text-center py-4 text-gray-400 text-sm">
                          <i className="fas fa-spinner fa-spin mr-2"></i>
                          Données non disponibles
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-start gap-3">
                  <i className="fas fa-info-circle text-blue-500 mt-0.5"></i>
                  <div>
                    <p className="text-sm text-blue-800 font-medium">Légende des risques</p>
                    <div className="flex flex-wrap gap-4 mt-2">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-red-500"></span>
                        <span className="text-xs text-gray-600">Risque élevé</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-orange-500"></span>
                        <span className="text-xs text-gray-600">Risque modéré</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                        <span className="text-xs text-gray-600">Risque faible</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-green-500"></span>
                        <span className="text-xs text-gray-600">Conditions favorables</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <PiedPage />
        </main>
      </div>
    </div>
  );
};

export default Previsions;