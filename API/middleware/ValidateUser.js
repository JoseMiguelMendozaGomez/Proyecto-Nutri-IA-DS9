const express = require('express');
const app = express();

const ValidateUser = (req, res, next) => {
  var body = req.body;
  if(!body.user || !body.password || !body.name)
    return res.status(400).send('Please check your information')

  next();
};

module.exports = ValidateUser;