import React from 'react';

const Graphique7Jours = ({ donneesHistoriques, dates }) => {
  if (!donneesHistoriques || donneesHistoriques.length === 0) return null;

  const temps = donneesHistoriques.map(d => d.temp);
  const humidites = donneesHistoriques.map(d => d.humidite);
  
  const maxTemp = Math.max(...temps) + 2;
  const minTemp = Math.min(...temps) - 2;
  const plageTemp = maxTemp - minTemp || 1;
  
  const largeur = 340;
  const hauteur = 160;
  const paddingGauche = 40;
  const paddingDroit = 10;
  const paddingHaut = 10;
  const paddingBas = 20;
  const largeurGraphique = largeur - paddingGauche - paddingDroit;
  const hauteurGraphique = hauteur - paddingHaut - paddingBas;
  
  const getX = (index) => paddingGauche + (index / (temps.length - 1)) * largeurGraphique;
  const getYTemp = (temp) => paddingHaut + hauteurGraphique - ((temp - minTemp) / plageTemp) * hauteurGraphique;
  const getYHum = (hum) => paddingHaut + hauteurGraphique - (hum / 100) * hauteurGraphique;
  
  const pointsTemp = temps.map((t, i) => `${getX(i)},${getYTemp(t)}`).join(' ');
  const pointsHum = humidites.map((h, i) => `${getX(i)},${getYHum(h)}`).join(' ');

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
        <div className="absolute left-0 right-0 top-0 border-t border-gray-100"></div>
        <div className="absolute left-0 right-0 top-1/3 border-t border-gray-100"></div>
        <div className="absolute left-0 right-0 top-2/3 border-t border-gray-100"></div>

        <svg className="absolute inset-0 w-full h-full" viewBox={`0 0 ${largeur} ${hauteur}`} preserveAspectRatio="none">
          <polyline points={pointsTemp} fill="none" stroke="#4caf50" strokeWidth="2" />
          {temps.map((t, i) => (
            <circle key={`temp-${i}`} cx={getX(i)} cy={getYTemp(t)} r="3" fill="#4caf50" />
          ))}

          <polyline points={pointsHum} fill="none" stroke="#2196f3" strokeWidth="2" />
          {humidites.map((h, i) => (
            <circle key={`hum-${i}`} cx={getX(i)} cy={getYHum(h)} r="3" fill="#2196f3" />
          ))}
        </svg>

        <div className="absolute -left-8 top-0 text-[10px] text-gray-500">{Math.round(maxTemp)}°C</div>
        <div className="absolute -left-8 top-1/3 text-[10px] text-gray-500">{Math.round(minTemp + (plageTemp * 2/3))}°C</div>
        <div className="absolute -left-8 top-2/3 text-[10px] text-gray-500">{Math.round(minTemp + (plageTemp * 1/3))}°C</div>
        <div className="absolute -left-8 bottom-0 text-[10px] text-gray-500">{Math.round(minTemp)}°C</div>
        
        <div className="absolute -left-16 top-0 text-[10px] text-gray-500">100%</div>
        <div className="absolute -left-16 top-1/3 text-[10px] text-gray-500">75%</div>
        <div className="absolute -left-16 top-2/3 text-[10px] text-gray-500">50%</div>
        <div className="absolute -left-16 bottom-0 text-[10px] text-gray-500">25%</div>
      </div>
      <div className="flex justify-between mt-1 px-4 text-[10px] text-gray-500">
        {dates.map((date, i) => (
          <span key={i}>{date}</span>
        ))}
      </div>
    </div>
  );
};

export default Graphique7Jours;