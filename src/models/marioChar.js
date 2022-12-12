const mongoose = require('mongoose');

//  Your code goes here
const Schema = mongoose.Schema;

const marioChar = new Schema ( {
    name : {type: String, required: true},
    weight: {type: Number, required : true}
} );

let marioModel = mongoose.model("marioChar", marioChar);

module.exports = marioModel;
