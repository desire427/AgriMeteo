import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <aside className="w-20 bg-agri-dark flex flex-col items-center py-4 flex-shrink-0 z-20">
          {/* Menu Button */}
          <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white mb-6 hover:bg-white/20 transition">
            <i className="fas fa-bars"></i>
          </button>

          {/* Nav Items */}
          <nav className="flex flex-col gap-2 w-full">
            <a href="#" className="sidebar-item active flex flex-col items-center py-3 px-2 text-white">
              <i className="fas fa-home text-lg mb-1"></i>
              <span className="text-[10px] text-center leading-tight">Tableau de<br />bord</span>
            </a>
            <a href="#" className="sidebar-item flex flex-col items-center py-3 px-2 text-gray-400 hover:text-white">
              <i className="fas fa-map text-lg mb-1"></i>
              <span className="text-[10px] text-center">Carte</span>
            </a>
            <a href="#" className="sidebar-item flex flex-col items-center py-3 px-2 text-gray-400 hover:text-white">
              <i className="fas fa-chart-line text-lg mb-1"></i>
              <span className="text-[10px] text-center">Prévisions</span>
            </a>
            <a href="#" className="sidebar-item flex flex-col items-center py-3 px-2 text-gray-400 hover:text-white">
              <i className="fas fa-bell text-lg mb-1"></i>
              <span className="text-[10px] text-center">Alertes</span>
            </a>
            <a href="#" className="sidebar-item flex flex-col items-center py-3 px-2 text-gray-400 hover:text-white">
              <i className="fas fa-leaf text-lg mb-1"></i>
              <span className="text-[10px] text-center leading-tight">Conseils<br />agricoles</span>
            </a>
            <a href="#" className="sidebar-item flex flex-col items-center py-3 px-2 text-gray-400 hover:text-white">
              <i className="fas fa-cog text-lg mb-1"></i>
              <span className="text-[10px] text-center">Paramètres</span>
            </a>
          </nav>

          {/* Bottom Logo */}
          <div className="mt-auto mb-4 flex flex-col items-center text-center px-2">
            <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center mb-2">
              <i className="fas fa-seedling text-white text-xl"></i>
            </div>
            <span className="text-white text-xs font-bold">AgriMétéo</span>
            <span className="text-gray-400 text-[10px] leading-tight">Votre partenaire pour<br />une agriculture résiliente</span>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="bg-white px-6 py-3 flex items-center justify-between shadow-sm flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <i className="fas fa-seedling text-agri-green text-2xl"></i>
                <div>
                  <h1 className="text-agri-dark font-bold text-lg leading-tight">AgriMétéo Sénégal</h1>
                  <p className="text-gray-500 text-xs">Surveillez le climat, sécurisez vos récoltes</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="relative">
                <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                <input
                  type="text"
                  placeholder="Rechercher une région..."
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg w-64 text-sm focus:outline-none focus:border-agri-green"
                />
              </div>

              {/* Notification */}
              <button className="relative p-2 text-gray-600 hover:text-agri-green">
                <i className="fas fa-bell text-lg"></i>
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Update Time */}
              <span className="text-gray-500 text-sm">Mise à jour : 19/06/2025 10:30</span>
            </div>
          </header>

          {/* Content Area */}
          <div className="flex-1 flex overflow-hidden">
            {/* Map Section */}
            <div className="flex-1 p-6 overflow-y-auto">
              <div className="bg-white rounded-xl shadow-sm p-6 h-full">
                {/* Map Title */}
                <div className="flex items-center gap-2 mb-4">
                  <h2 className="text-gray-800 font-semibold text-lg">Carte des régions du Sénégal</h2>
                  <i className="fas fa-info-circle text-gray-400 text-sm cursor-help"></i>
                </div>

                {/* Map Container */}
                <div className="relative bg-blue-50 rounded-xl overflow-hidden" style={{ height: '500px' }}>
                  {/* SVG Map of Senegal */}
                  <svg viewBox="0 0 800 600" className="w-full h-full">
                    {/* Background */}
                    <rect width="800" height="600" fill="#e3f2fd" opacity="0.5" />

                    {/* Ocean */}
                    <path d="M0,0 L200,0 L200,600 L0,600 Z" fill="#bbdefb" />

                    {/* Saint-Louis (Green) */}
                    <path
                      className="map-region"
                      d="M200,50 L350,50 L400,120 L380,180 L300,200 L250,150 L200,100 Z"
                      fill="#66bb6a"
                      stroke="white"
                      strokeWidth="2"
                    />
                    <text x="280" y="110" className="text-xs fill-white font-medium" textAnchor="middle">
                      <tspan x="280" dy="0">Saint-Louis</tspan>
                      <tspan x="280" dy="16">33.2°C</tspan>
                    </text>
                    <image
                      x="265"
                      y="85"
                      width="20"
                      height="20"
                      href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Ccircle cx='12' cy='12' r='10' fill='%23ffc107'/%3E%3Cpath d='M12 2v22M2 12h20' stroke='%23ff9800' stroke-width='2'/%3E%3C/svg%3E"
                    />

                    {/* Louga (Yellow) */}
                    <path
                      className="map-region"
                      d="M250,150 L300,200 L380,180 L420,220 L400,280 L320,300 L280,250 Z"
                      fill="#ffca28"
                      stroke="white"
                      strokeWidth="2"
                    />
                    <text x="340" y="230" className="text-xs fill-white font-medium" textAnchor="middle">
                      <tspan x="340" dy="0">Louga</tspan>
                      <tspan x="340" dy="16">35.1°C</tspan>
                    </text>

                    {/* Matam (Orange) */}
                    <path
                      className="map-region"
                      d="M380,180 L500,150 L550,200 L580,280 L520,320 L450,300 L420,220 Z"
                      fill="#ff9800"
                      stroke="white"
                      strokeWidth="2"
                    />
                    <text x="490" y="240" className="text-xs fill-white font-medium" textAnchor="middle">
                      <tspan x="490" dy="0">Matam</tspan>
                      <tspan x="490" dy="16">36.8°C</tspan>
                    </text>

                    {/* Thiès (Green) */}
                    <path
                      className="map-region"
                      d="M200,100 L250,150 L280,250 L220,320 L150,300 L120,200 Z"
                      fill="#66bb6a"
                      stroke="white"
                      strokeWidth="2"
                    />
                    <text x="200" y="220" className="text-xs fill-white font-medium" textAnchor="middle">Thiès</text>

                    {/* Diourbel (Yellow) */}
                    <path
                      className="map-region"
                      d="M280,250 L320,300 L350,380 L300,420 L250,380 L220,320 Z"
                      fill="#ffca28"
                      stroke="white"
                      strokeWidth="2"
                    />
                    <text x="290" y="340" className="text-xs fill-white font-medium" textAnchor="middle">
                      <tspan x="290" dy="0">Diourbel</tspan>
                      <tspan x="290" dy="16">35.3°C</tspan>
                    </text>

                    {/* Fatick (Green) */}
                    <path
                      className="map-region"
                      d="M150,300 L220,320 L250,380 L200,450 L120,420 L100,350 Z"
                      fill="#66bb6a"
                      stroke="white"
                      strokeWidth="2"
                    />
                    <text x="170" y="380" className="text-xs fill-white font-medium" textAnchor="middle">
                      <tspan x="170" dy="0">Fatick</tspan>
                      <tspan x="170" dy="16">34.7°C</tspan>
                    </text>

                    {/* Kaolack (Yellow) */}
                    <path
                      className="map-region"
                      d="M300,420 L350,380 L400,400 L420,480 L350,500 L300,480 Z"
                      fill="#ffca28"
                      stroke="white"
                      strokeWidth="2"
                    />
                    <text x="360" y="450" className="text-xs fill-white font-medium" textAnchor="middle">
                      <tspan x="360" dy="0">Kaolack</tspan>
                      <tspan x="360" dy="16">36.2°C</tspan>
                    </text>

                    {/* Kaffrine (Yellow) */}
                    <path
                      className="map-region"
                      d="M350,380 L400,400 L450,380 L480,450 L420,480 L400,400 Z"
                      fill="#ffca28"
                      stroke="white"
                      strokeWidth="2"
                    />
                    <text x="420" y="420" className="text-xs fill-white font-medium" textAnchor="middle">
                      <tspan x="420" dy="0">Kaffrine</tspan>
                      <tspan x="420" dy="16">35.6°C</tspan>
                    </text>

                    {/* Tambacounda (Orange) */}
                    <path
                      className="map-region"
                      d="M450,300 L520,320 L580,280 L620,350 L600,450 L520,480 L480,450 L450,380 Z"
                      fill="#ff9800"
                      stroke="white"
                      strokeWidth="2"
                    />
                    <text x="530" y="380" className="text-xs fill-white font-medium" textAnchor="middle">
                      <tspan x="530" dy="0">Tambacounda</tspan>
                      <tspan x="530" dy="16">37.1°C</tspan>
                    </text>

                    {/* Ziguinchor (Green) */}
                    <path
                      className="map-region"
                      d="M80,450 L150,450 L180,520 L120,580 L60,550 L50,500 Z"
                      fill="#66bb6a"
                      stroke="white"
                      strokeWidth="2"
                    />
                    <text x="110" y="520" className="text-xs fill-white font-medium" textAnchor="middle">
                      <tspan x="110" dy="0">Ziguinchor</tspan>
                      <tspan x="110" dy="16">33.6°C</tspan>
                    </text>

                    {/* Sédhiou (Green) */}
                    <path
                      className="map-region"
                      d="M150,450 L220,450 L250,520 L200,560 L180,520 Z"
                      fill="#66bb6a"
                      stroke="white"
                      strokeWidth="2"
                    />
                    <text x="200" y="510" className="text-xs fill-white font-medium" textAnchor="middle">
                      <tspan x="200" dy="0">Sédhiou</tspan>
                      <tspan x="200" dy="16">33.9°C</tspan>
                    </text>

                    {/* Kolda (Green) */}
                    <path
                      className="map-region"
                      d="M220,450 L300,480 L350,500 L320,580 L250,560 L250,520 Z"
                      fill="#66bb6a"
                      stroke="white"
                      strokeWidth="2"
                    />
                    <text x="280" y="520" className="text-xs fill-white font-medium" textAnchor="middle">
                      <tspan x="280" dy="0">Kolda</tspan>
                      <tspan x="280" dy="16">34.3°C</tspan>
                    </text>

                    {/* Kédougou (Green) */}
                    <path
                      className="map-region"
                      d="M520,480 L600,450 L650,500 L620,580 L550,580 L520,520 Z"
                      fill="#66bb6a"
                      stroke="white"
                      strokeWidth="2"
                    />
                    <text x="580" y="530" className="text-xs fill-white font-medium" textAnchor="middle">
                      <tspan x="580" dy="0">Kédougou</tspan>
                      <tspan x="580" dy="16">33.1°C</tspan>
                    </text>

                    {/* Dakar (Dark Green - Selected) */}
                    <path
                      className="map-region"
                      d="M80,200 L120,200 L150,300 L120,420 L80,400 L60,300 Z"
                      fill="#2e7d32"
                      stroke="white"
                      strokeWidth="3"
                    />
                    <text x="100" y="310" className="text-xs fill-white font-bold" textAnchor="middle">
                      <tspan x="100" dy="0">Dakar</tspan>
                      <tspan x="100" dy="16">34.5°C</tspan>
                    </text>
                    {/* Sun icon for Dakar */}
                    <circle cx="100" cy="280" r="12" fill="#ffc107" />
                    <circle cx="100" cy="280" r="8" fill="#ff9800" />

                    {/* Zoom Controls */}
                    <g transform="translate(720, 80)">
                      <rect x="0" y="0" width="30" height="30" rx="4" fill="white" stroke="#ddd" className="cursor-pointer hover:bg-gray-50" />
                      <text x="15" y="20" textAnchor="middle" className="fill-gray-600 font-bold">+</text>
                      <rect x="0" y="32" width="30" height="30" rx="4" fill="white" stroke="#ddd" className="cursor-pointer hover:bg-gray-50" />
                      <text x="15" y="52" textAnchor="middle" className="fill-gray-600 font-bold">-</text>
                    </g>
                  </svg>

                  {/* Map Controls */}
                  <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-md p-3">
                    <div className="text-xs font-semibold text-gray-700 mb-2">Température (°C)</div>
                    <div className="flex items-center gap-1">
                      <div className="w-8 h-2 rounded-full bg-gradient-to-r from-green-500 via-yellow-400 to-red-500"></div>
                    </div>
                    <div className="flex justify-between text-[10px] text-gray-500 mt-1 w-32">
                      <span>30</span>
                      <span>32</span>
                      <span>34</span>
                      <span>36</span>
                      <span>38</span>
                      <span>40</span>
                    </div>
                  </div>

                  <button className="absolute bottom-4 right-4 bg-white rounded-lg shadow-md px-4 py-2 flex items-center gap-2 text-sm text-gray-700 hover:bg-gray-50">
                    <i className="fas fa-crosshairs text-agri-green"></i>
                    Ma position
                  </button>
                </div>
              </div>
            </div>

            {/* Right Panel */}
            <div className="w-96 bg-white border-l border-gray-200 overflow-y-auto flex-shrink-0">
              <div className="p-6">
                {/* Selected Region Header */}
                <div className="mb-6">
                  <p className="text-gray-500 text-sm mb-1">Région sélectionnée</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-agri-dark">Dakar</h2>
                      <p className="text-gray-500 text-sm">Capitale du Sénégal</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2">
                        <i className="fas fa-cloud-sun text-yellow-500 text-3xl"></i>
                        <span className="text-4xl font-bold text-gray-800">34.5°C</span>
                      </div>
                      <p className="text-gray-500 text-sm">Ressenti 37.2°C</p>
                    </div>
                  </div>
                </div>

                {/* Weather Metrics */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div className="border border-gray-200 rounded-lg p-3 text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <i className="fas fa-thermometer-half text-red-500"></i>
                      <span className="text-xs text-gray-500">Température</span>
                    </div>
                    <span className="text-lg font-bold text-gray-800">34.5°C</span>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-3 text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <i className="fas fa-tint text-blue-500"></i>
                      <span className="text-xs text-gray-500">Humidité</span>
                    </div>
                    <span className="text-lg font-bold text-gray-800">72%</span>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-3 text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <i className="fas fa-wind text-teal-500"></i>
                      <span className="text-xs text-gray-500">Vent</span>
                    </div>
                    <span className="text-lg font-bold text-gray-800">18 km/h</span>
                    <p className="text-[10px] text-gray-500">Nord-Ouest</p>
                  </div>
                </div>

                {/* Risk Index */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-800">Indice de risque climatique</span>
                      <i className="fas fa-info-circle text-gray-400 text-sm"></i>
                    </div>
                    <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">Risque élevé</span>
                  </div>

                  {/* Gauge */}
                  <div className="flex justify-center mb-2">
                    <div className="gauge-container">
                      <div className="gauge-bg"></div>
                      <div className="gauge-needle"></div>
                      <div className="gauge-center">
                        <span className="text-3xl font-bold text-gray-800">85</span>
                        <span className="text-gray-500 text-sm">/100</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-center text-sm font-medium text-gray-700 mb-1">Risque de canicule élevé</p>
                  <p className="text-center text-xs text-gray-500">Limitez les travaux en plein champ entre 12h et 16h.</p>
                </div>

                {/* 7-Day Chart */}
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
                    {/* Grid lines */}
                    <div className="absolute left-0 right-0 top-0 border-t border-gray-100"></div>
                    <div className="absolute left-0 right-0 top-1/3 border-t border-gray-100"></div>
                    <div className="absolute left-0 right-0 top-2/3 border-t border-gray-100"></div>

                    {/* Temperature Line */}
                    <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                      <polyline
                        points="20,80 70,60 120,90 170,50 220,100 270,70 320,85"
                        fill="none"
                        stroke="#4caf50"
                        strokeWidth="2"
                      />
                      {/* Points */}
                      <circle cx="20" cy="80" r="3" fill="#4caf50" />
                      <circle cx="70" cy="60" r="3" fill="#4caf50" />
                      <circle cx="120" cy="90" r="3" fill="#4caf50" />
                      <circle cx="170" cy="50" r="3" fill="#4caf50" />
                      <circle cx="220" cy="100" r="3" fill="#4caf50" />
                      <circle cx="270" cy="70" r="3" fill="#4caf50" />
                      <circle cx="320" cy="85" r="3" fill="#4caf50" />

                      {/* Humidity Line */}
                      <polyline
                        points="20,50 70,70 120,40 170,60 220,30 270,55 320,45"
                        fill="none"
                        stroke="#2196f3"
                        strokeWidth="2"
                      />
                      <circle cx="20" cy="50" r="3" fill="#2196f3" />
                      <circle cx="70" cy="70" r="3" fill="#2196f3" />
                      <circle cx="120" cy="40" r="3" fill="#2196f3" />
                      <circle cx="170" cy="60" r="3" fill="#2196f3" />
                      <circle cx="220" cy="30" r="3" fill="#2196f3" />
                      <circle cx="270" cy="55" r="3" fill="#2196f3" />
                      <circle cx="320" cy="45" r="3" fill="#2196f3" />
                    </svg>

                    {/* Y-axis labels */}
                    <div className="absolute -left-8 top-0 text-[10px] text-gray-500">40°C</div>
                    <div className="absolute -left-8 top-1/3 text-[10px] text-gray-500">35°C</div>
                    <div className="absolute -left-8 top-2/3 text-[10px] text-gray-500">30°C</div>
                    <div className="absolute -left-8 bottom-0 text-[10px] text-gray-500">25°C</div>
                    <div className="absolute -left-16 top-0 text-[10px] text-gray-500">100%</div>
                    <div className="absolute -left-16 top-1/3 text-[10px] text-gray-500">75%</div>
                    <div className="absolute -left-16 top-2/3 text-[10px] text-gray-500">50%</div>
                    <div className="absolute -left-16 bottom-0 text-[10px] text-gray-500">25%</div>
                  </div>
                  {/* X-axis labels */}
                  <div className="flex justify-between mt-1 px-4 text-[10px] text-gray-500">
                    <span>13/06</span>
                    <span>14/06</span>
                    <span>15/06</span>
                    <span>16/06</span>
                    <span>17/06</span>
                    <span>18/06</span>
                    <span>19/06</span>
                  </div>
                </div>

                {/* Agricultural Advice */}
                <div className="bg-agri-light rounded-lg p-4 border border-green-200">
                  <div className="flex items-start gap-3">
                    <i className="fas fa-seedling text-agri-green text-xl mt-1"></i>
                    <div>
                      <h4 className="font-semibold text-agri-dark mb-1">Conseil agricole</h4>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        Les conditions sont favorables à l'irrigation le matin ou en soirée.
                        Surveillez l'hydratation des cultures.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Stats */}
          <div className="bg-agri-dark text-white px-6 py-4 flex-shrink-0">
            <div className="grid grid-cols-4 gap-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center">
                  <i className="fas fa-sun text-yellow-400 text-lg"></i>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Alerte en cours</p>
                  <p className="font-semibold">0 alerte</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <i className="fas fa-cloud-rain text-blue-400 text-lg"></i>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Saison des pluies</p>
                  <p className="font-semibold">Juil. - Oct.</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                  <i className="fas fa-seedling text-green-400 text-lg"></i>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Culture principale</p>
                  <p className="font-semibold">Mil, Maïs, Arachide</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <i className="fas fa-users text-purple-400 text-lg"></i>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Utilisateurs</p>
                  <p className="font-semibold">2,541 agriculteurs</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;