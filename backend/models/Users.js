const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    user_type: {
        type: String,
        default: 'normal'
    },
    profilePhoto: {
        type: String,
        default: "https://cdn-icons-png.flaticon.com/128/3033/3033143.png"
    }
});

module.exports = mongoose.model('User', userSchema);