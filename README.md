# Nomu - Backend Express + Sequelize + Meilisearch

Ce backend est une API Node.js construite avec Express.js, Sequelize, MySQL, Meilisearch et Docker.
Il permet de gérer les utilisateurs (locaux), de les stocker dans une base MySQL, et de les indexer pour recherche full-text dans Meilisearch.

---

## 📦 Stack Technique

* **Node.js / Express** : Framework backend.
* **Sequelize** : ORM pour MySQL.
* **MySQL 8** : Base de données relationnelle.
* **Meilisearch** : Moteur de recherche ultra rapide et pertinent.
* **Docker / Docker Compose** : Conteneurisation de l’ensemble.
* **phpMyAdmin** : Interface visuelle pour MySQL.

---

## 📁 Arborescence du projet

```bash
.
├── app
│   ├── config
│   │   ├── database.js
│   │   └── meilisearch.js
│   ├── controllers
│   │   ├── localsController.js
│   │   └── usersController.js
│   ├── models
│   │   ├── index.js
│   │   ├── Interet.js
│   │   ├── Profil.js
│   │   └── User.js
│   ├── routes
│   │   ├── localsRoutes.js
│   │   └── usersRoutes.js
│   ├── services
│   │   ├── meiliService.js
│   │   └── meiliUserService.js
│   ├── utils
│   │   └── retryDbConnection.js
│   └── server.js
├── docker-compose.yml
├── Dockerfile
├── package.json
└── .env
```

---

## ⚙️ Configuration de l'environnement

Créer un fichier `.env` à la racine :

```env
PORT=3001
MEILI_HOST=http://meilisearch:7700
MEILI_API_KEY=MySecretMasterKey123
DB_NAME=nomu_db
DB_USER=nomu_user
DB_PASSWORD=nomu_pass
DB_HOST=mysql
```

---

## ▶️ Lancement du projet

### 1. Construire et démarrer l'ensemble des services Docker

```bash
docker compose up --build -d
```

### 2. Suivre les logs de l'API

```bash
docker logs -f express-api
```

### 3. Accès à phpMyAdmin

```txt
http://localhost:8080
Login : nomu_user
Password : nomu_pass
```

---

## 🔗 Endpoints disponibles

### 🔸 Users

| Méthode | Route                  | Description                           |
| ------- | ---------------------- | ------------------------------------- |
| POST    | `/users`               | Créer un user et l'indexer dans Meili |
| GET     | `/users/search?q=term` | Recherche full-text sur les users     |

**Exemple JSON POST /users**

```json
{
  "name": "Jean Martin",
  "email": "jean@nomu.fr",
  "password": "test1234",
  "role": "local",
  "bio": "Amoureux de la randonnée",
  "location": "Annecy"
}
```

### 🔸 Locals (déjà existant)

| Méthode | Route                   | Description                        |
| ------- | ----------------------- | ---------------------------------- |
| POST    | `/locals`               | Ajouter un local à Meilisearch     |
| GET     | `/locals`               | Récupérer les locaux indexés       |
| GET     | `/locals/search?q=term` | Recherche full-text sur les locaux |

---

## 🔍 Fonctionnement de la recherche Meilisearch

### Champs recherchés automatiquement (users)

* `name`
* `email`
* `role`
* `bio`
* `location`

### 🔧 Configuration possible (optionnel)

> (dans `meiliUserService.js`, à rajouter au démarrage)

```js
await index.updateSearchableAttributes(['name', 'location', 'bio']);
await index.updateFilterableAttributes(['role', 'location']);
```

---

## 🐳 docker-compose.yml résumé

```yaml
services:
  mysql:          # Base de données
  meilisearch:    # Moteur de recherche
  phpmyadmin:     # Interface visuelle
  api:            # Backend Express + Sequelize
```

---

## ✍️ À faire / Améliorations futures

* Ajouter JWT et authentification.
* Séparer les rôles (admin, local, etc.).
* Création automatique de l'index Meilisearch avec configuration initiale.
* Tests automatisés.
* Swagger pour documentation d'API.

---

## ✅ Statut actuel

* [x] Base de données MySQL fonctionnelle
* [x] Modèle `User` avec indexation Meilisearch
* [x] CRUD de base sur les users (POST, GET search)
* [x] Dockerisé avec Meilisearch et PhpMyAdmin
* [ ] Authentification sécurisée (à venir)

---
