# Procédure de déploiement — Todo API

## 1. Prérequis

- Accès au cluster K3S (fichier kubeconfig dans `~/.kube/config`)
- Variables CI/CD configurées dans GitHub (Settings > Secrets) :
  - `DOCKERHUB_USERNAME` : pseudo DockerHub
  - `DOCKERHUB_TOKEN` : token généré sur DockerHub (Account Settings > Security > Access Tokens)
- Branche `main` à jour et tests verts en local

## 2. Déploiement (nominal)

1. Merger la branche de feature dans `main` via pull request (après review)
2. Le merge déclenche la pipeline automatiquement
3. Suivre la pipeline : GitHub > Actions > CI/CD Pipeline
4. Stages attendus : `test-unit` → `test-integration` → `docker-build` → `docker-push` — tous verts

## 3. Vérification

```bash
kubectl get pods                                  # tous les pods en Running
kubectl rollout status deployment/todo-api        # rollout complete
curl http://<adresse>/health                      # doit répondre {"status":"ok"}
```

Dashboard Grafana : pas de pic d'erreurs (voir screenshot en phase 5)

## 4. Rollback (si le déploiement casse)

> **Prérequis** : kubeconfig dans `~/.kube/config` (sinon : demander à [contact]).

```bash
# 1. Revenir à la version précédente
kubectl rollout undo deployment/todo-api

# 2. Attendre que le rollback soit terminé (ne pas quitter avant ce message)
kubectl rollout status deployment/todo-api
# → attendre "successfully rolled out"

# 3. Vérifier que les pods sont sains
kubectl get pods
# → tous Running, aucun CrashLoopBackOff

# 4. Tester l'endpoint de santé
curl http://<adresse>/health
# → doit répondre {"status":"ok"}

# 5. Vérifier Grafana : le taux d'erreurs 5xx redescend
```

Seulement après ces 5 étapes, prévenir l'équipe : _"prod remontée sur la version N-1, rollback fait à [heure], on regarde la cause demain."_


