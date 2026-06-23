import React from 'react';

const Chargement = ({ message = 'Chargement des données météo...' }) => (
  <div className="flex flex-col items-center justify-center py-12">
    <div className="w-10 h-10 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mb-4"></div>
    <p className="text-gray-500 text-sm">{message}</p>
  </div>
);

export default Chargement;