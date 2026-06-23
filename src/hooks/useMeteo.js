import { useState, useCallback } from 'react';
import { recupererDonneesMeteo } from '../services/serviceMeteo';
import { REGIONS } from '../utils/constantes';

export const useMeteo = (regionInitiale = 'dakar') => {
  const [regionSelectionnee, setRegionSelectionnee] = useState(regionInitiale);
  const [donneesMeteo, setDonneesMeteo] = useState(null);
  const [chargement, setChargement] = useState(false);
  const [erreur, setErreur] = useState(null);

  const chargerMeteoRegion = useCallback(async (cleRegion) => {
    setChargement(true);
    setErreur(null);
    
    try {
      const region = REGIONS[cleRegion];
      const donnees = await recupererDonneesMeteo(region.lat, region.lon);
      setDonneesMeteo(donnees);
      setRegionSelectionnee(cleRegion);
      return donnees;
    } catch (err) {
      setErreur(err.message || 'Impossible de récupérer les données météo.');
      setDonneesMeteo(null);
      throw err;
    } finally {
      setChargement(false);
    }
  }, []);

  return {
    regionSelectionnee,
    donneesMeteo,
    chargement,
    erreur,
    chargerMeteoRegion,
    setRegionSelectionnee
  };
};