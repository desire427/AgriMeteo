// Configuration des constantes
export const CLE_API = import.meta.env.VITE_OPENWEATHER_API_KEY;
export const URL_API_BASE = 'https://api.openweathermap.org/data/2.5';

// Coordonnées des 14 régions du Sénégal
export const REGIONS = {
  'dakar': { 
    nom: 'Dakar', 
    lat: 14.7167, 
    lon: -17.4677, 
    description: 'Capitale du Sénégal',
    cx: 88.4, 
    cy: 325.8 
  },
  'saint-louis': { 
    nom: 'Saint-Louis', 
    lat: 16.0179, 
    lon: -16.4896, 
    description: 'Région du nord',
    cx: 440.3, 
    cy: 90.3 
  },
  'louga': { 
    nom: 'Louga', 
    lat: 15.6185, 
    lon: -16.2245, 
    description: 'Région du nord-ouest',
    cx: 354.5, 
    cy: 231.2 
  },
  'matam': { 
    nom: 'Matam', 
    lat: 15.6559, 
    lon: -13.2554, 
    description: 'Région du nord-est',
    cx: 602.2, 
    cy: 269 
  },
  'thies': { 
    nom: 'Thiès', 
    lat: 14.7894, 
    lon: -16.9260, 
    description: 'Région de l\'ouest',
    cx: 141.4, 
    cy: 333.2 
  },
  'diourbel': { 
    nom: 'Diourbel', 
    lat: 14.6560, 
    lon: -16.2310, 
    description: 'Région du centre',
    cx: 269.2, 
    cy: 329 
  },
  'fatick': { 
    nom: 'Fatick', 
    lat: 14.3531, 
    lon: -16.4061, 
    description: 'Région du centre-ouest',
    cx: 212.2, 
    cy: 381.8 
  },
  'kaolack': { 
    nom: 'Kaolack', 
    lat: 14.1820, 
    lon: -16.2530, 
    description: 'Région du centre',
    cx: 274.8, 
    cy: 467.3 
  },
  'kaffrine': { 
    nom: 'Kaffrine', 
    lat: 14.1050, 
    lon: -15.5500, 
    description: 'Région du centre-est',
    cx: 390.5, 
    cy: 415.1 
  },
  'tambacounda': { 
    nom: 'Tambacounda', 
    lat: 13.7539, 
    lon: -13.7586, 
    description: 'Région de l\'est',
    cx: 703.3, 
    cy: 455.4 
  },
  'ziguinchor': { 
    nom: 'Ziguinchor', 
    lat: 12.5833, 
    lon: -16.2667, 
    description: 'Région du sud-ouest',
    cx: 228.7, 
    cy: 614.8 
  },
  'sedhiou': { 
    nom: 'Sédhiou', 
    lat: 12.5600, 
    lon: -15.5500, 
    description: 'Région du sud',
    cx: 324.7, 
    cy: 595.9 
  },
  'kolda': { 
    nom: 'Kolda', 
    lat: 12.8833, 
    lon: -14.9500, 
    description: 'Région du sud-est',
    cx: 472.4, 
    cy: 595.8 
  },
  'kedougou': { 
    nom: 'Kédougou', 
    lat: 12.5600, 
    lon: -12.1800, 
    description: 'Région du sud-est',
    cx: 813.2, 
    cy: 626.1 
  }
};

// Couleurs de base des régions
export const COULEURS_BASE = {
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

// Points d'étiquettes pour la carte
export const POINTS_ETIQUETTES = {
  'dakar': { cx: 88.4, cy: 325.8 },
  'saint-louis': { cx: 440.3, cy: 90.3 },
  'louga': { cx: 354.5, cy: 231.2 },
  'matam': { cx: 602.2, cy: 269 },
  'thies': { cx: 141.4, cy: 333.2 },
  'diourbel': { cx: 269.2, cy: 329 },
  'fatick': { cx: 212.2, cy: 381.8 },
  'kaolack': { cx: 274.8, cy: 467.3 },
  'kaffrine': { cx: 390.5, cy: 415.1 },
  'tambacounda': { cx: 703.3, cy: 455.4 },
  'ziguinchor': { cx: 228.7, cy: 614.8 },
  'sedhiou': { cx: 324.7, cy: 595.9 },
  'kolda': { cx: 472.4, cy: 595.8 },
  'kedougou': { cx: 813.2, cy: 626.1 }
};