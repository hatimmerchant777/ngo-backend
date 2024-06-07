const mongoose = require('mongoose');
const schema = mongoose.Schema({
    _id:mongoose.ObjectId,
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

module.exports = mongoose.model('UserContact',schema);