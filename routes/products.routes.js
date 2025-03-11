const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");

// Route to display all products
router.get("/all", (req, res, next) => {
  res.send("Aquí se mostrarán todos los productos");
});

// Route to display a specific product
router.get("/:productId", (req, res, next) => {
  const productId = req.params.productId;
  res.send(`Detalles del producto con ID: ${productId}`);
});

// Route to add a new product
router.post("/add", (req, res, next) => {
  const productName = req.body.productName;
  const filePath = path.join(__dirname, "../data/products.txt");
  fs.appendFile(filePath, productName + "\n", (err) => {
    if (err) {
      return res.status(500).send("Error al guardar el producto");
    }
    res.send("Producto agregado correctamente");
  });
});

module.exports = router;
