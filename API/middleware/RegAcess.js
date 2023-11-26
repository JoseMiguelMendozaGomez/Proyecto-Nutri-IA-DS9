const fs = require('fs');

const RegAcess = (req, res, next) => {
  const currentTime = new Date().toISOString();
  const logMessage = `${currentTime} - Headers: ${req.rawHeaders.join(', ')}\n`;

  fs.appendFile('access.log', logMessage, (err) => {
    if (err) {
      console.error('Error written access.log', err);
    }
  });

  next();
};

module.exports = RegAcess;