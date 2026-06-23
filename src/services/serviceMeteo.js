import { URL_API_BASE, CLE_API } from '../utils/constantes';

export const recupererDonneesMeteo = async (lat, lon) => {
  try {
    const reponse = await fetch(
      `${URL_API_BASE}/weather?lat=${lat}&lon=${lon}&appid=${CLE_API}&units=metric&lang=fr`
    );
    
    if (!reponse.ok) {
      throw new Error(`Erreur API: ${reponse.status}`);
    }
    
    const donnees = await reponse.json();
    
    return {
      temperature: donnees.main.temp,
      ressenti: donnees.main.feels_like,
      humidite: donnees.main.humidity,
      vitesseVent: donnees.wind.speed,
      directionVent: donnees.wind.deg,
      description: donnees.weather[0].description,
      icone: donnees.weather[0].icon,
      condition: donnees.weather[0].main,
      nom: donnees.name
    };
  } catch (erreur) {
    console.error('Erreur lors de la récupération des données météo:', erreur);
    throw erreur;
  }
};