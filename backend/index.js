// basic server
//for that we need to install express

const express = require('express');
const app = express();
const { DBConnection } = require('./database/db.js');
const User = require('./models/Users.js');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();

//middlewares
app.use(express.json()); //at last (2:21:12) time
app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.json());
app.use(cookieParser());

DBConnection();

app.get("/", (req, res) => {
  res.send("welcome to /");
});

//to take details from user to register
app.post("/register", async (req, res) => {
  console.log(req);
  try {
    //get all data from frontend request
    const { firstname, lastname, email, username, password } = req.body;

    //check all data should exist(no any blank datafield)
    if (!(firstname && lastname && email && username && password)) {
      return res.status(400).send("Please fill all the required fields!");
    }

    //check if user already exists
    const existinguser = await User.findOne({ email });
    if (existinguser) {
      return res.status(400).send("User already exists!");
    }

    //encrypt the password
    //for this we use bcrypt.js
    const hashPassword = bcrypt.hashSync(password, 10);
    //console.log(hashPassword);

    //save the user in the database
    const user = await User.create({
      firstname,
      lastname,
      email,
      username,
      password: hashPassword,
    });

    //generate a JWT token for user and send it
    const token = jwt.sign({ id: user._id, email }, process.env.SECRET_KEY, {
      expiresIn: "1h"
    });

    user.token = token;
    user.password = undefined;
    res.status(201).json({
      message: "You have successfully registered!",
      user
    });

  } catch (error) {
    console.error(error);
  }
});

//for login
app.post("/login", async (req, res) => {
  try {
    //get all data from frontend request
    const { username, password } = req.body;

    //check all data should exist(no any blank data field)
    if (!(username && password)) {
      return res.status(400).send("Please fill all the required fields!");
    }

    //find the user in database
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).send("User not found!");
    }

    //match the password
    //const hashPassword = bcrypt.hashSync(password, 10);
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    var isUsernameMatch = false;
    if (username == user.username) isUsernameMatch = true;

    if (!isPasswordMatch) {
      return res.status(400).send("Password is Incorrect");
    }

    if (!isUsernameMatch) {
      return res.status(400).send("Username is Incorrect");
    }

    //create token
    const token = jwt.sign({ id: user._id, username }, process.env.SECRET_KEY, {
      expiresIn: "1h"
    });

    //store cookies
    res.cookie('token', token, { httpOnly: true, maxAge: 3600000 }); // 1 hour

    //send the token
    user.token = token;
    user.password = undefined;
    res.status(201).json({
      message: "Login Successful!",
      user
    });

  } catch (error) {
    console.error(error);
  }
});

app.listen(8000, () => {
  console.log("server listening on port 8000");
});


