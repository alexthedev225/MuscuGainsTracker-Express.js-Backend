// routes/entraînements.js

const express = require("express");
const router = express.Router();
const entrainementController = require("../controllers/entrainementController");
const auth = require("../middleware/auth");

// Endpoint pour enregistrer un entraînement
router.get("/", auth, entrainementController.getDernieresPerformances);
router.post(
  "/enregistrements",
  auth,
  entrainementController.enregistrerEntrainement
);

module.exports = router;
