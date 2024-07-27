const mongoose = require('mongoose');
const schema = mongoose.Schema({
    _id:mongoose.ObjectId,
    id:Number,
    name:String,

  "Unique Id of VO/NGO": String,
  "Details of Achievements": String,
  "Registration Details": {
    "Registered With": String,
    "Type of NGO": String,
    "Registration No": String,
    "Copy of Registration Certificate": String,
    "Copy of Pan Card": String,
    "Act name": String,
    "City of Registration": String,
    "State of Registration": String,
    "Date of Registration": Date,
  },
  "Key Issues": {
    "Key Issues": String,
    "Operational Area-States": String,
    "Operational Area-District": String,
  },
  "Contact Details": {
    "Address": String,
    "City": String,
    "State": String,
    "Telephone": String,
    "Mobile No": String,
    "Website Url": String,
    "E-mail": String,
  },
  "Members": [
    {
      "Name": String,
      "Designation": String,
      "Pan": String,
      "Aadhaar": String,
    },
  ],
  "FCRA details": [
    {
      "FCRA Available": String,
      "FCRA Registration no.": String,
    },
  ],
  "Source of Funds": [
    {
      "Department Name": String,
      "Source": String,
      "Finacial Year": String,
      "Amount Sanctioned": String,
      "Purpose": String,
    },
  ],


    Address:String,
    key_issue:String,
    City:String,
    State:String,
    Telephone:Number,
    ['Key Issues']: {
        'Key Issues': String, // Assuming it's a string of comma-separated issues
        'Operational Area-States': String,
        'Operational Area-District': String
      },
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