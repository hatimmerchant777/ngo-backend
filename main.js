const express = require("express");
const mongoose = require("mongoose");
const userContact=require("./UserContact.js")
const bodyParser = require("body-parser");

const app=express.Router();

    app.get("/userDetails", async (req, res) => {
      const userDetails = await userContact.find();
      res.send(userDetails);
    });

    app.post("/userDetails", async (req, res) => {
        const userData = new userContact({
          _id: new mongoose.Types.ObjectId(),
          selectedOPTION:req.body.selectedOPTION,
          userName: req.body.userName,
          userAddress: req.body.userAddress,
          userMobile:req.body.userMobile,  
          userType: req.body.userType,
          userCity:req.body.userCity,
          userPin:req.body.userPin,
          userQualification:req.body.userQualification,
          userHelpCategory:req.body.userHelpCategory,
          userAbout:req.body.userAbout,
          toEmail:req.body.toEmail,
        });
        await userData.save();
        res.send(userData);
      });

      module.exports =  app 

