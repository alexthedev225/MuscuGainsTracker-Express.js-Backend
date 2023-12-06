// index.js
const path = require('path')
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const entrainementsRoutes = require('./routes/entrainements');
const userRoutes = require('./routes/user');
const multer = require('multer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Configurer le stockage des images avec Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const upload = multer({ storage: storage });
// Routes (à ajouter plus tard)

// Connexion à MongoDB
mongoose.connect(process.env.MONGODB_URI)

// Vérification de la connexion à MongoDB
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

// Utilise les routes définies dans entrainements
app.use('/api/entrainement', entrainementsRoutes);

// Utilise les routes définies dans user
app.use('/api/users', upload.single('profileImage'), userRoutes);


// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
