const { Router } = require('express');
const { validateToken } = require('../Middlewares/ValidateToken');
const {uploadsProfile} = require('../Helpers/multer');
const {userPersonalRegister, getPersonalInformation, changeFotoProfile, updateStreetAddress} = require('../Controller/user.controller');

const api = Router();

api.put('/registro', validateToken, userPersonalRegister);
api.get('/get-info', validateToken, getPersonalInformation);
api.put('/update-direccion', validateToken, updateStreetAddress);
api.put('/update-img', [validateToken, uploadsProfile.single('image')], changeFotoProfile);

module.exports = api