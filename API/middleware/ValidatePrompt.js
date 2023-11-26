const express = require('express');
const app = express();

const ValidatePrompt = (req, res, next) => {
  var body = req.body;
  if(!body.message)
    return res.status(400).send('Please check your prompt');
  next();
};

module.exports = ValidatePrompt;