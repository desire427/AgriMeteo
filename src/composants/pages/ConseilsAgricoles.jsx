import React, { useState, useEffect } from 'react';
import BarreLaterale from '../communs/BarreLaterale';
import EnTete from '../tableau-de-bord/EnTete';
import PiedPage from '../tableau-de-bord/PiedPage';
import { useMeteo } from '../../hooks/useMeteo';
import { REGIONS } from '../../utils/constantes';
import { calculerRisque, obtenirConseilAgricole } from '../../utils/helpers';

const ConseilsAgricoles = () => {
  const [conseils, setConseils] = useState([]);
  const [regionSelectionnee, setRegionSelectionnee] = useState('dakar');
  const { donneesMeteo, chargement, chargerMeteoRegion } = useMeteo('dakar');

  useEffect(() => {
    chargerMeteoRegion(regionSelectionnee);
  }, [regionSelectionnee]);

  useEffect(() => {
    const genererConseils = async () => {
      const conseilsListe = [];
      
      for (const [cle, region] of Object.entries(REGIONS)) {
        try {
          const donnees = await chargerMeteoRegion(cle);
          const risque = calculerRisque(donnees.temperature, donnees.humidite);
          const conseil = obtenirConseilAgricole(risque.score);
          
          conseilsListe.push({
            region: region.nom,
            cle: cle,
            temperature: donnees.temperature,
            humidite: donnees.humidite,
            risque: risque,
            conseil: conseil
          });
        } catch (e) {
          console.error(`Erreur pour ${region.nom}:`, e);
        }
      }
      
      setConseils(conseilsListe);
    };
    
    genererConseils();
  }, []);

  const conseilActuel = conseils.find(c => c.cle === regionSelectionnee);

  const getCouleurConseil = (score) => {
    if (score > 70) return 'border-red-500 bg-red-50';
    if (score > 50) return 'border-orange-500 bg-orange-50';
    if (score > 30) return 'border-yellow-500 bg-yellow-50';
    return 'border-green-500 bg-green-50';
  };

  const getIconeConseil = (score) => {
    if (score > 70) return 'fa-exclamation-triangle text-red-500';
    if (score > 50) return 'fa-exclamation-circle text-orange-500';
    if (score > 30) return 'fa-info-circle text-yellow-500';
    return 'fa-check-circle text-green-500';
  };

  const dateMiseAJour = new Date().toLocaleDateString('fr-FR') + ' ' + 
    new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="App">
      <div className="flex h-screen overflow-hidden">
        <BarreLaterale pageActive="conseils" />
        
        <main className="flex-1 flex flex-col overflow-hidden">
          <EnTete dateMiseAJour={dateMiseAJour} />

          <div className="flex-1 p-6 overflow-y-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Liste des régions */}
              <div className="bg-white rounded-xl shadow-sm p-6 lg:col-span-1">
                <h3 className="font-semibold text-gray-800 mb-4">Régions</h3>
                <div className="space-y-2">
                  {conseils.map((c) => (
                    <button
                      key={c.cle}
                      onClick={() => setRegionSelectionnee(c.cle)}
                      className={`w-full text-left p-3 rounded-lg transition ${
                        regionSelectionnee === c.cle
                          ? 'bg-agri-green text-white'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{c.region}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          regionSelectionnee === c.cle
                            ? 'bg-white/20 text-white'
                            : 'bg-gray-200 text-gray-600'
                        }`}>
                          {c.risque.score}/100
                        </span>
                      </div>
                      <div className={`text-xs mt-1 ${
                        regionSelectionnee === c.cle ? 'text-white/70' : 'text-gray-500'
                      }`}>
                        {c.temperature.toFixed(1)}°C - {c.humidite}% humidité
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Détails du conseil */}
              <div className="bg-white rounded-xl shadow-sm p-6 lg:col-span-2">
                {conseilActuel ? (
                  <>
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-800">{conseilActuel.region}</h2>
                        <p className="text-gray-500 text-sm">{REGIONS[conseilActuel.cle]?.description}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-3xl font-bold">{conseilActuel.temperature.toFixed(1)}°C</span>
                        <p className="text-sm text-gray-500">Humidité: {conseilActuel.humidite}%</p>
                      </div>
                    </div>

                    <div className={`border-l-4 p-4 rounded-r-lg ${getCouleurConseil(conseilActuel.risque.score)}`}>
                      <div className="flex items-center gap-3">
                        <i className={`fas ${getIconeConseil(conseilActuel.risque.score)} text-xl`}></i>
                        <div>
                          <h4 className="font-semibold">{conseilActuel.risque.libelle}</h4>
                          <p className="text-sm text-gray-700 mt-1">{conseilActuel.conseil}</p>
                        </div>
                      </div>
                    </div>

                    {/* Conseils supplémentaires */}
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                        <h5 className="font-medium text-blue-800 mb-2">
                          <i className="fas fa-tint mr-2"></i>
                          Gestion de l'eau
                        </h5>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Irriguer le matin ou en soirée</li>
                          <li>• Vérifier l'humidité du sol</li>
                          <li>• Éviter le gaspillage d'eau</li>
                        </ul>
                      </div>
                      <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                        <h5 className="font-medium text-green-800 mb-2">
                          <i className="fas fa-seedling mr-2"></i>
                          Protection des cultures
                        </h5>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Surveiller les parasites</li>
                          <li>• Protéger du soleil direct</li>
                          <li>• Rotation des cultures</li>
                        </ul>
                      </div>
                    </div>

                    {/* Prévisions pour les prochains jours */}
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <h5 className="font-medium text-gray-800 mb-3">
                        <i className="fas fa-calendar-alt mr-2"></i>
                        Prévisions des prochains jours
                      </h5>
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div className="p-2 bg-white rounded">
                          <p className="text-xs text-gray-500">J+1</p>
                          <span className="font-bold">32°C</span>
                        </div>
                        <div className="p-2 bg-white rounded">
                          <p className="text-xs text-gray-500">J+2</p>
                          <span className="font-bold">33°C</span>
                        </div>
                        <div className="p-2 bg-white rounded">
                          <p className="text-xs text-gray-500">J+3</p>
                          <span className="font-bold">31°C</span>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex items-center justify-center h-64">
                    <div className="text-center">
                      <i className="fas fa-spinner fa-spin text-3xl text-gray-400 mb-3"></i>
                      <p className="text-gray-500">Chargement des conseils...</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <PiedPage />
        </main>
      </div>
    </div>
  );
};

export default ConseilsAgricoles;