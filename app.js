const express = require("express");
const bodyParser = require("body-parser");
const app = express();

// Import routes
const productsRoutes = require("./routes/products.routes");
const usersRoutes = require("./routes/users.routes");
const mainRoutes = require("./routes/main.routes");

// Middleware to log requests
app.use((request, response, next) => {
  console.log("Middleware!");
  next(); // Send petition to go to next middleware
});

// Middleware to send a response
app.use((request, response, next) => {
  console.log("Otro middleware!");
  response.send("¡Hola mundo!"); // Send the response
});

// Middleware to parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.use("/products", productsRoutes); // Routes for products
app.use("/users", usersRoutes); // Routes for users
app.use("/", mainRoutes); // Main routes

// Middleware to handle 404 errors
app.use((request, response, next) => {
  response.status(404).send("Página no encontrada");
});

// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
