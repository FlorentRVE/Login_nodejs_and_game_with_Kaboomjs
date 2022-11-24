const express = require('express');
const app = express();
const path = require('path');

//recup route
// const characterRoutes = require('./route/character');
const userRoutes = require('./route/user');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(express.static('images'));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Routes
// app.use('/api/character', characterRoutes);
app.use('/api/user', userRoutes);

module.exports = app;