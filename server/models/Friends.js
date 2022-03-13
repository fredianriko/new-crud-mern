const mongoose = require("mongoose");

//write schema for Friends
const FriendSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
});

//define the collection name and associate with the schema
const FriendModel = mongoose.model("friends", FriendSchema);

//export this model as modul

module.exports = FriendModel;
