import { useState, useEffect } from 'react';

export const useGeolocalisation = () => {
  const [position, setPosition] = useState(null);
  const [erreur, setErreur] = useState(null);
  const [chargement, setChargement] = useState(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      setErreur('La géolocalisation n\'est pas supportée par votre navigateur.');
      setChargement(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setPosition({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
        setChargement(false);
      },
      (err) => {
        setErreur('Impossible d\'obtenir votre position.');
        setChargement(false);
      }
    );
  }, []);

  return { position, erreur, chargement };
};