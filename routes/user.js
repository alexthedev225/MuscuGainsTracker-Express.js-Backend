// userRoutes.js
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

// Route pour l'inscription d'un nouvel utilisateur
router.post('/signup', UserController.signup);

// Route pour la connexion d'un utilisateur
router.post('/login', UserController.login);

// Autres routes liées à la gestion des utilisateurs...

module.exports = router;
