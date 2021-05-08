let mongoose = require("mongoose")
let Schema = mongoose.Schema;

let roomSchema = new Schema({
	_id: {
		type: String,
		required: true
	},
    users: {
		type: Object,
		required: true
	},
    owner: {
		type: String,
		required: true
	},
    messages: [{
		type: Number,
		required: true
	}],
    type: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	}
});

let RoomDB = mongoose.model("Rooms", roomSchema)

module.exports = RoomDB;

