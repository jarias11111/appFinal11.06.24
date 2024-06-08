const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    created_at: {
        type: String,
        default: Date.now
    }
});

module.exports = mongoose.model('user', userSchema);