const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/api_chocolate');

mongoose.now('error', () => {
  console.log('Erro na conexão com MongoDB');
});

module.exports = mongoose;
