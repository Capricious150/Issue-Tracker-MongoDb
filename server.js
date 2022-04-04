// Starting with my server! This represents the first line of code of my first personal project
// Annnd I'm going to start with some boring old dependencies and boilerplate
const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const hbs = exphbs.create();
const app = express();
const routes = require('./controllers');
const db = require('./config/connection');
const PORT = process.env.PORT || 3001;

// Middleware
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);

// Start server
db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
    });
  });