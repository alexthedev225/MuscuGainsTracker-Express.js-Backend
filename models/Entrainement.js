const mongoose = require('mongoose');

const EntrainementSchema = new mongoose.Schema({
  exercice: String,
  poids: String,
  repetitions: String,
  date: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Référence au modèle User
    required: true,
  },
});

const Entrainement = mongoose.model('Entrainement', EntrainementSchema);

module.exports = Entrainement;
