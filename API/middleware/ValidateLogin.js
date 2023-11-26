const express = require('express');
const app = express();

const ValidateLogin = (req, res, next) => {
  var body = req.body;
  if (!body.user || !body.password) 
    return res.status(400).send("Please check your information");
  next();
};

module.exports = ValidateLogin;