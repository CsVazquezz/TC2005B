const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");

// Route to display all users
router.get("/all", (req, res, next) => {
  res.send("Aquí se mostrarán todos los usuarios");
});

// Route to display a specific user
router.get("/:userId", (req, res, next) => {
  const userId = req.params.userId;
  res.send(`Detalles del usuario con ID: ${userId}`);
});

// Route to add a new user
router.post("/add", (req, res, next) => {
  const userName = req.body.userName;
  const filePath = path.join(__dirname, "../data/users.txt");
  fs.appendFile(filePath, userName + "\n", (err) => {
    if (err) {
      return res.status(500).send("Error al guardar el usuario");
    }
    res.send("Usuario agregado correctamente");
  });
});

module.exports = router;
