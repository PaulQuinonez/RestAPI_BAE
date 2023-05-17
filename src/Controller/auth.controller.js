const { response } = require('express');
const Users = require('../Models/users.model');
const { generarJsonWebToken } = require('../Helpers/JWToken')
const bcrypt = require('bcrypt');
const Person = require('../Models/person.model');


const registroUser = async (req, res = response) => {
    const { username, email, password } = req.body;

    try {
        const salt = bcrypt.genSaltSync();
        const pass = bcrypt.hashSync(password, salt);

        const person = new Person({
            firstName: username
        });

        const persondb = await person.save();

        const user = new Users({
            users: username,
            email: email,
            password: pass,
            person_id: persondb._id
        });

        const userdb = await user.save();

        res.json({
            resp: true,
            msj: 'Usuario ' + userdb.users + ' creado exitosamente!',
        });
    } catch (err) {
        return res.status(400).json({
            resp: false,
            msj: 'Error al insertar datos person',
            err
        });
    }
};

const LoginUser = async (req, res = response) => {
    const { email, password } = req.body;

    try {
        const usersdb = await Users.findOne({ email: email });

        if (!usersdb) {
            return res.status(400).json({
                resp: false,
                msj: 'Credenciales incorrectas'
            });
        }

        if (!bcrypt.compareSync(password, usersdb.password)) {
            return res.status(400).json({
                resp: false,
                msj: 'Credenciales incorrectas'
            });
        }

        let token = await generarJsonWebToken(usersdb.person_id);

        res.json({
            resp: true,
            msj: 'Bienvenido a Sopresas BAE',
            users: { 'id': usersdb.person_id, 'email': usersdb.email, 'users': usersdb.users, 'profile': usersdb.image },
            token: token
        });
    } catch (err) {
        return res.status(500).json({
            resp: false,
            msj: 'Error en el login',
            err
        });
    }
};

const RenweToken = async (req, res = response) => {
    const uid = req.uid;

    try {
        const token = await generarJsonWebToken(uid);
        const usersdb = await Users.findOne({ person_id: uid });

        console.log(usersdb);

        res.json({
            resp: true,
            msj: 'Bienvenido a Sopresas BAE',
            users: { 'id': usersdb.person_id, 'email': usersdb.email, 'users': usersdb.users, 'profile': usersdb.image },
            token: token
        });
    } catch (err) {
        return res.status(500).json({
            resp: false,
            msj: 'Error renew en el login',
            err
        });
    }
};

module.exports = {
    registroUser,
    LoginUser,
    RenweToken
};