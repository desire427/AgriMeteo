import React from 'react';

const Erreur = ({ message, onReessayer }) => (
  <div className="flex flex-col items-center justify-center py-8 px-4">
    <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-3">
      <i className="fas fa-exclamation-triangle text-red-500 text-xl"></i>
    </div>
    <p className="text-gray-700 font-medium text-center mb-2">Oups ! Une erreur est survenue</p>
    <p className="text-gray-500 text-sm text-center mb-4">{message}</p>
    <button 
      onClick={onReessayer}
      className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition"
    >
      Réessayer
    </button>
  </div>
);

export default Erreur;