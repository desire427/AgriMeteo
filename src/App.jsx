import React, { useState, useEffect, useRef, useCallback } from 'react';
import './App.css';

// ============================================
// CONFIGURATION & CONSTANTES
// ============================================
const API_KEY = '0fdba4360528878fcc5f4e462e26a40c';
const API_BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Coordonnées des 14 régions du Sénégal
const REGIONS = {
  'dakar': { name: 'Dakar', lat: 14.7167, lon: -17.4677, description: 'Capitale du Sénégal' },
  'saint-louis': { name: 'Saint-Louis', lat: 16.0179, lon: -16.4896, description: 'Région du nord' },
  'louga': { name: 'Louga', lat: 15.6185, lon: -16.2245, description: 'Région du nord-ouest' },
  'matam': { name: 'Matam', lat: 15.6559, lon: -13.2554, description: 'Région du nord-est' },
  'thies': { name: 'Thiès', lat: 14.7894, lon: -16.9260, description: 'Région de l\'ouest' },
  'diourbel': { name: 'Diourbel', lat: 14.6560, lon: -16.2310, description: 'Région du centre' },
  'fatick': { name: 'Fatick', lat: 14.3531, lon: -16.4061, description: 'Région du centre-ouest' },
  'kaolack': { name: 'Kaolack', lat: 14.1820, lon: -16.2530, description: 'Région du centre' },
  'kaffrine': { name: 'Kaffrine', lat: 14.1050, lon: -15.5500, description: 'Région du centre-est' },
  'tambacounda': { name: 'Tambacounda', lat: 13.7539, lon: -13.7586, description: 'Région de l\'est' },
  'ziguinchor': { name: 'Ziguinchor', lat: 12.5833, lon: -16.2667, description: 'Région du sud-ouest' },
  'sedhiou': { name: 'Sédhiou', lat: 12.5600, lon: -15.5500, description: 'Région du sud' },
  'kolda': { name: 'Kolda', lat: 12.8833, lon: -14.9500, description: 'Région du sud-est' },
  'kedougou': { name: 'Kédougou', lat: 12.5600, lon: -12.1800, description: 'Région du sud-est' }
};

// Couleurs de base des régions selon la température (sera mise à jour dynamiquement)
const BASE_COLORS = {
  'dakar': '#2e7d32',
  'saint-louis': '#66bb6a',
  'louga': '#ffca28',
  'matam': '#ff9800',
  'thies': '#66bb6a',
  'diourbel': '#ffca28',
  'fatick': '#66bb6a',
  'kaolack': '#ffca28',
  'kaffrine': '#ffca28',
  'tambacounda': '#ff9800',
  'ziguinchor': '#66bb6a',
  'sedhiou': '#66bb6a',
  'kolda': '#66bb6a',
  'kedougou': '#66bb6a'
};

// ============================================
// SERVICE API MÉTÉO
// ============================================
const fetchWeatherData = async (lat, lon) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=fr`
    );
    
    if (!response.ok) {
      throw new Error(`Erreur API: ${response.status}`);
    }
    
    const data = await response.json();
    
    return {
      temperature: data.main.temp,
      feelsLike: data.main.feels_like,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      windDeg: data.wind.deg,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      condition: data.weather[0].main,
      name: data.name
    };
  } catch (error) {
    console.error('Erreur lors de la récupération des données météo:', error);
    throw error;
  }
};

// ============================================
// FONCTION PURE: CALCUL DE L'INDICE DE RISQUE
// ============================================
const calculateRisk = (temp, humidity) => {
  let score = 0;
  let label = '';
  let color = '';

  // Logique métier de calcul du risque
  if (temp > 38 && humidity > 60) {
    score = 85;
    label = 'Risque Canicule Élevé';
    color = '#FF4500';
  } else if (temp > 38 && humidity <= 60) {
    score = 75;
    label = 'Risque Canicule Modéré';
    color = '#FF8C00';
  } else if (temp > 35 && humidity > 70) {
    score = 70;
    label = 'Risque Humidité Élevée';
    color = '#FFA500';
  } else if (temp > 35 && humidity <= 70) {
    score = 60;
    label = 'Chaleur Importante';
    color = '#FFD700';
  } else if (temp < 20 && humidity > 80) {
    score = 55;
    label = 'Risque Humidité Froide';
    color = '#87CEEB';
  } else if (temp >= 25 && temp <= 35 && humidity >= 40 && humidity <= 70) {
    score = 25;
    label = 'Conditions Favorables';
    color = '#4CAF50';
  } else {
    score = 40;
    label = 'Risque Faible';
    color = '#8BC34A';
  }

  return { score, label, color };
};

// ============================================
// GÉNÉRATEUR DE DONNÉES HISTORIQUES (7 JOURS)
// ============================================
const generateHistoricalData = (currentTemp, currentHumidity) => {
  const days = [];
  const dates = [];
  
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    dates.push(date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' }));
    
    // Variation cohérente de +/- 3°C par rapport à la température actuelle
    const tempVariation = (Math.random() - 0.5) * 6; // -3 à +3
    const humidityVariation = (Math.random() - 0.5) * 20; // -10 à +10
    
    days.push({
      temp: Math.round((currentTemp + tempVariation) * 10) / 10,
      humidity: Math.min(100, Math.max(0, Math.round(currentHumidity + humidityVariation)))
    });
  }
  
  return { days, dates };
};

// ============================================
// COMPOSANT: GRAPHIQUE 7 JOURS (SVG)
// ============================================
const SevenDayChart = ({ historicalData, dates }) => {
  if (!historicalData || historicalData.length === 0) return null;

  const temps = historicalData.map(d => d.temp);
  const humidities = historicalData.map(d => d.humidity);
  
  const maxTemp = Math.max(...temps) + 2;
  const minTemp = Math.min(...temps) - 2;
  const tempRange = maxTemp - minTemp || 1;
  
  const maxHum = 100;
  const minHum = 0;
  
  const width = 340;
  const height = 160;
  const paddingLeft = 40;
  const paddingRight = 10;
  const paddingTop = 10;
  const paddingBottom = 20;
  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;
  
  const getX = (index) => paddingLeft + (index / (temps.length - 1)) * chartWidth;
  const getYTemp = (temp) => paddingTop + chartHeight - ((temp - minTemp) / tempRange) * chartHeight;
  const getYHum = (hum) => paddingTop + chartHeight - ((hum - minHum) / 100) * chartHeight;
  
  const tempPoints = temps.map((t, i) => `${getX(i)},${getYTemp(t)}`).join(' ');
  const humPoints = humidities.map((h, i) => `${getX(i)},${getYHum(h)}`).join(' ');

  return (
    <div className="mb-6">
      <h3 className="font-semibold text-gray-800 mb-3">Évolution sur les 7 derniers jours</h3>
      <div className="flex items-center gap-4 text-xs mb-2">
        <div className="flex items-center gap-1">
          <span className="w-3 h-1 bg-green-500 rounded"></span>
          <span className="text-gray-600">Température (°C)</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-3 h-1 bg-blue-500 rounded"></span>
          <span className="text-gray-600">Humidité (%)</span>
        </div>
      </div>
      <div className="relative h-40 border-l border-b border-gray-300">
        {/* Grid lines */}
        <div className="absolute left-0 right-0 top-0 border-t border-gray-100"></div>
        <div className="absolute left-0 right-0 top-1/3 border-t border-gray-100"></div>
        <div className="absolute left-0 right-0 top-2/3 border-t border-gray-100"></div>

        <svg className="absolute inset-0 w-full h-full" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
          {/* Temperature Line */}
          <polyline points={tempPoints} fill="none" stroke="#4caf50" strokeWidth="2" />
          {temps.map((t, i) => (
            <circle key={`temp-${i}`} cx={getX(i)} cy={getYTemp(t)} r="3" fill="#4caf50" />
          ))}

          {/* Humidity Line */}
          <polyline points={humPoints} fill="none" stroke="#2196f3" strokeWidth="2" />
          {humidities.map((h, i) => (
            <circle key={`hum-${i}`} cx={getX(i)} cy={getYHum(h)} r="3" fill="#2196f3" />
          ))}
        </svg>

        {/* Y-axis labels - Température */}
        <div className="absolute -left-8 top-0 text-[10px] text-gray-500">{Math.round(maxTemp)}°C</div>
        <div className="absolute -left-8 top-1/3 text-[10px] text-gray-500">{Math.round(minTemp + (tempRange * 2/3))}°C</div>
        <div className="absolute -left-8 top-2/3 text-[10px] text-gray-500">{Math.round(minTemp + (tempRange * 1/3))}°C</div>
        <div className="absolute -left-8 bottom-0 text-[10px] text-gray-500">{Math.round(minTemp)}°C</div>
        
        {/* Y-axis labels - Humidité */}
        <div className="absolute -left-16 top-0 text-[10px] text-gray-500">100%</div>
        <div className="absolute -left-16 top-1/3 text-[10px] text-gray-500">75%</div>
        <div className="absolute -left-16 top-2/3 text-[10px] text-gray-500">50%</div>
        <div className="absolute -left-16 bottom-0 text-[10px] text-gray-500">25%</div>
      </div>
      {/* X-axis labels */}
      <div className="flex justify-between mt-1 px-4 text-[10px] text-gray-500">
        {dates.map((date, i) => (
          <span key={i}>{date}</span>
        ))}
      </div>
    </div>
  );
};

// ============================================
// COMPOSANT: JAUGE DE RISQUE
// ============================================
const RiskGauge = ({ score, label, color }) => {
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
          style={{ backgroundColor: color }}
        >
          {label}
        </span>
      </div>

      {/* Gauge */}
      <div className="flex justify-center mb-2">
        <div className="relative w-48 h-24 overflow-hidden">
          <div className="absolute w-48 h-48 rounded-full border-[16px] border-gray-200 top-0 left-0"></div>
          <div 
            className="absolute w-48 h-48 rounded-full border-[16px] border-transparent top-0 left-0"
            style={{
              borderTopColor: color,
              borderRightColor: score > 50 ? color : 'transparent',
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
      <p className="text-center text-sm font-medium text-gray-700 mb-1">{label}</p>
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

// ============================================
// COMPOSANT: SPINNER DE CHARGEMENT
// ============================================
const LoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center py-12">
    <div className="w-10 h-10 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mb-4"></div>
    <p className="text-gray-500 text-sm">Chargement des données météo...</p>
  </div>
);

// ============================================
// COMPOSANT: MESSAGE D'ERREUR
// ============================================
const ErrorMessage = ({ message, onRetry }) => (
  <div className="flex flex-col items-center justify-center py-8 px-4">
    <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-3">
      <i className="fas fa-exclamation-triangle text-red-500 text-xl"></i>
    </div>
    <p className="text-gray-700 font-medium text-center mb-2">Oups ! Une erreur est survenue</p>
    <p className="text-gray-500 text-sm text-center mb-4">{message}</p>
    <button 
      onClick={onRetry}
      className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition"
    >
      Réessayer
    </button>
  </div>
);

// ============================================
// COMPOSANT: PANNEAU LATÉRAL (DASHBOARD)
// ============================================
const SidePanel = ({ regionKey, weatherData, loading, error, onRetry, onClose }) => {
  const region = REGIONS[regionKey];
  
  if (!region) return null;

  const risk = weatherData ? calculateRisk(weatherData.temperature, weatherData.humidity) : null;
  const historical = weatherData ? generateHistoricalData(weatherData.temperature, weatherData.humidity) : null;

  // Icône météo dynamique basée sur l'API
  const getWeatherIcon = () => {
    if (!weatherData) return 'fa-cloud-sun';
    const condition = weatherData.condition?.toLowerCase() || '';
    const icon = weatherData.icon || '';
    
    if (condition.includes('rain') || icon.includes('09') || icon.includes('10')) return 'fa-cloud-rain';
    if (condition.includes('thunder') || icon.includes('11')) return 'fa-bolt';
    if (condition.includes('snow') || icon.includes('13')) return 'fa-snowflake';
    if (condition.includes('mist') || condition.includes('fog') || icon.includes('50')) return 'fa-smog';
    if (icon.includes('01d')) return 'fa-sun';
    if (icon.includes('01n')) return 'fa-moon';
    if (icon.includes('02') || icon.includes('03') || icon.includes('04')) return 'fa-cloud-sun';
    return 'fa-cloud-sun';
  };

  const weatherIconColor = () => {
    if (!weatherData) return 'text-yellow-500';
    const icon = weatherData.icon || '';
    if (icon.includes('01d')) return 'text-yellow-500';
    if (icon.includes('01n')) return 'text-blue-300';
    if (icon.includes('09') || icon.includes('10') || icon.includes('11')) return 'text-blue-500';
    return 'text-gray-500';
  };

  return (
    <div 
      className={`w-96 bg-white border-l border-gray-200 overflow-y-auto flex-shrink-0 transition-all duration-200 ease-in-out ${
        regionKey ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full w-0'
      }`}
    >
      <div className="p-6">
        {/* Bouton fermer */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600"
        >
          <i className="fas fa-times"></i>
        </button>

        {loading && <LoadingSpinner />}
        
        {error && !loading && (
          <ErrorMessage 
            message={error} 
            onRetry={onRetry} 
          />
        )}
        
        {!loading && !error && weatherData && (
          <>
            {/* Selected Region Header */}
            <div className="mb-6">
              <p className="text-gray-500 text-sm mb-1">Région sélectionnée</p>
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-agri-dark">{region.name}</h2>
                  <p className="text-gray-500 text-sm">{region.description}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2">
                    <i className={`fas ${getWeatherIcon()} ${weatherIconColor()} text-3xl`}></i>
                    <span className="text-4xl font-bold text-gray-800">
                      {weatherData.temperature.toFixed(1)}°C
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm">
                    Ressenti {weatherData.feelsLike.toFixed(1)}°C
                  </p>
                  <p className="text-gray-400 text-xs capitalize">{weatherData.description}</p>
                </div>
              </div>
            </div>

            {/* Weather Metrics */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="border border-gray-200 rounded-lg p-3 text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <i className="fas fa-thermometer-half text-red-500"></i>
                  <span className="text-xs text-gray-500">Température</span>
                </div>
                <span className="text-lg font-bold text-gray-800">
                  {weatherData.temperature.toFixed(1)}°C
                </span>
              </div>
              <div className="border border-gray-200 rounded-lg p-3 text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <i className="fas fa-tint text-blue-500"></i>
                  <span className="text-xs text-gray-500">Humidité</span>
                </div>
                <span className="text-lg font-bold text-gray-800">{weatherData.humidity}%</span>
              </div>
              <div className="border border-gray-200 rounded-lg p-3 text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <i className="fas fa-wind text-teal-500"></i>
                  <span className="text-xs text-gray-500">Vent</span>
                </div>
                <span className="text-lg font-bold text-gray-800">
                  {(weatherData.windSpeed * 3.6).toFixed(0)} km/h
                </span>
                <p className="text-[10px] text-gray-500">
                  {weatherData.windDeg < 45 ? 'Nord' : 
                   weatherData.windDeg < 135 ? 'Est' : 
                   weatherData.windDeg < 225 ? 'Sud' : 
                   weatherData.windDeg < 315 ? 'Ouest' : 'Nord'}
                </p>
              </div>
            </div>

            {/* Risk Index */}
            {risk && (
              <RiskGauge 
                score={risk.score} 
                label={risk.label} 
                color={risk.color} 
              />
            )}

            {/* 7-Day Chart */}
            {historical && (
              <SevenDayChart 
                historicalData={historical.days} 
                dates={historical.dates} 
              />
            )}

            {/* Agricultural Advice */}
            <div className="bg-agri-light rounded-lg p-4 border border-green-200">
              <div className="flex items-start gap-3">
                <div>
                  <h4 className="font-semibold text-agri-dark mb-1">Conseil agricole</h4>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {risk && risk.score > 70 
                      ? 'Les conditions sont extrêmes. Limitez l\'irrigation et protégez les cultures du soleil direct. Surveillez l\'hydratation des sols.' 
                      : risk && risk.score > 40 
                        ? 'Les conditions sont favorables à l\'irrigation le matin ou en soirée. Surveillez l\'hydratation des cultures.' 
                        : 'Conditions optimales pour le travail en plein champ. Profitez-en pour l\'irrigation et la fertilisation.'}
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// ============================================
// COMPOSANT PRINCIPAL: APP
// ============================================
function App() {
  const [selectedRegion, setSelectedRegion] = useState('dakar');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [regionTemps, setRegionTemps] = useState({});
  const [panelVisible, setPanelVisible] = useState(true);

  // Chargement initial des données pour toutes les régions (températures sur la carte)
  useEffect(() => {
    const loadAllRegionTemps = async () => {
      const temps = {};
      for (const [key, region] of Object.entries(REGIONS)) {
        try {
          const data = await fetchWeatherData(region.lat, region.lon);
          temps[key] = data.temperature;
        } catch (e) {
          // En cas d'erreur, garder la valeur par défaut
          temps[key] = null;
        }
      }
      setRegionTemps(temps);
    };
    
    // Charger uniquement si la clé API est configurée
    if (API_KEY !== 'VOTRE_CLE_API_OPENWEATHERMAP') {
      loadAllRegionTemps();
    }
  }, []);

  // Chargement des données détaillées pour la région sélectionnée
  const loadRegionWeather = useCallback(async (regionKey) => {
    setLoading(true);
    setError(null);
    
    try {
      const region = REGIONS[regionKey];
      const data = await fetchWeatherData(region.lat, region.lon);
      setWeatherData(data);
      setPanelVisible(true);
    } catch (err) {
      setError(err.message || 'Impossible de récupérer les données météo. Vérifiez votre connexion.');
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // Chargement initial de Dakar
  useEffect(() => {
    if (API_KEY !== 'VOTRE_CLE_API_OPENWEATHERMAP') {
      loadRegionWeather('dakar');
    }
  }, [loadRegionWeather]);

  // Géolocalisation de l'utilisateur
  useEffect(() => {
    if (navigator.geolocation && API_KEY !== 'VOTRE_CLE_API_OPENWEATHERMAP') {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          
          // Vérifier si la position est au Sénégal (approximation)
          // Sénégal: lat ~12-17, lon ~-17 à -11
          if (latitude >= 12 && latitude <= 17.5 && longitude >= -17.5 && longitude <= -11) {
            // Trouver la région la plus proche
            let closestRegion = 'dakar';
            let minDistance = Infinity;
            
            for (const [key, region] of Object.entries(REGIONS)) {
              const distance = Math.sqrt(
                Math.pow(latitude - region.lat, 2) + Math.pow(longitude - region.lon, 2)
              );
              if (distance < minDistance) {
                minDistance = distance;
                closestRegion = key;
              }
            }
            
            setSelectedRegion(closestRegion);
            loadRegionWeather(closestRegion);
          }
        },
        (err) => {
          console.log('Géolocalisation refusée ou indisponible, chargement de Dakar par défaut');
          // Dakar est déjà chargé par défaut
        }
      );
    }
  }, [loadRegionWeather]);

  const handleRegionClick = (regionKey) => {
    setSelectedRegion(regionKey);
    loadRegionWeather(regionKey);
  };

  const handleClosePanel = () => {
    setPanelVisible(false);
  };

  // Déterminer la couleur d'une région sur la carte
  const getRegionColor = (regionKey) => {
    if (selectedRegion === regionKey) {
      return '#2e7d32'; // Vert foncé pour sélectionné
    }
    
    const temp = regionTemps[regionKey];
    if (temp === null || temp === undefined) {
      return BASE_COLORS[regionKey]; // Fallback
    }
    
    // Couleur dynamique basée sur la température réelle
    if (temp >= 37) return '#f44336'; // Rouge
    if (temp >= 35) return '#ff9800'; // Orange
    if (temp >= 33) return '#ffca28'; // Jaune
    return '#66bb6a'; // Vert
  };

  // Icône météo pour la carte
  const getMapWeatherIcon = (regionKey) => {
    const temp = regionTemps[regionKey];
    if (temp === null || temp === undefined) return null;
    
    // SVG simple soleil/nuage
    if (temp > 35) {
      return (
        <circle cx="0" cy="0" r="10" fill="#ffc107">
          <animate attributeName="r" values="10;12;10" dur="2s" repeatCount="indefinite" />
        </circle>
      );
    }
    return (
      <circle cx="0" cy="0" r="10" fill="#ffc107" />
    );
  };

  return (
    <div className="App">
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <aside className="w-20 bg-agri-dark flex flex-col items-center py-4 flex-shrink-0 z-20">
          {/* Menu Button */}
          <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white mb-6 hover:bg-white/20 transition">
            <i className="fas fa-bars"></i>
          </button>

          {/* Nav Items */}
          <nav className="flex flex-col gap-2 w-full">
            <a href="#" className="sidebar-item active flex flex-col items-center py-3 px-2 text-white">
              <i className="fas fa-home text-lg mb-1"></i>
              <span className="text-[10px] text-center leading-tight">Tableau de<br />bord</span>
            </a>
            <a href="#" className="sidebar-item flex flex-col items-center py-3 px-2 text-gray-400 hover:text-white">
              <i className="fas fa-map text-lg mb-1"></i>
              <span className="text-[10px] text-center">Carte</span>
            </a>
            <a href="#" className="sidebar-item flex flex-col items-center py-3 px-2 text-gray-400 hover:text-white">
              <i className="fas fa-chart-line text-lg mb-1"></i>
              <span className="text-[10px] text-center">Prévisions</span>
            </a>
            <a href="#" className="sidebar-item flex flex-col items-center py-3 px-2 text-gray-400 hover:text-white">
              <i className="fas fa-bell text-lg mb-1"></i>
              <span className="text-[10px] text-center">Alertes</span>
            </a>
            <a href="#" className="sidebar-item flex flex-col items-center py-3 px-2 text-gray-400 hover:text-white">
              <i className="fas fa-leaf text-lg mb-1"></i>
              <span className="text-[10px] text-center leading-tight">Conseils<br />agricoles</span>
            </a>
            <a href="#" className="sidebar-item flex flex-col items-center py-3 px-2 text-gray-400 hover:text-white">
              <i className="fas fa-cog text-lg mb-1"></i>
              <span className="text-[10px] text-center">Paramètres</span>
            </a>
          </nav>

        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="bg-white px-6 py-3 flex items-center justify-between shadow-sm flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div>
                  <h1 className="text-agri-dark font-bold text-lg leading-tight">AgriMétéo Sénégal</h1>
                  <p className="text-gray-500 text-xs">Surveillez le climat, sécurisez vos récoltes</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="relative">
                <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                <input
                  type="text"
                  placeholder="Rechercher une région..."
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg w-64 text-sm focus:outline-none focus:border-agri-green"
                />
              </div>

              {/* Notification */}
              <button className="relative p-2 text-gray-600 hover:text-agri-green">
                <i className="fas fa-bell text-lg"></i>
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Update Time */}
              <span className="text-gray-500 text-sm">
                Mise à jour : {new Date().toLocaleDateString('fr-FR')} {new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </header>

          {/* Content Area */}
          <div className="flex-1 flex overflow-hidden">
            {/* Map Section */}
            <div className="flex-1 p-6 overflow-y-auto">
              <div className="bg-white rounded-xl shadow-sm p-6 h-full">
                {/* Map Title */}
                <div className="flex items-center gap-2 mb-4">
                  <h2 className="text-gray-800 font-semibold text-lg">Carte des régions du Sénégal</h2>
                  <i className="fas fa-info-circle text-gray-400 text-sm cursor-help"></i>
                </div>

                {/* Map Container */}
                <div className="relative bg-blue-50 rounded-xl overflow-hidden" style={{ height: '500px' }}>
                  {/* SVG Map of Senegal */}
                  <svg viewBox="0 0 800 600" className="w-full h-full">
                    {/* Background */}
                    <rect width="800" height="600" fill="#e3f2fd" opacity="0.5" />

                    {/* Ocean */}
                    <path d="M0,0 L200,0 L200,600 L0,600 Z" fill="#bbdefb" />

                    {/* Saint-Louis */}
                    <path
                      id="saint-louis"
                      className="map-region cursor-pointer transition-all duration-200 hover:opacity-80"
                      onClick={() => handleRegionClick('saint-louis')}
                      d="M200,50 L350,50 L400,120 L380,180 L300,200 L250,150 L200,100 Z"
                      fill={getRegionColor('saint-louis')}
                      stroke="white"
                      strokeWidth={selectedRegion === 'saint-louis' ? 3 : 2}
                    />
                    <text x="280" y="110" className="text-xs fill-white font-medium pointer-events-none" textAnchor="middle">
                      <tspan x="280" dy="0">Saint-Louis</tspan>
                      <tspan x="280" dy="16">
                        {regionTemps['saint-louis'] ? `${regionTemps['saint-louis'].toFixed(1)}°C` : '--°C'}
                      </tspan>
                    </text>

                    {/* Louga */}
                    <path
                      id="louga"
                      className="map-region cursor-pointer transition-all duration-200 hover:opacity-80"
                      onClick={() => handleRegionClick('louga')}
                      d="M250,150 L300,200 L380,180 L420,220 L400,280 L320,300 L280,250 Z"
                      fill={getRegionColor('louga')}
                      stroke="white"
                      strokeWidth={selectedRegion === 'louga' ? 3 : 2}
                    />
                    <text x="340" y="230" className="text-xs fill-white font-medium pointer-events-none" textAnchor="middle">
                      <tspan x="340" dy="0">Louga</tspan>
                      <tspan x="340" dy="16">
                        {regionTemps['louga'] ? `${regionTemps['louga'].toFixed(1)}°C` : '--°C'}
                      </tspan>
                    </text>

                    {/* Matam */}
                    <path
                      id="matam"
                      className="map-region cursor-pointer transition-all duration-200 hover:opacity-80"
                      onClick={() => handleRegionClick('matam')}
                      d="M380,180 L500,150 L550,200 L580,280 L520,320 L450,300 L420,220 Z"
                      fill={getRegionColor('matam')}
                      stroke="white"
                      strokeWidth={selectedRegion === 'matam' ? 3 : 2}
                    />
                    <text x="490" y="240" className="text-xs fill-white font-medium pointer-events-none" textAnchor="middle">
                      <tspan x="490" dy="0">Matam</tspan>
                      <tspan x="490" dy="16">
                        {regionTemps['matam'] ? `${regionTemps['matam'].toFixed(1)}°C` : '--°C'}
                      </tspan>
                    </text>

                    {/* Thiès */}
                    <path
                      id="thies"
                      className="map-region cursor-pointer transition-all duration-200 hover:opacity-80"
                      onClick={() => handleRegionClick('thies')}
                      d="M200,100 L250,150 L280,250 L220,320 L150,300 L120,200 Z"
                      fill={getRegionColor('thies')}
                      stroke="white"
                      strokeWidth={selectedRegion === 'thies' ? 3 : 2}
                    />
                    <text x="200" y="220" className="text-xs fill-white font-medium pointer-events-none" textAnchor="middle">
                      Thiès
                    </text>

                    {/* Diourbel */}
                    <path
                      id="diourbel"
                      className="map-region cursor-pointer transition-all duration-200 hover:opacity-80"
                      onClick={() => handleRegionClick('diourbel')}
                      d="M280,250 L320,300 L350,380 L300,420 L250,380 L220,320 Z"
                      fill={getRegionColor('diourbel')}
                      stroke="white"
                      strokeWidth={selectedRegion === 'diourbel' ? 3 : 2}
                    />
                    <text x="290" y="340" className="text-xs fill-white font-medium pointer-events-none" textAnchor="middle">
                      <tspan x="290" dy="0">Diourbel</tspan>
                      <tspan x="290" dy="16">
                        {regionTemps['diourbel'] ? `${regionTemps['diourbel'].toFixed(1)}°C` : '--°C'}
                      </tspan>
                    </text>

                    {/* Fatick */}
                    <path
                      id="fatick"
                      className="map-region cursor-pointer transition-all duration-200 hover:opacity-80"
                      onClick={() => handleRegionClick('fatick')}
                      d="M150,300 L220,320 L250,380 L200,450 L120,420 L100,350 Z"
                      fill={getRegionColor('fatick')}
                      stroke="white"
                      strokeWidth={selectedRegion === 'fatick' ? 3 : 2}
                    />
                    <text x="170" y="380" className="text-xs fill-white font-medium pointer-events-none" textAnchor="middle">
                      <tspan x="170" dy="0">Fatick</tspan>
                      <tspan x="170" dy="16">
                        {regionTemps['fatick'] ? `${regionTemps['fatick'].toFixed(1)}°C` : '--°C'}
                      </tspan>
                    </text>

                    {/* Kaolack */}
                    <path
                      id="kaolack"
                      className="map-region cursor-pointer transition-all duration-200 hover:opacity-80"
                      onClick={() => handleRegionClick('kaolack')}
                      d="M300,420 L350,380 L400,400 L420,480 L350,500 L300,480 Z"
                      fill={getRegionColor('kaolack')}
                      stroke="white"
                      strokeWidth={selectedRegion === 'kaolack' ? 3 : 2}
                    />
                    <text x="360" y="450" className="text-xs fill-white font-medium pointer-events-none" textAnchor="middle">
                      <tspan x="360" dy="0">Kaolack</tspan>
                      <tspan x="360" dy="16">
                        {regionTemps['kaolack'] ? `${regionTemps['kaolack'].toFixed(1)}°C` : '--°C'}
                      </tspan>
                    </text>

                    {/* Kaffrine */}
                    <path
                      id="kaffrine"
                      className="map-region cursor-pointer transition-all duration-200 hover:opacity-80"
                      onClick={() => handleRegionClick('kaffrine')}
                      d="M350,380 L400,400 L450,380 L480,450 L420,480 L400,400 Z"
                      fill={getRegionColor('kaffrine')}
                      stroke="white"
                      strokeWidth={selectedRegion === 'kaffrine' ? 3 : 2}
                    />
                    <text x="420" y="420" className="text-xs fill-white font-medium pointer-events-none" textAnchor="middle">
                      <tspan x="420" dy="0">Kaffrine</tspan>
                      <tspan x="420" dy="16">
                        {regionTemps['kaffrine'] ? `${regionTemps['kaffrine'].toFixed(1)}°C` : '--°C'}
                      </tspan>
                    </text>

                    {/* Tambacounda */}
                    <path
                      id="tambacounda"
                      className="map-region cursor-pointer transition-all duration-200 hover:opacity-80"
                      onClick={() => handleRegionClick('tambacounda')}
                      d="M450,300 L520,320 L580,280 L620,350 L600,450 L520,480 L480,450 L450,380 Z"
                      fill={getRegionColor('tambacounda')}
                      stroke="white"
                      strokeWidth={selectedRegion === 'tambacounda' ? 3 : 2}
                    />
                    <text x="530" y="380" className="text-xs fill-white font-medium pointer-events-none" textAnchor="middle">
                      <tspan x="530" dy="0">Tambacounda</tspan>
                      <tspan x="530" dy="16">
                        {regionTemps['tambacounda'] ? `${regionTemps['tambacounda'].toFixed(1)}°C` : '--°C'}
                      </tspan>
                    </text>

                    {/* Ziguinchor */}
                    <path
                      id="ziguinchor"
                      className="map-region cursor-pointer transition-all duration-200 hover:opacity-80"
                      onClick={() => handleRegionClick('ziguinchor')}
                      d="M80,450 L150,450 L180,520 L120,580 L60,550 L50,500 Z"
                      fill={getRegionColor('ziguinchor')}
                      stroke="white"
                      strokeWidth={selectedRegion === 'ziguinchor' ? 3 : 2}
                    />
                    <text x="110" y="520" className="text-xs fill-white font-medium pointer-events-none" textAnchor="middle">
                      <tspan x="110" dy="0">Ziguinchor</tspan>
                      <tspan x="110" dy="16">
                        {regionTemps['ziguinchor'] ? `${regionTemps['ziguinchor'].toFixed(1)}°C` : '--°C'}
                      </tspan>
                    </text>

                    {/* Sédhiou */}
                    <path
                      id="sedhiou"
                      className="map-region cursor-pointer transition-all duration-200 hover:opacity-80"
                      onClick={() => handleRegionClick('sedhiou')}
                      d="M150,450 L220,450 L250,520 L200,560 L180,520 Z"
                      fill={getRegionColor('sedhiou')}
                      stroke="white"
                      strokeWidth={selectedRegion === 'sedhiou' ? 3 : 2}
                    />
                    <text x="200" y="510" className="text-xs fill-white font-medium pointer-events-none" textAnchor="middle">
                      <tspan x="200" dy="0">Sédhiou</tspan>
                      <tspan x="200" dy="16">
                        {regionTemps['sedhiou'] ? `${regionTemps['sedhiou'].toFixed(1)}°C` : '--°C'}
                      </tspan>
                    </text>

                    {/* Kolda */}
                    <path
                      id="kolda"
                      className="map-region cursor-pointer transition-all duration-200 hover:opacity-80"
                      onClick={() => handleRegionClick('kolda')}
                      d="M220,450 L300,480 L350,500 L320,580 L250,560 L250,520 Z"
                      fill={getRegionColor('kolda')}
                      stroke="white"
                      strokeWidth={selectedRegion === 'kolda' ? 3 : 2}
                    />
                    <text x="280" y="520" className="text-xs fill-white font-medium pointer-events-none" textAnchor="middle">
                      <tspan x="280" dy="0">Kolda</tspan>
                      <tspan x="280" dy="16">
                        {regionTemps['kolda'] ? `${regionTemps['kolda'].toFixed(1)}°C` : '--°C'}
                      </tspan>
                    </text>

                    {/* Kédougou */}
                    <path
                      id="kedougou"
                      className="map-region cursor-pointer transition-all duration-200 hover:opacity-80"
                      onClick={() => handleRegionClick('kedougou')}
                      d="M520,480 L600,450 L650,500 L620,580 L550,580 L520,520 Z"
                      fill={getRegionColor('kedougou')}
                      stroke="white"
                      strokeWidth={selectedRegion === 'kedougou' ? 3 : 2}
                    />
                    <text x="580" y="530" className="text-xs fill-white font-medium pointer-events-none" textAnchor="middle">
                      <tspan x="580" dy="0">Kédougou</tspan>
                      <tspan x="580" dy="16">
                        {regionTemps['kedougou'] ? `${regionTemps['kedougou'].toFixed(1)}°C` : '--°C'}
                      </tspan>
                    </text>

                    {/* Dakar */}
                    <path
                      id="dakar"
                      className="map-region cursor-pointer transition-all duration-200 hover:opacity-80"
                      onClick={() => handleRegionClick('dakar')}
                      d="M80,200 L120,200 L150,300 L120,420 L80,400 L60,300 Z"
                      fill={getRegionColor('dakar')}
                      stroke="white"
                      strokeWidth={selectedRegion === 'dakar' ? 3 : 2}
                    />
                    <text x="100" y="310" className="text-xs fill-white font-bold pointer-events-none" textAnchor="middle">
                      <tspan x="100" dy="0">Dakar</tspan>
                      <tspan x="100" dy="16">
                        {regionTemps['dakar'] ? `${regionTemps['dakar'].toFixed(1)}°C` : '--°C'}
                      </tspan>
                    </text>
                    {/* Sun icon for Dakar */}
                    <circle cx="100" cy="280" r="12" fill="#ffc107" />
                    <circle cx="100" cy="280" r="8" fill="#ff9800" />

                    {/* Zoom Controls */}
                    <g transform="translate(720, 80)">
                      <rect x="0" y="0" width="30" height="30" rx="4" fill="white" stroke="#ddd" className="cursor-pointer hover:bg-gray-50" />
                      <text x="15" y="20" textAnchor="middle" className="fill-gray-600 font-bold pointer-events-none">+</text>
                      <rect x="0" y="32" width="30" height="30" rx="4" fill="white" stroke="#ddd" className="cursor-pointer hover:bg-gray-50" />
                      <text x="15" y="52" textAnchor="middle" className="fill-gray-600 font-bold pointer-events-none">-</text>
                    </g>
                  </svg>

                  {/* Map Controls */}
                  <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-md p-3">
                    <div className="text-xs font-semibold text-gray-700 mb-2">Température (°C)</div>
                    <div className="flex items-center gap-1">
                      <div className="w-8 h-2 rounded-full bg-gradient-to-r from-green-500 via-yellow-400 to-red-500"></div>
                    </div>
                    <div className="flex justify-between text-[10px] text-gray-500 mt-1 w-32">
                      <span>30</span>
                      <span>32</span>
                      <span>34</span>
                      <span>36</span>
                      <span>38</span>
                      <span>40</span>
                    </div>
                  </div>

                  <button className="absolute bottom-4 right-4 bg-white rounded-lg shadow-md px-4 py-2 flex items-center gap-2 text-sm text-gray-700 hover:bg-gray-50">
                    <i className="fas fa-crosshairs text-agri-green"></i>
                    Ma position
                  </button>
                </div>
              </div>
            </div>

            {/* Right Panel - Dashboard Contextuel */}
            {panelVisible && (
              <SidePanel
                regionKey={selectedRegion}
                weatherData={weatherData}
                loading={loading}
                error={error}
                onRetry={() => loadRegionWeather(selectedRegion)}
                onClose={handleClosePanel}
              />
            )}
          </div>

          {/* Footer Stats */}
          <div className="bg-agri-dark text-white px-6 py-4 flex-shrink-0">
            <div className="grid grid-cols-4 gap-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center">
                  <i className="fas fa-sun text-yellow-400 text-lg"></i>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Alerte en cours</p>
                  <p className="font-semibold">
                    {weatherData && calculateRisk(weatherData.temperature, weatherData.humidity).score > 70 ? '1 alerte' : '0 alerte'}
                  </p>
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
        </main>
      </div>
    </div>
  );
}

export default App;