import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';  // Maintenant c'est à la racine de src
import TableauDeBord from './composants/pages/TableauDeBord';
import Carte from './composants/pages/Carte';
import Previsions from './composants/pages/Previsions';
import Alertes from './composants/pages/Alertes';
import ConseilsAgricoles from './composants/pages/ConseilsAgricoles';
import Parametres from './composants/pages/Parametres';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TableauDeBord />} />
        <Route path="/tableau-de-bord" element={<TableauDeBord />} />
        <Route path="/carte" element={<Carte />} />
        <Route path="/previsions" element={<Previsions />} />
        <Route path="/alertes" element={<Alertes />} />
        <Route path="/conseils" element={<ConseilsAgricoles />} />
        <Route path="/parametres" element={<Parametres />} />
      </Routes>
    </Router>
  );
}

export default App;