const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var usersSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true},
    dateOfBirth: {type: String},
    gender: {type: String},
    address: {type: String},
    contactNo: {type: String},
    nickName: {type: String},
    thingsiLove: {type: String},
    notYelping: {type: String},
    headline: {type: String},
    website: {type: String},
    yelpingSince: {type: String},
    fileName: {type: String}
},
{
    versionKey: false
});

const customer = mongoose.model('user', usersSchema);
module.exports = customer;