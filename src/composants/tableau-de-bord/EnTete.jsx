import React from 'react';

const EnTete = ({ dateMiseAJour }) => (
  <header className="bg-white px-6 py-3 flex items-center justify-between shadow-sm flex-shrink-0">
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2">
        <div>
          <h1 className="text-agri-dark font-bold text-lg leading-tight">AgriMétéo Sénégal</h1>
          <p className="text-gray-500 text-xs">Surveillez le climat, sécurisez vos récoltes</p>
        </div>
      </div>
    </div>

    <div className="flex items-center gap-4">
      <div className="relative">
        <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
        <input
          type="text"
          placeholder="Rechercher une région..."
          className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg w-64 text-sm focus:outline-none focus:border-agri-green"
        />
      </div>

      <button className="relative p-2 text-gray-600 hover:text-agri-green">
        <i className="fas fa-bell text-lg"></i>
        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
      </button>

      <span className="text-gray-500 text-sm">
        Mise à jour : {dateMiseAJour}
      </span>
    </div>
  </header>
);

export default EnTete;