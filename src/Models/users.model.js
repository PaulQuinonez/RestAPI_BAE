
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

const usersSchema = new Schema({
    users: {
        type: String,
        required: [true, 'Users es requerido']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Email es requerido']
    },
    password: {
        type: String,
        required: [true, 'Password es requerido']
    },
    token: {
        type: String,
        required: false
    },
    statuss: {
        type: Boolean,
        default: true
    },
    person_id: {
        type: Schema.Types.ObjectId,
        ref : 'person'
    },
    created: {
        type: String,
        required: false
    }

});

usersSchema.plugin( uniqueValidator, { message: '{PATH} Ya existe' });

module.exports = mongoose.model('users', usersSchema);