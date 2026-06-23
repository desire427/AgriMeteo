// Fonction de calcul de l'indice de risque
export const calculerRisque = (temp, humidite) => {
  let score = 0;
  let libelle = '';
  let couleur = '';

  if (temp > 38 && humidite > 60) {
    score = 85;
    libelle = 'Risque Canicule Élevé';
    couleur = '#FF4500';
  } else if (temp > 38 && humidite <= 60) {
    score = 75;
    libelle = 'Risque Canicule Modéré';
    couleur = '#FF8C00';
  } else if (temp > 35 && humidite > 70) {
    score = 70;
    libelle = 'Risque Humidité Élevée';
    couleur = '#FFA500';
  } else if (temp > 35 && humidite <= 70) {
    score = 60;
    libelle = 'Chaleur Importante';
    couleur = '#FFD700';
  } else if (temp < 20 && humidite > 80) {
    score = 55;
    libelle = 'Risque Humidité Froide';
    couleur = '#87CEEB';
  } else if (temp >= 25 && temp <= 35 && humidite >= 40 && humidite <= 70) {
    score = 25;
    libelle = 'Conditions Favorables';
    couleur = '#4CAF50';
  } else {
    score = 40;
    libelle = 'Risque Faible';
    couleur = '#8BC34A';
  }

  return { score, libelle, couleur };
};

// Génération de données historiques
export const genererDonneesHistoriques = (tempActuelle, humiditeActuelle) => {
  const jours = [];
  const dates = [];
  
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    dates.push(date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' }));
    
    const variationTemp = (Math.random() - 0.5) * 6;
    const variationHumidite = (Math.random() - 0.5) * 20;
    
    jours.push({
      temp: Math.round((tempActuelle + variationTemp) * 10) / 10,
      humidite: Math.min(100, Math.max(0, Math.round(humiditeActuelle + variationHumidite)))
    });
  }
  
  return { jours, dates };
};

// Obtenir l'icône météo
export const obtenirIconeMeteo = (condition, icone) => {
  if (!condition) return 'fa-cloud-sun';
  const conditionLower = condition?.toLowerCase() || '';
  
  if (conditionLower.includes('rain') || icone?.includes('09') || icone?.includes('10')) return 'fa-cloud-rain';
  if (conditionLower.includes('thunder') || icone?.includes('11')) return 'fa-bolt';
  if (conditionLower.includes('snow') || icone?.includes('13')) return 'fa-snowflake';
  if (conditionLower.includes('mist') || conditionLower.includes('fog') || icone?.includes('50')) return 'fa-smog';
  if (icone?.includes('01d')) return 'fa-sun';
  if (icone?.includes('01n')) return 'fa-moon';
  if (icone?.includes('02') || icone?.includes('03') || icone?.includes('04')) return 'fa-cloud-sun';
  return 'fa-cloud-sun';
};

// Obtenir la couleur de l'icône météo
export const obtenirCouleurIcone = (icone) => {
  if (!icone) return 'text-yellow-500';
  if (icone.includes('01d')) return 'text-yellow-500';
  if (icone.includes('01n')) return 'text-blue-300';
  if (icone.includes('09') || icone.includes('10') || icone.includes('11')) return 'text-blue-500';
  return 'text-gray-500';
};

// Obtenir la direction du vent
export const obtenirDirectionVent = (deg) => {
  if (deg < 45) return 'Nord';
  if (deg < 135) return 'Est';
  if (deg < 225) return 'Sud';
  if (deg < 315) return 'Ouest';
  return 'Nord';
};

// Obtenir le conseil agricole
export const obtenirConseilAgricole = (score) => {
  if (score > 70) {
    return 'Les conditions sont extrêmes. Limitez l\'irrigation et protégez les cultures du soleil direct. Surveillez l\'hydratation des sols.';
  }
  if (score > 40) {
    return 'Les conditions sont favorables à l\'irrigation le matin ou en soirée. Surveillez l\'hydratation des cultures.';
  }
  return 'Conditions optimales pour le travail en plein champ. Profitez-en pour l\'irrigation et la fertilisation.';
};