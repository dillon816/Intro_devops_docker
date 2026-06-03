# Todo API — Cours DevOps IPSSI

API REST de gestion de tâches dockerisée avec Node.js et PostgreSQL.

## Stack technique

- **Runtime** : Node.js 18 (Alpine)
- **Framework** : Express.js
- **Base de données** : PostgreSQL 15
- **Conteneurisation** : Docker + Docker Compose

## Lancer le projet

```bash
# 1. Cloner et aller dans le dossier
git clone <url> && cd projet-docker

# 2. Copier les variables d'environnement
cp .env.example .env

# 3. Lancer la stack complète
docker compose up --build

# L'API est disponible sur http://localhost:3000
```

## Commandes utiles

```bash
docker compose up -d          # Lancer en arrière-plan
docker compose down           # Stopper (données conservées)
docker compose down -v        # Stopper ET supprimer les volumes (reset DB)
docker compose logs -f api    # Voir les logs de l'API en temps réel
docker compose ps             # État des services
```

## Endpoints

| Méthode | Route             | Description             |
|---------|-------------------|-------------------------|
| GET     | /health           | Health check            |
| GET     | /api/tasks        | Lister toutes les tâches|
| GET     | /api/tasks/:id    | Récupérer une tâche     |
| POST    | /api/tasks        | Créer une tâche         |
| PUT     | /api/tasks/:id    | Modifier une tâche      |
| DELETE  | /api/tasks/:id    | Supprimer une tâche     |

## Modèle de données

```json
{
  "id": "uuid",
  "title": "string (optionnel)",
  "description": "string (obligatoire)",
  "status": "todo | in_progress | done",
  "created_at": "timestamp",
  "updated_at": "timestamp"
}
```

## Exemple d'utilisation

```bash
# Créer une tâche
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Ma tâche","description":"À faire aujourd'\''hui","status":"todo"}'

# Lister les tâches
curl http://localhost:3000/api/tasks

# Mettre à jour le status
curl -X PUT http://localhost:3000/api/tasks/<id> \
  -H "Content-Type: application/json" \
  -d '{"status":"done"}'

# Supprimer
curl -X DELETE http://localhost:3000/api/tasks/<id>
```

## Tests

```bash
npm run test:unit         # Tests unitaires (sans DB)
npm run test:integration  # Tests d'intégration (DB requise)
```

## Gestion Agile

Tâches suivies via GitHub Issues / Projects (Kanban).
