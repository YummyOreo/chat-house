const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const userSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    githubToken: {
        type: String,
    },
    name: {
        type: String,
        required: true
    },
    rooms: [{
        type: String
    }],
    owned: [{
        type: String
    }],
    banned: [{
        type: String
    }],
    superMod: {
        type: Boolean
    }
});

const User = mongoose.model("Users", userSchema)

module.exports = User;

