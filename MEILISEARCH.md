# Intégration Meilisearch dans API NOMU

## Description

Meilisearch est intégré dans l'API NOMU pour fournir des fonctionnalités de recherche rapides et performantes sur les utilisateurs et les locaux.

## Configuration

### Variables d'environnement

Les variables suivantes ont été ajoutées au fichier `.env` :

```env
MEILI_HOST=http://localhost:7700
MEILI_API_KEY=MySecretMasterKey123
```

### Docker

Le service Meilisearch est configuré dans `docker-compose.yml` :
- Port: 7700
- Clé master: MySecretMasterKey123
- Volume de données: ./data.ms

## Endpoints disponibles

### Recherche de locaux

#### GET /api/locals
Récupère tous les locaux indexés

#### POST /api/locals
Indexe des nouveaux locaux
```json
{
  "id": 1,
  "name": "Local Name",
  "description": "Description",
  "address": "Address"
}
```

#### GET /api/locals/search?q=query
Recherche des locaux par mots-clés
- Paramètre: `q` (query string)

### Recherche d'utilisateurs

#### POST /api/users/index
Indexe des utilisateurs dans Meilisearch
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "role": "user",
  "location": "Paris",
  "bio": "Bio description"
}
```

#### GET /api/users/search?q=query
Recherche des utilisateurs par mots-clés
- Paramètre: `q` (query string)

## Structure des fichiers

```
src/
├── config/
│   └── meilisearch.js       # Configuration du client Meilisearch
├── services/
│   ├── meiliService.js      # Service pour la recherche de locaux
│   └── meiliUserService.js  # Service pour la recherche d'utilisateurs
├── controllers/
│   ├── localsController.js      # Contrôleur pour les locaux
│   └── userSearchController.js  # Contrôleur pour la recherche d'utilisateurs
└── routes/
    ├── localsRoutes.js          # Routes pour les locaux
    └── userSearchRoutes.js      # Routes pour la recherche d'utilisateurs
```

## Utilisation avec Docker

Pour démarrer tous les services (API, Meilisearch, PostgreSQL) :

```bash
docker-compose up -d
```

Pour arrêter les services :

```bash
docker-compose down
```

## Accès à l'interface Meilisearch

L'interface web de Meilisearch est accessible à l'adresse :
- URL: http://localhost:7700
- Clé API: MySecretMasterKey123

## Migration depuis api_nomu-1

Tous les éléments liés à Meilisearch ont été migrés depuis `api_nomu-1` :
- Configuration
- Services
- Contrôleurs
- Routes
- Configuration Docker
