// basic server
//for that we need to install express

const express = require('express');
const app = express();
const {DBConnection} = require('./database/db.js');
const User = require('./models/Users.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();

//middlewares
app.use(express.json()); //at last (2:21:12) time
app.use(express.urlencoded({extended : true}));

DBConnection();

app.get("/", (req, res) => {
    res.send("welcome to /");
});

//to take details from user to register
app.post("/register", async (req,res) => {
    console.log(req);
    try{
       //get all data from frontend request
       const {firstname,lastname,email,password} = req.body;
       
       //check all data should exist(no any blank data field)
       if(!(firstname && lastname && email && password)){
          return res.status(400).send("Please fill all the required fields!");
       }

       //check if user already exists
       const existinguser = User.findOne({email});
       if(existinguser){
          return res.status(400).send("User already exists!");
       }
       
       //encrypt the password
       //for this we use bcrypt.js
       const hashPassword = bcrypt.hashSync(password,10);
       //console.log(hashPassword);
       
       //save the user in the database
       const user = await User.create({
            firstname,
            lastname,
            email,
            password: hashPassword,
       });

       //generate a JWT token for user and send it
       const token = jwt.sign({id:user._id,email},process.env.SECRET_KEY,{
         expiresIn: "1h"
       });

       user.token = token;
       user.password = undefined;
       res.status(201).json({
         message : "You have successfully registered!",
         user
       })

    }catch(error){
        console.error(error);
    }
});

//for login
app.post("/login", async (req,res) =>{
    try{
        //get all data from frontend request
        //check all data should exist(no any blank data field)
        //find the user in database
        //match the password
        //create token
        //store cookies
        //send the token
    }catch(error){
        console.error(error);
    }
})

app.listen(8000, () => {
    console.log("server listening on port 8000");
});


