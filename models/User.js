// userModel.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true }, // Le champ 'username' est requis et unique
  password: { type: String, required: true },
  profileImage: { type: String, sparse: true }, // Le champ 'imageProfil' n'est pas requis

});

const User = mongoose.model('User', userSchema);

module.exports = User;
