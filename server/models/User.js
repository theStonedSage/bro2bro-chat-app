const mongoose =require("mongoose");


var userschema = mongoose.Schema({
    name:String,
    password:String,
    rooms:[{
      name:String,
      messages:[{
        user:String,
        text:String
      }]
    }]
});

  module.exports = mongoose.model("User",userschema);