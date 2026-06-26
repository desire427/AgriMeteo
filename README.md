#  AgriMétéo Sénégal - Plateforme de Monitoring Climatique Agricole

##  Présentation du projet

AgriMétéo Sénégal est une plateforme web développée en React permettant la surveillance météorologique des 14 régions du Sénégal. Son objectif est d'aider les agriculteurs, coopératives et autorités locales à anticiper les risques climatiques grâce à des données météorologiques en temps réel et à un système d'analyse prédictive.

Cette solution transforme les données météorologiques en informations décisionnelles afin de favoriser une gestion proactive des activités agricoles.

---

# Objectifs

* Visualiser les 14 régions du Sénégal via une carte interactive.
* Consulter les conditions météorologiques en temps réel.
* Simuler l'évolution climatique des 7 derniers jours.
* Évaluer automatiquement les risques agricoles liés aux conditions météorologiques.
* Fournir une interface intuitive, responsive et accessible.

---

#  Technologies utilisées

## Frontend

* React.js
* Vite
* JavaScript ES6+
* Tailwind CSS
* Recharts
* React Icons

## API

* OpenWeatherMap API

## Outils

* Git & GitHub
* Figma (Conception UI/UX)
* VS Code

---

# Architecture du projet

```bash
# Architecture du projet

```bash
AGRIMETEO/
│
├── public/
│
├── src/
│   │
│   ├── assets/
│   │   └── (images, icônes, fichiers SVG)
│   │
│   ├── composants/
│   │   ├── SenegalMap.jsx
│   │   ├── WeatherPanel.jsx
│   │   ├── WeatherChart.jsx
│   │   ├── RiskBadge.jsx
│   │   └── Loader.jsx
│   │
│   ├── hooks/
│   │   └── (hooks personnalisés React)
│   │
│   ├── services/
│   │   └── weatherService.js
│   │
│   ├── utils/
│   │   ├── calculateRisk.js
│   │   ├── generateHistory.js
│   │   └── helpers.js
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── .env
├── .env.example
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

## Description des dossiers

###  assets

Contient les ressources statiques du projet :

* Carte SVG du Sénégal
* Icônes météo
* Images et illustrations

###  composants

Contient tous les composants React réutilisables de l'application :

* Carte interactive
* Dashboard météo
* Graphique climatique
* Badge de risque
* Composants de chargement

###  hooks

Contient les hooks React personnalisés permettant de centraliser la logique métier et la gestion des états.

###  services

Contient les fonctions responsables des appels API :

* Connexion à OpenWeatherMap
* Traitement des réponses API
* Gestion des erreurs réseau

###  utils

Contient les fonctions utilitaires :

* Calcul de l'indice de risque
* Génération des données historiques simulées
* Fonctions auxiliaires

###  App.jsx

Composant principal de l'application.

###  main.jsx

Point d'entrée React de l'application.

###  .env

Variables d'environnement contenant les clés API.

###  .env.example

Exemple de configuration pour faciliter le déploiement du projet.

```

---

#  Fonctionnalités principales

## 1. Carte Interactive

La carte SVG du Sénégal contient les 14 régions administratives :

* Dakar
* Thiès
* Diourbel
* Fatick
* Kaolack
* Kaffrine
* Louga
* Saint-Louis
* Matam
* Tambacounda
* Kédougou
* Kolda
* Sédhiou
* Ziguinchor

### Comportements

* Survol → changement de couleur.
* Clic → sélection persistante.
* Responsive grâce à l'utilisation du `viewBox`.
* Mise à jour automatique des données météo.

---

## 2. Géolocalisation

Au chargement :

1. Demande d'autorisation de localisation.
2. Si acceptée :

   * récupération des coordonnées GPS.
   * correspondance avec une région du Sénégal.
3. Si refusée ou hors Sénégal :

   * chargement automatique de Dakar.

---

## 3. Données météorologiques en temps réel

Les données sont récupérées depuis OpenWeatherMap :

### Informations affichées

* Nom de la région
* Température (°C)
* Humidité (%)
* Conditions météo
* Icône dynamique

---

## 4. Dashboard Contextuel

Après sélection d'une région :

* apparition d'un panneau latéral animé
* animation Slide-In (200ms)
* affichage des données météo
* affichage du niveau de risque

---

## 5. Analyse Prédictive

Les APIs gratuites ne fournissant pas toujours l'historique météo, une simulation cohérente est générée.

### Principe

À partir de la température actuelle :

```javascript
Température simulée = Température actuelle ± 3°C
```

Exemple :

```javascript
31°C
29°C
30°C
33°C
32°C
28°C
31°C
```

Les données sont affichées sous forme de graphique dynamique avec Recharts.

---

#  Algorithme d'Indice de Risque

## Fonction métier

```javascript
calculateRisk(temp, humidity)
```

### Retour

```javascript
{
  score: number,
  label: string,
  color: string
}
```

---

## Logique utilisée

### Risque Faible

Conditions :

```javascript
temp < 30
humidity < 60
```

Résultat :

```javascript
{
 score: 25,
 label: "Risque Faible",
 color: "#22C55E"
}
```

---

### Risque Modéré

Conditions :

```javascript
temp >= 30 && temp <= 38
```

Résultat :

```javascript
{
 score: 55,
 label: "Risque Modéré",
 color: "#F59E0B"
}
```

---

### Risque Élevé

Conditions :

```javascript
temp > 38 && humidity > 60
```

Résultat :

```javascript
{
 score: 85,
 label: "Risque Canicule Élevé",
 color: "#FF4500"
}
```

---

## Justification métier

Une température très élevée combinée à une forte humidité augmente :

* le stress hydrique des cultures ;
* les risques de maladies végétales ;
* les pertes de rendement.

L'indice permet donc d'alerter rapidement les acteurs agricoles.

---

#  Utilisation potentielle d'un LLM

Dans une version avancée, un modèle de langage (LLM) pourrait être intégré afin de :

* Générer des recommandations agricoles personnalisées.
* Produire des alertes intelligentes.
* Expliquer les risques climatiques en langage naturel.
* Suggérer des actions préventives adaptées aux cultures.

### Exemple

Entrée :

```text
Température : 40°C
Humidité : 72%
```

Sortie :

```text
Risque climatique élevé détecté.
Il est recommandé d'augmenter l'irrigation et de surveiller les cultures sensibles à la chaleur.
```

---

# Gestion des erreurs

## Chargement

Pendant la récupération des données :

* Spinner de chargement
* Skeleton UI

---

## Erreurs API

En cas d'échec :

```text
Impossible de récupérer les données météorologiques.
Veuillez réessayer ultérieurement.
```

L'application continue de fonctionner sans crash.

---

#  Variables d'environnement

Créer un fichier :

```bash
.env
```

Ajouter :

```env
VITE_OPENWEATHER_API_KEY=votre_cle_api
```

Utilisation :

```javascript
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
```

---

# Installation

## Cloner le projet

```bash
git clone https://github.com/votre-compte/agri-meteo-senegal.git
```

## Installer les dépendances

```bash
npm install
```

## Lancer le projet

```bash
npm run dev
```

---

# Responsive Design

L'application est optimisée pour :

* Mobile
* Tablette
* Desktop

---

#  Améliorations futures

* Prévisions météo sur 7 jours.
* Notifications SMS pour les agriculteurs.
* Intégration IA prédictive avancée.
* Historique réel des données climatiques.
* Tableau de bord national des alertes.

---

#  Auteur

Projet réalisé dans le cadre du développement d'une plateforme de résilience agricole pour le Sénégal.

Développé avec React, OpenWeatherMap et Recharts.
