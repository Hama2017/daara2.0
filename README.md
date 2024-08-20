# DAARA 2.0 (Takku Ligueyy Tech)

![Daara2.0 Logo](https://i.ibb.co/rcjjB7Z/Logo-Daara2-0.png) <!-- Remplacez 'path_to_logo.png' par le chemin réel du logo de Daara2.0 -->

## Description du Projet

**DAARA 2.0** est une plateforme innovante conçue pour moderniser la gestion des **DAARAS**, ces écoles traditionnelles qui jouent un rôle fondamental dans le système éducatif. Ce projet vise à fournir un ensemble d'outils intégrés pour faciliter la gestion quotidienne des DAARAS, incluant la gestion des inscriptions, des cours, du personnel, des logements, et bien d'autres aspects critiques.

### Fonctionnalités Principales

- **Gestion des Inscriptions** : Simplification du processus d'inscription pour les apprenants, avec un suivi détaillé de chaque étape.
- **Suivi des Paiements** : Suivi précis des paiements, garantissant une gestion financière efficace.
- **Gestion du Personnel** : Administration centralisée des enseignants et du personnel, avec des fonctionnalités de suivi des performances.
- **Gestion des Ressources** : Administration des ressources essentielles comme les logements, la nourriture, et les soins de santé des élèves.
- **Suivi des Performances** : Outils de suivi pour évaluer les performances académiques des élèves et intégrer des programmes éducatifs modernes, comme le curriculum français.

## Impacts pour l'État

**DAARA 2.0** offre plusieurs avantages significatifs pour l'État dans sa quête de formalisation et de modernisation des DAARAS :

- **Maîtrise des Chiffres** : Vue d'ensemble précise sur le nombre d'apprenants, le nombre de DAARAS, et leur répartition géographique, facilitant ainsi la prise de décisions éclairées.
- **Identification des Besoins** : Détection des DAARAS nécessitant le plus de soutien, que ce soit en termes de matériel, de soins de santé, ou d'autres besoins essentiels.
- **Suivi et Transparence** : Suivi centralisé des progrès des élèves et de l'efficacité des enseignements, garantissant une meilleure transparence dans la gestion des DAARAS.

## Objectifs du Projet

L'objectif principal de **DAARA 2.0** est de contribuer à la modernisation des DAARAS tout en offrant à l'État un outil puissant pour une meilleure gouvernance et allocation des ressources. Cela inclut :

- **Amélioration du Système Éducatif** : Modernisation de l'enseignement traditionnel en intégrant des méthodes et outils modernes.
- **Optimisation de la Gestion** : Centralisation de toutes les opérations de gestion pour améliorer l'efficacité et la transparence.
- **Soutien aux DAARAS** : Faciliter l'accès aux ressources nécessaires pour le bon fonctionnement des DAARAS et améliorer les conditions de vie des apprenants.

## Technologies Utilisées

- **Backend** : [Laravel 10.0](https://laravel.com/)
- **Frontend** : [Angular 16.0](https://angular.io/)
- **Base de Données** : PostgreSQL
- **Serveur** : Apache/Nginx
- **Gestion des Dépendances** : Composer pour PHP, npm pour Node.js

## Installation

### Prérequis

- PHP 8.1 ou supérieur
- Node.js 16.x ou supérieur
- Composer
- MySQL
- Angular CLI 16.0

### Étapes d'Initialisation du Projet

Cloner le dépôt :

    Utilisez la commande suivante pour cloner le dépôt GitHub et accéder au répertoire du projet :

```bash

git clone https://github.com/votre-utilisateur/daara2.0.git
cd daara2.0
bash
Installation des dépendances Backend :

    Accédez au répertoire backend et installez les dépendances PHP en utilisant Composer :

bash

cd backend
composer install

    Copiez le fichier d'exemple .env pour créer un nouveau fichier .env :

bash

cp .env.example .env

    Générez la clé d'application Laravel :

bash

php artisan key:generate

Configuration de l'environnement :

    Ouvrez le fichier .env dans un éditeur de texte et configurez les paramètres de votre base de données PostgreSQL. Par exemple :

    plaintext

    DB_CONNECTION=pgsql
    DB_HOST=127.0.0.1
    DB_PORT=5432
    DB_DATABASE=daara2_0
    DB_USERNAME=your_username
    DB_PASSWORD=your_password

Migrer la base de données :

    Exécutez la commande suivante pour migrer la base de données :

bash

php artisan migrate

Installation des dépendances Frontend :

    Accédez au répertoire frontend et installez les dépendances Node.js en utilisant npm :

bash

cd ../frontend
npm install

Lancer le serveur de développement Backend :

    Retournez au répertoire backend et lancez le serveur Laravel :

bash

cd ../backend
php artisan serve

Lancer le serveur de développement Frontend :

    Accédez au répertoire frontend et lancez le serveur de développement Angular :

bash

    cd ../frontend
    ng serve

Vous pouvez maintenant accéder à l'application via votre navigateur web. Le backend fonctionne par défaut sur http://127.0.0.1:8000, et le frontend sur http://127.0.0.1:4200.



