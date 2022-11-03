const {Router}  = require('express');
const { getUsers } = require('../controllers/user.controllers');

const route = Router();

route.get('/', getUsers)


module.exports = route;