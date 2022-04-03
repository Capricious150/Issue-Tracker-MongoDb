// Starting with my server! This represents the first line of code of my first personal project
// Annnd I'm going to start with some boring old dependencies and boilerplate
const express = require('express')
const app = express();
const routes = require('./controllers')
const db = require('./config/connection')
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

// Start server
db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
    });
  });