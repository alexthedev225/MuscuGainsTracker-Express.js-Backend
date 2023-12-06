const Entrainement = require('../models/Entrainement');

exports.enregistrerEntrainement = async (req, res) => {
  const { exercice, poids, repetitions, date } = req.body;

  // Validation des données
  if (!exercice || !poids || !repetitions || !date) {
    return res.status(400).json({ message: 'Tous les champs sont obligatoires.' });
  }

  try {
    // Extrait userId à partir de la requête authentifiée
    const userId = req.auth.userId;

    // Enregistrement de l'entraînement dans la base de données avec l'ID de l'utilisateur
    const nouvelEntrainement = await Entrainement.create({
      exercice,
      poids,
      repetitions,
      date,
      userId, // Ajoute l'ID de l'utilisateur à l'entraînement
    });

    res.status(201).json(nouvelEntrainement);
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement de l\'entraînement :', error);
    res.status(500).json({ message: 'Erreur serveur lors de l\'enregistrement.' });
  }
};

exports.getDernieresPerformances = async (req, res) => {
  try {
    // Récupère les dernières performances depuis la base de données
    const dernieresPerformances = await Entrainement.find({ userId: req.auth.userId }); // Ajoute la condition pour filtrer par utilisateur

    res.json({ dernieresPerformances });
  } catch (error) {
    console.error('Erreur lors de la récupération des dernières performances :', error);
    res.status(500).json({ error: 'Erreur serveur lors de la récupération des données.' });
  }
};
