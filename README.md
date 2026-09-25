# Ancrage

Planificateur de la semaine de travail centré sur aujourd'hui : tâches par jour, mode focus, relances, tags, export et import JSON.

L'application tient dans un seul fichier : [`ancrage.html`](ancrage.html).

## Utilisation

- **En ligne** : publiée comme artefact claude.ai.
- **En local** : ouvrir `ancrage.html` dans un navigateur (double-clic), ou lancer le serveur de test :

  ```bash
  node .claude/serve.js
  ```

  puis ouvrir http://localhost:8766.
- **Comme application** (Chrome, Edge) : depuis http://localhost:8766 ou un hébergement en `https://`, menu du navigateur → « Installer Ancrage ». Le manifeste et les icônes sont dans `manifest.webmanifest` et `icons/`.

Les tâches sont enregistrées dans le stockage local du navigateur. Pour les sauvegarder ou les passer d'un navigateur à l'autre : menu ⋯ → Exporter / Importer (JSON).

## Fonctionnalités

- Vues Adaptatif (autour d'aujourd'hui) et Semaine (lundi–vendredi)
- États : à faire, en cours, en attente, terminé ; compteurs de jours
- Mode focus sur aujourd'hui, barre de progression
- Relances depuis une tâche en attente
- Tags : filtres, couleurs, anciens tags, gestion (renommer, fusionner, supprimer)
- Glisser-déposer, raccourcis clavier, mode sombre
- Export et import JSON

Claudé par Mathieu Ney.
