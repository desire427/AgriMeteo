import React from 'react';

const PiedPage = () => {
  const annee = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-50 border-t border-gray-200 px-6 py-3 flex-shrink-0">
      <div className="flex justify-between items-center">
        <p className="text-xs text-gray-500">
          © {annee} AgriMétéo Sénégal - Tous droits réservés
        </p>
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <span>Version 1.0.0</span>
          <span>|</span>
          <a href="#" className="hover:text-agri-green transition">Mentions légales</a>
          <span>|</span>
          <a href="#" className="hover:text-agri-green transition">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default PiedPage;