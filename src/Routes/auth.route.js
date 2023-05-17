const { Router } = require('express');
const { check } = require('express-validator');
const {ValidatedAuth} = require('../Middlewares/validateAuth');
const { validateToken } = require('../Middlewares/ValidateToken');
const {registroUser, LoginUser, RenweToken} = require('../Controller/auth.controller');

const api = Router();

api.post('/registro', [
    check('username', 'Username es requerido').not().isEmpty(),
    check('email', 'Email Address es requerido').isEmail(),
    check('password', 'Password es requerido').not().isEmpty(),
    ValidatedAuth
], registroUser);

api.post('/login', [
    check('email', 'Email ID es requerido').isEmail(),
    check('password', 'Password es requerido').not().isEmpty(),
    ValidatedAuth
], LoginUser );
api.get('/login/renew', validateToken, RenweToken);

module.exports = api
