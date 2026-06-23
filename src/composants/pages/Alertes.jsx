import React, { useState, useEffect } from 'react';
import BarreLaterale from '../communs/BarreLaterale';
import EnTete from '../tableau-de-bord/EnTete';
import PiedPage from '../tableau-de-bord/PiedPage';
import Chargement from '../communs/Chargement';
import { useMeteo } from '../../hooks/useMeteo';
import { REGIONS } from '../../utils/constantes';
import { calculerRisque } from '../../utils/helpers';

const Alertes = () => {
  const [alertes, setAlertes] = useState([]);
  const [chargement, setChargement] = useState(false);
  const { chargerMeteoRegion } = useMeteo();

  useEffect(() => {
    const verifierAlertes = async () => {
      setChargement(true);
      const nouvellesAlertes = [];
      
      for (const [cle, region] of Object.entries(REGIONS)) {
        try {
          const donnees = await chargerMeteoRegion(cle);
          const risque = calculerRisque(donnees.temperature, donnees.humidite);
          
          if (risque.score > 60) {
            nouvellesAlertes.push({
              region: region.nom,
              cle: cle,
              score: risque.score,
              niveau: risque.score > 70 ? 'Élevé' : 'Modéré',
              couleur: risque.couleur,
              message: risque.libelle,
              temperature: donnees.temperature,
              humidite: donnees.humidite,
              date: new Date().toLocaleString('fr-FR')
            });
          }
        } catch (e) {
          console.error(`Erreur pour ${region.nom}:`, e);
        }
      }
      
      setAlertes(nouvellesAlertes);
      setChargement(false);
    };
    
    verifierAlertes();
  }, []);

  const getNiveauClasse = (niveau) => {
    if (niveau === 'Élevé') return 'bg-red-100 text-red-800 border-red-300';
    if (niveau === 'Modéré') return 'bg-orange-100 text-orange-800 border-orange-300';
    return 'bg-yellow-100 text-yellow-800 border-yellow-300';
  };

  const getIconeNiveau = (niveau) => {
    if (niveau === 'Élevé') return 'fa-exclamation-circle';
    if (niveau === 'Modéré') return 'fa-exclamation-triangle';
    return 'fa-info-circle';
  };

  const dateMiseAJour = new Date().toLocaleDateString('fr-FR') + ' ' + 
    new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });

  if (chargement) return (
    <div className="flex h-screen">
      <BarreLaterale pageActive="alertes" />
      <div className="flex-1 flex items-center justify-center">
        <Chargement message="Vérification des alertes..." />
      </div>
    </div>
  );

  return (
    <div className="App">
      <div className="flex h-screen overflow-hidden">
        <BarreLaterale pageActive="alertes" />
        
        <main className="flex-1 flex flex-col overflow-hidden">
          <EnTete dateMiseAJour={dateMiseAJour} />

          <div className="flex-1 p-6 overflow-y-auto">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-gray-800 font-semibold text-lg flex items-center gap-2">
                    <i className="fas fa-bell text-agri-green"></i>
                    Alertes climatiques
                  </h2>
                  <p className="text-gray-500 text-sm">Surveillez les conditions météo critiques dans les régions du Sénégal</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    alertes.length > 0 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                  }`}>
                    {alertes.length > 0 ? `${alertes.length} alerte(s)` : 'Aucune alerte'}
                  </span>
                  <button className="px-4 py-2 bg-agri-green text-white rounded-lg text-sm hover:bg-agri-dark transition">
                    <i className="fas fa-sync-alt mr-2"></i>
                    Actualiser
                  </button>
                </div>
              </div>

              {alertes.length > 0 ? (
                <div className="space-y-4">
                  {alertes.map((alerte, index) => (
                    <div 
                      key={index} 
                      className={`border rounded-lg p-4 ${getNiveauClasse(alerte.niveau)}`}
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <i className={`fas ${getIconeNiveau(alerte.niveau)} text-xl`}></i>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold">{alerte.region}</h3>
                            <span className="text-sm font-medium px-2 py-0.5 bg-white/50 rounded">
                              Score: {alerte.score}/100
                            </span>
                          </div>
                          <p className="text-sm mt-1">{alerte.message}</p>
                          <div className="flex flex-wrap gap-4 mt-2 text-sm">
                            <span>
                              <i className="fas fa-thermometer-half mr-1"></i>
                              {alerte.temperature.toFixed(1)}°C
                            </span>
                            <span>
                              <i className="fas fa-tint mr-1"></i>
                              {alerte.humidite}%
                            </span>
                            <span className="text-xs text-gray-600">
                              <i className="far fa-clock mr-1"></i>
                              {alerte.date}
                            </span>
                          </div>
                        </div>
                        <button className="flex-shrink-0 text-gray-500 hover:text-gray-700">
                          <i className="fas fa-times"></i>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-check-circle text-3xl text-green-600"></i>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Aucune alerte en cours</h3>
                  <p className="text-gray-500 text-sm">
                    Toutes les régions du Sénégal bénéficient actuellement de conditions météo favorables.
                  </p>
                </div>
              )}

              {/* Historique des alertes */}
              <div className="mt-6 border-t border-gray-200 pt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Historique des alertes</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-gray-500 p-2 bg-gray-50 rounded">
                    <span>Dakar - Risque Canicule Modéré</span>
                    <span>Il y a 2 jours</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500 p-2 bg-gray-50 rounded">
                    <span>Matam - Chaleur Importante</span>
                    <span>Il y a 3 jours</span>
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

export default Alertes;