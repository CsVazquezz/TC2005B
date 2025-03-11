const express = require("express");
const router = express.Router();
const path = require("path");

// Main route to display the home page
router.get("/", (req, res, next) => {
  res.send(`
    <html>
      <head>
        <title>Main Page</title>
      </head>
      <body>
        <h1>Main Page</h1>
        <button onclick="window.location.href='/products/all'">Ver Productos</button>
        <button onclick="window.location.href='/users/all'">Ver Usuarios</button>
      </body>
    </html>
  `);
});

module.exports = router;
