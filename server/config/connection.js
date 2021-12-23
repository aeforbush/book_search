const mongoose = require('mongoose');
const root = require('app-root-path');
const path = require('path');

require('dotenv').config({path:root +path.sep + ".env"});

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/googlebooks', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

module.exports = mongoose.connection;
