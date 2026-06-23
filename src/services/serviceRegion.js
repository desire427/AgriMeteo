import { REGIONS } from '../utils/constantes';
import { recupererDonneesMeteo } from './serviceMeteo';

export const chargerTemperaturesRegions = async () => {
  const temperatures = {};
  for (const [cle, region] of Object.entries(REGIONS)) {
    try {
      const donnees = await recupererDonneesMeteo(region.lat, region.lon);
      temperatures[cle] = donnees.temperature;
    } catch (e) {
      temperatures[cle] = null;
    }
  }
  return temperatures;
};

export const trouverRegionLaPlusProche = (latitude, longitude) => {
  let regionLaPlusProche = 'dakar';
  let distanceMinimale = Infinity;
  
  for (const [cle, region] of Object.entries(REGIONS)) {
    const distance = Math.sqrt(
      Math.pow(latitude - region.lat, 2) + Math.pow(longitude - region.lon, 2)
    );
    if (distance < distanceMinimale) {
      distanceMinimale = distance;
      regionLaPlusProche = cle;
    }
  }
  
  return regionLaPlusProche;
};