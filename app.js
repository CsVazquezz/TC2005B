const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const productsRoutes = require("./routes/products.routes");
const usersRoutes = require("./routes/users.routes");
const mainRoutes = require("./routes/main.routes");

// Middleware
app.use((request, response, next) => {
  console.log("Middleware!");
  next(); // Le permite a la petición avanzar hacia el siguiente middleware
});

app.use((request, response, next) => {
  console.log("Otro middleware!");
  response.send("¡Hola mundo!"); // Manda la respuesta
});

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/products", productsRoutes);
app.use("/users", usersRoutes);
app.use("/", mainRoutes);

app.use((request, response, next) => {
  response.status(404).send("Página no encontrada");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
