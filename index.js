const express = require("express");
const mongoose = require("mongoose");
const edu = require("./Edu.js");
const bodyParser = require("body-parser");
const cors = require('cors');
const userRouter=require('./main.js')
const nodemailer = require('nodemailer');

let PORT = process.env.PORT || 3030;

mongoose
  .connect(
    "mongodb+srv://classdemo1:Classdemo1@cluster0.ojmyvv4.mongodb.net/",
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("connected ngo dbms");

    const express = require("express");
    const app = express();
    app.use(express.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cors());
    app.use("/api",userRouter)

    // Define route for form submission
    app.post("/userContact", async (req, res) => {
      // Extract form data from request body
      const { selectedOPTION,toEmail,userName, userMobile, userAddress,userType,userAbout,userHelpCategory,userQualification,userCity,userPin } = req.body;
      let mailContent;
      let mailSubject;
      
      if (`${selectedOPTION}` === "help") {
      // Construct email content
      mailSubject= `Needed Help for ${userHelpCategory}`;
      mailContent = `
        
      <p>I hope this email finds you well. My name is Hatim Merchant, and I am writing on behalf of <strong>${userName}</strong>, who is in urgent need of assistance regarding <strong>${userHelpCategory}</strong>.</p>

      <p>Below are the details for your reference:</p>

      <ul>
      <li><b>Name:</b> ${userName}</li>
      <li><b>Phone Number:</b> ${userMobile}</li>
      <li><b>Address:</b> ${userAddress}</li>
      <li><b>City:</b> ${userCity}</li>
      <li><b>PIN Code:</b> ${userPin}</li>
      </ul>

      <p>Description of Help Needed:</p>
      
      <strong>${userName}</strong> is currently facing a challenging situation regarding <strong>${userHelpCategory}</strong>.${userType}.
      
      <p>We kindly request your esteemed organization to extend any possible support to ${userName} in this difficult time. Your assistance can make a significant difference in <strong>${userName}'s</strong> life, and we would be immensely grateful for any help you can provide.</p>
      
      <p>Please feel free to contact ${userName} directly at <strong>${userMobile}</strong> for any further information or clarification. Alternatively, you may reach out to me at 9033863909 or via email at hatimmerchant777@gmail.com.</p>
      
      <p>Thank you for your time and consideration. We look forward to your positive response.</p>
      
      Warm regards,
      <br>
      <i>Hatim Merchant,</i>
      <br>
      <i>Founder,</i>
      <br>
      <i>UniteUp.</i>
      `;
      }else if (`${selectedOPTION}` === "volunteer") {
        // Email content for volunteer option
        mailSubject= `Wanted to join for Volunteering`
        mailContent = `
          <p>I hope this email finds you well. My name is Hatim Merchant, and I am writing on behalf of <strong>${userName}</strong>, who is interested in volunteering with your esteemed organization.</p>
  
          <p>Below are the details for your reference:</p>
  
          <ul>
            <li><b>Name:</b> ${userName}</li>
            <li><b>Phone Number:</b> ${userMobile}</li>
            <li><b>Address:</b> ${userAddress}</li>
            <li><b>City:</b> ${userCity}</li>
            <li><b>PIN Code:</b> ${userPin}</li>
            <li><b>Qualification:</b> ${userQualification}</li>
          </ul>
  
          <p>About ${userName}:</p>
          
          ${userAbout}
          
          <p>${userName} is eager to contribute and make a difference. They have expressed a keen interest in volunteering and believe that their skills and passion can be of great value to your organization.</p>
          
          <p>Please feel free to contact ${userName} directly at <strong>${userMobile}</strong> for any further information or clarification. Alternatively, you may reach out to me at 9033863909 or via email at hatimmerchant777@gmail.com.</p>
          
          <p>Thank you for your time and consideration. We look forward to your positive response.</p>
          
          Warm regards,
          <br>
          <i>Hatim Merchant,</i>
          <br>
          <i>Founder,</i>
          <br>
          <i>UniteUp.</i>
        `;
      }
      // Create Nodemailer transporter
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'uniteup777@gmail.com',
          pass: 'lnbi vhkw jfcu mhrk',
        },
      });


  
      // Email options
      const mailOptions = {
        from: 'uniteup777@gmail.com',
        to: toEmail, // Replace with NGO's email address
        subject: mailSubject ,
        html: mailContent,
      };
  
      try {
        // Send email
        await transporter.sendMail(mailOptions);
        res.status(200).send('Form submitted successfully');
      } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Error sending email');
      }
    });
  

    app.get("/edu", async (req, res) => {
      const { category,city,pageNumber,firstTime,dataLimit } = req.query;
      let eduData;
      let regex;
      console.log(category);
      if (category && city!="undefined") {
        const regexCat = new RegExp(category, 'i');
        const regexCity = new RegExp(city, 'i');
        eduData = await edu.find({
          $and: [
              { key_issue: { $regex:regexCat } },
              { "contacts.City": { $regex:regexCity } }
          ]
      }).skip((pageNumber)*dataLimit).limit(dataLimit);
      } 
      else if (category){    
        regex = new RegExp(category, 'i');
        eduData = await edu.find({ key_issue: { $regex:regex } }).skip((pageNumber)*dataLimit).limit(dataLimit);
        console.log("I am in category");
        
      } else {   
        eduData = await edu.find().skip((pageNumber)*dataLimit).limit(dataLimit);
      }
      console.log(regex);
      let totalDataLength = 0;
      if(firstTime != null && firstTime == 'true' ){
        totalDataLength =  regex ? await  edu.countDocuments({ key_issue: { $regex:regex } }) :await edu.countDocuments();
      }
      
      res.json({totalDataLength : totalDataLength, data : eduData})
      
      // res.send(eduData);
    });
    app.get("/edu/:id", async (req, res) => {
      const eduData = await edu.findOne({ _id: req.params.id });
      res.send(eduData);
    });
    app.post("/edu", async (req, res) => {
     
      const myedu = new edu({
        _id: new mongoose.Types.ObjectId(),
        id: req.body.id,
        name: req.body.name,
        key_issue: req.body.key_issue,
        contacts:req.body.contacts,  
        Address: req.body.Address,
      });
      await myedu.save();
      res.send(myedu);
    });

    app.listen(PORT, () => {
      console.log("Server 1Start srated at @",PORT);
    });
  });
