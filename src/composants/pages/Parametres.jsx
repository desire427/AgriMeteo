import React, { useState } from 'react';
import BarreLaterale from '../communs/BarreLaterale';
import EnTete from '../tableau-de-bord/EnTete';
import PiedPage from '../tableau-de-bord/PiedPage';

const Parametres = () => {
  const [parametres, setParametres] = useState({
    notifications: true,
    geolocalisation: true,
    langue: 'fr',
    uniteTemperature: 'celsius',
    alertes: {
      canicule: true,
      pluie: true,
      vent: false
    }
  });

  const handleToggle = (cle) => {
    setParametres(prev => ({
      ...prev,
      [cle]: !prev[cle]
    }));
  };

  const handleAlertToggle = (cle) => {
    setParametres(prev => ({
      ...prev,
      alertes: {
        ...prev.alertes,
        [cle]: !prev.alertes[cle]
      }
    }));
  };

  const handleLangueChange = (e) => {
    setParametres(prev => ({
      ...prev,
      langue: e.target.value
    }));
  };

  const handleUniteChange = (e) => {
    setParametres(prev => ({
      ...prev,
      uniteTemperature: e.target.value
    }));
  };

  const dateMiseAJour = new Date().toLocaleDateString('fr-FR') + ' ' + 
    new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="App">
      <div className="flex h-screen overflow-hidden">
        <BarreLaterale pageActive="parametres" />
        
        <main className="flex-1 flex flex-col overflow-hidden">
          <EnTete dateMiseAJour={dateMiseAJour} />

          <div className="flex-1 p-6 overflow-y-auto">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-gray-800 font-semibold text-lg">Paramètres</h2>
                    <p className="text-gray-500 text-sm">Personnalisez votre expérience sur AgriMétéo Sénégal</p>
                  </div>
                  <button className="px-4 py-2 bg-agri-green text-white rounded-lg text-sm hover:bg-agri-dark transition">
                    <i className="fas fa-save mr-2"></i>
                    Enregistrer
                  </button>
                </div>

                {/* Notifications */}
                <div className="mb-6 pb-6 border-b border-gray-200">
                  <h3 className="font-medium text-gray-800 mb-4">Notifications</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Activer les notifications</p>
                      <p className="text-sm text-gray-500">Recevez des alertes en temps réel</p>
                    </div>
                    <button
                      onClick={() => handleToggle('notifications')}
                      className={`w-12 h-6 rounded-full transition ${
                        parametres.notifications ? 'bg-agri-green' : 'bg-gray-300'
                      }`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full shadow transform transition ${
                        parametres.notifications ? 'translate-x-6' : 'translate-x-0.5'
                      }`}></div>
                    </button>
                  </div>
                </div>

                {/* Géolocalisation */}
                <div className="mb-6 pb-6 border-b border-gray-200">
                  <h3 className="font-medium text-gray-800 mb-4">Géolocalisation</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Utiliser ma position</p>
                      <p className="text-sm text-gray-500">Détecter automatiquement votre région</p>
                    </div>
                    <button
                      onClick={() => handleToggle('geolocalisation')}
                      className={`w-12 h-6 rounded-full transition ${
                        parametres.geolocalisation ? 'bg-agri-green' : 'bg-gray-300'
                      }`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full shadow transform transition ${
                        parametres.geolocalisation ? 'translate-x-6' : 'translate-x-0.5'
                      }`}></div>
                    </button>
                  </div>
                </div>

                {/* Langue */}
                <div className="mb-6 pb-6 border-b border-gray-200">
                  <h3 className="font-medium text-gray-800 mb-4">Langue</h3>
                  <select
                    value={parametres.langue}
                    onChange={handleLangueChange}
                    className="w-48 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-agri-green"
                  >
                    <option value="fr">Français</option>
                    <option value="en">English</option>
                    <option value="wo">Wolof</option>
                    <option value="ar">العربية</option>
                  </select>
                </div>

                {/* Unités */}
                <div className="mb-6 pb-6 border-b border-gray-200">
                  <h3 className="font-medium text-gray-800 mb-4">Unités</h3>
                  <select
                    value={parametres.uniteTemperature}
                    onChange={handleUniteChange}
                    className="w-48 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-agri-green"
                  >
                    <option value="celsius">Celsius (°C)</option>
                    <option value="fahrenheit">Fahrenheit (°F)</option>
                  </select>
                </div>

                {/* Alertes personnalisées */}
                <div className="mb-6">
                  <h3 className="font-medium text-gray-800 mb-4">Alertes personnalisées</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-700">Alerte canicule</p>
                        <p className="text-sm text-gray-500">Température {">"} 38°C</p>
                      </div>
                      <button
                        onClick={() => handleAlertToggle('canicule')}
                        className={`w-12 h-6 rounded-full transition ${
                          parametres.alertes.canicule ? 'bg-agri-green' : 'bg-gray-300'
                        }`}
                      >
                        <div className={`w-5 h-5 bg-white rounded-full shadow transform transition ${
                          parametres.alertes.canicule ? 'translate-x-6' : 'translate-x-0.5'
                        }`}></div>
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-700">Alerte pluie</p>
                        <p className="text-sm text-gray-500">Précipitations importantes</p>
                      </div>
                      <button
                        onClick={() => handleAlertToggle('pluie')}
                        className={`w-12 h-6 rounded-full transition ${
                          parametres.alertes.pluie ? 'bg-agri-green' : 'bg-gray-300'
                        }`}
                      >
                        <div className={`w-5 h-5 bg-white rounded-full shadow transform transition ${
                          parametres.alertes.pluie ? 'translate-x-6' : 'translate-x-0.5'
                        }`}></div>
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-700">Alerte vent</p>
                        <p className="text-sm text-gray-500">Vent {">"} 50 km/h</p>
                      </div>
                      <button
                        onClick={() => handleAlertToggle('vent')}
                        className={`w-12 h-6 rounded-full transition ${
                          parametres.alertes.vent ? 'bg-agri-green' : 'bg-gray-300'
                        }`}
                      >
                        <div className={`w-5 h-5 bg-white rounded-full shadow transform transition ${
                          parametres.alertes.vent ? 'translate-x-6' : 'translate-x-0.5'
                        }`}></div>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Bouton de réinitialisation */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <button className="px-4 py-2 text-red-600 border border-red-300 rounded-lg text-sm hover:bg-red-50 transition">
                    <i className="fas fa-undo mr-2"></i>
                    Réinitialiser les paramètres
                  </button>
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

export default Parametres;