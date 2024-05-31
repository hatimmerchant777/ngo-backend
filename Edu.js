const mongoose = require('mongoose');
const schema = mongoose.Schema({
    _id:mongoose.ObjectId,
    id:Number,
    name:String,
    Address:String,
    key_issue:String,
    City:String,
    State:String,
    Telephone:Number,
    contacts:{ 
        ["E-mail"]: String, 
    },
    selectedOPTION:String,
    toEmail:String,
    userName: String, 
    userMobile:Number,
    userHelpCategory:String,
    userQualification:String,
    userAddress: String, 
    userType:String, 
    userAbout:String,
    userCity:String,
    userPin:Number 
})

module.exports = mongoose.model('Edu',schema);