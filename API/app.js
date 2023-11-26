require('dotenv').config()
const express = require('express')
const app = express()
const RegAcess = require('./middleware/RegAcess');

const UserRoutes = require('./routes/UserRoutes')
const ChatGptRoutes= require('./routes/ChatGptRoutes')

app.use(express.json())
app.use(RegAcess)

app.use((_req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
  });

app.use('/user', UserRoutes);
app.use('/chatgpt', ChatGptRoutes)

app.listen(process.env.PORT, ()=>{
    console.log('Listening on port '+process.env.PORT);
});