const { Router } = require('express');
const app = Router();

const userRoute = require('../routes/user.route');

app.use('/user', userRoute);

module.exports = app;