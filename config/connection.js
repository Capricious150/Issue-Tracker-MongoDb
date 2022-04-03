// Recycling a connection.js from a class activity. 

const mongoose = require('mongoose');

// Wrap Mongoose around local connection to MongoDB
// TODO - UPDATE DB
mongoose.connect('mongodb://localhost:27017/personalTaskListDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Export connection
module.exports = mongoose.connection;