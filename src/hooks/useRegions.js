import { useState, useEffect } from 'react';
import { REGIONS, COULEURS_BASE } from '../utils/constantes';
import { chargerTemperaturesRegions } from '../services/serviceRegion';

export const useRegions = (regionSelectionnee) => {
  const [temperaturesRegions, setTemperaturesRegions] = useState({});
  const [chargement, setChargement] = useState(true);

  useEffect(() => {
    const chargerTemps = async () => {
      setChargement(true);
      const temps = await chargerTemperaturesRegions();
      setTemperaturesRegions(temps);
      setChargement(false);
    };
    
    chargerTemps();
  }, []);

  const obtenirCouleurRegion = (cleRegion) => {
    if (regionSelectionnee === cleRegion) {
      return '#2e7d32';
    }
    
    const temp = temperaturesRegions[cleRegion];
    if (temp === null || temp === undefined) {
      return COULEURS_BASE[cleRegion];
    }
    
    if (temp >= 37) return '#f44336';
    if (temp >= 35) return '#ff9800';
    if (temp >= 33) return '#ffca28';
    return '#66bb6a';
  };

  return {
    temperaturesRegions,
    obtenirCouleurRegion,
    chargement
  };
};