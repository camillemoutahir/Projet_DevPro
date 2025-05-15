
# Projet_DevPro : Application de gestion de fleurs et de plantes

Cette application est composée de deux microservices backend (fleurs et plantes) et d'un frontend Angular pour l'interface utilisateur. Chaque microservice utilise une base de données PostgreSQL, et le tout est orchestré avec Docker Compose.

## Démarrage
### Backend (fleurs et plantes)

Lance les deux microservices ainsi que leurs bases de données avec la commande suivante :

```bash
docker-compose up -d --build
```

- Microservice Fleurs accessible sur : [http://localhost:3001/api/flowers](http://localhost:3001/api/flowers)  
- Microservice Plantes accessible sur :
  - [http://localhost:3002/api/plants](http://localhost:3002/api/plants)
  - [http://localhost:3002/api/plants/plant-types](http://localhost:3002/api/plants/plant-types)

Chaque microservice dispose de sa propre base de données PostgreSQL, initialisée automatiquement.

### Frontend (Angular)

```bash
cd frontend
ng serve
```

L'interface sera disponible sur [http://localhost:4200](http://localhost:4200)

## Fonctionnalités

### Microservice Fleurs
Gère une collection de fleurs avec les opérations suivantes :
- Ajouter une fleur (nom, image (URL), description)
- Supprimer une fleur

### Microservice Plantes
Gère un carnet d'entretien de plantes :
- Ajouter une plante (nom, type, date du dernier arrosage, notes)
- Affichage automatique des jours restants avant le prochain arrosage (ou "à arroser aujourd'hui")
- Supprimer une plante


## Conteneur Traefik (Pour Monsieur MontMoulinex)

Le projet inclut un conteneur **Traefik** en reverse proxy avec dashboard intégré.

- Voir le trafic sur : [http://localhost:8080/dashboard/#/](http://localhost:8080/dashboard/#/)
- Accès aux APIs via HTTPS :
  - [https://flowers.localtest.me/api/flowers](https://flowers.localtest.me/api/flowers)
  - [https://plants.localtest.me/api/plants/plant-types](https://plants.localtest.me/api/plants/plant-types)

⚠️ Vous devez avoir un certificat auto-signé configuré pour que ces liens HTTPS fonctionnent correctement en local.


## Technologies

- Angular (frontend)
- Node.js / Express (backend)
- PostgreSQL (base de données)
- Docker + Docker Compose
- Traefik (reverse proxy)

## Structure du projet

```
├── backend1/             # Microservice Fleurs
├── backend2/             # Microservice Plantes
├── frontend/             # Interface utilisateur Angular
├── docker-compose.yml
└── traefik.yml           # Configuration Traefik
```

## Auteur

- Camille Moutahir


