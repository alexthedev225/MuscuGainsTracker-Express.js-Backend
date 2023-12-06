// userController.js
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config()

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY
const UserController = {
  signup: async (req, res) => {
    try {
      const { username, password } = req.body;

      // Vérifier si l'utilisateur existe déjà
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res
          .status(400)
          .json({ message: "Cet utilisateur existe déjà." });
      }

      // Vérifier si une image a été téléchargée
      const profileImage = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

      // Hasher le mot de passe
      const hashedPassword = await bcrypt.hash(password, 10);

      // Créer un nouvel utilisateur avec l'image de profil
      const newUser = new User({
        username,
        password: hashedPassword,
        profileImage,
      });

      // Enregistrer l'utilisateur dans la base de données
      await newUser.save();

      res.status(201).json({ message: "Utilisateur enregistré avec succès." });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Une erreur est survenue lors de l'inscription." });
    }
  },

  login: async (req, res) => {
    try {
      const { username, password } = req.body;

      // Vérifier si l'utilisateur existe
      const user = await User.findOne({ username });
      if (!user) {
        return res
          .status(401)
          .json({ message: "Nom d'utilisateur ou mot de passe incorrect." });
      }

      // Vérifier le mot de passe
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res
          .status(401)
          .json({ message: "Nom d'utilisateur ou mot de passe incorrect." });
      }

      // Générer un jeton JWT
      const token = jwt.sign({ userId: user._id }, JWT_SECRET_KEY, {
        expiresIn: "24h",
      });

      res.status(200).json({
        token,
        userId: user._id,
        username: user.username,
        profileImage: user.profileImage,  // Ajoutez d'autres champs si nécessaire
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Une erreur est survenue lors de la connexion." });
    }
  },

  // Autres fonctions de contrôleur pour la gestion des utilisateurs...
};

module.exports = UserController;
