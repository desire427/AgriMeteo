import React from 'react';
import { useNavigate } from 'react-router-dom';

const BarreLaterale = ({ pageActive }) => {
  const navigate = useNavigate();

  const items = [
    { id: 'tableau-de-bord', icone: 'fa-home', label: 'Tableau de bord', path: '/' },
    { id: 'carte', icone: 'fa-map', label: 'Carte', path: '/carte' },
    { id: 'previsions', icone: 'fa-chart-line', label: 'Prévisions', path: '/previsions' },
    { id: 'alertes', icone: 'fa-bell', label: 'Alertes', path: '/alertes' },
    { id: 'conseils', icone: 'fa-leaf', label: 'Conseils agricoles', path: '/conseils' },
    { id: 'parametres', icone: 'fa-cog', label: 'Paramètres', path: '/parametres' }
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <aside className="w-20 bg-agri-dark flex flex-col items-center py-4 flex-shrink-0 z-20">
      <button 
        className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white mb-6 hover:bg-white/20 transition"
        onClick={() => handleNavigation('/')}
      >
        <i className="fas fa-bars"></i>
      </button>

      <nav className="flex flex-col gap-2 w-full">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => handleNavigation(item.path)}
            className={`flex flex-col items-center py-3 px-2 w-full transition ${
              pageActive === item.id ? 'text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            <i className={`fas ${item.icone} text-lg mb-1`}></i>
            <span className="text-[10px] text-center leading-tight">{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default BarreLaterale;