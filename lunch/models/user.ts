let mongoose = require("mongoose")
let Schema = mongoose.Schema;

let userSchema = new Schema({
    id: {
        type: Number, 
        required: true,
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

let User = mongoose.model("Users", userSchema)

module.exports = User;

