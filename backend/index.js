// basic server
//for that we need to install express

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { DBConnection } = require('./database/db.js');

const User = require('./models/Users.js');
const Problem = require('./models/Problems')

const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const cors = require('cors');
const Problems = require('./models/Problems');
dotenv.config();

//middlewares
app.use(cors())
app.use(express.json()); //at last (2:21:12) time
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

DBConnection();

app.get("/", (req, res) => {
  res.send("welcome to /");
});

//to take details from user to register
app.get('/register', (req, res) => {
  res.send('welcome to register');
});

app.post('/register', async (req, res) => {
  // console.log(req.body);
  try {
    //get all data from frontend request
    const { firstname, lastname, email, username, password } = req.body;

    //check all data should exist(no any blank datafield)
    if (!(firstname && lastname && email && username && password)) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    //check if user already exists
    const existingemail = await User.findOne({ email });
    if (existingemail) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const existingusername = await User.findOne({ username });
    if (existingusername) {
      return res.status(400).json({ message: 'username is taken' });
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
      expiresIn: "24h"
    });
    
    console.log(user)
    user.token = token;
    user.password = undefined;
    res.status(201).json({
      message: "You have successfully registered!",
      user
    });

  } catch (error) {
    console.error("register error " + error);
  }
});

//for login

app.get('/login', (req, res) => {
  res.send('welcome to login');
});


app.post('/login', async (req, res) => {
  // console.log(req.body);
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
    
    if (!isPasswordMatch) {
      // console.log(isPasswordMatch);
      return res.status(400).send("Password is Incorrect");
    }

    //create token
    const token = jwt.sign({ id: user._id, username }, process.env.SECRET_KEY, {
      expiresIn: "24h"
    });
    
    //store cookies
    res.cookie('token', token, { httpOnly: true, maxAge: 3600000 }); // 1 hour
    //console.log(isPasswordMatch);
    
    //send the token
    user.token = token;
    user.password = undefined;
    res.status(201).json({
      message: "Login Successful!",
      user
    });

    // console.log(res.json());

  } catch (error) {
    console.error(error);
  }
});

app.get('/problems', async (req, res) => {
  try {
    const problems = await Problem.find();
    res.json(problems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/admin', async (req, res) => {
    try {
      const problems = await Problem.find();
      res.json(problems);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
});

app.delete('/admin', async (req, res) => {
  const { id } = req.query;
  // console.log(id)
  try {
    const problems = await Problem.findOneAndDelete({ problem_id: id });
    res.status(200).json({ message: `Problem with ID ${id} deleted successfully.` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/admin/add-new-problem', async (req, res) => {
  // console.log(req.body)
  try {

    const problemData = req.body;
    //let existingProblem = await Problem.findOne({ problem_id: problemData.problem_id });
    // console.log(problemData.problem_id)
    const newProblem = await Problem.create(problemData);

    // console.log(newProblem)
    
    res.status(200).json({ message: `Problem with ID ${newProblem.problem_id} added successfully.` });

  } catch (err) {
    console.error('Error adding problem: ', err);
    res.status(500).json({ message: err.message });
  }
});

app.put('/admin/update-problem', async (req, res) => {
  try {
      const problemId = req.query.id;
      const deleteproblems = await Problem.findOneAndDelete({ problem_id: problemId });
      const updateData  = req.body;
      const newProblem = await Problem.create(updateData);
      
      // console.log("Problem-id::::::: " + problemId)
      // console.log(updateData)

      // const updatedProblem = await Problem.findByIdAndUpdate(problemId, updateData, { new: true });

      res.status(200).json({ message: 'Problem updated successfully', problem: newProblem });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

app.get('/problem-detail', async (req, res) => {
  // console.log("in problem detail request : " + req.query.id)
  const { id } = req.query;

  try {
    const problem = await Problem.findOne({ problem_id : id });
    if (!problem) {
      return res.status(404).json({ error: 'Problem not found' });
    }

    // console.log("at server side "+ problem);

    res.json({
      message: "Problem found",
      problem
    });
  } catch (err) {
    console.error('Error fetching problem:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// compiler part
app.post('/run', async (req, res) => {
  const { language, code, input, timeLimit, memoryLimit } = req.body;

  console.log(timeLimit)
  console.log(memoryLimit)

  if (language !== 'c_cpp') {
    return res.json({ error: 'Currently only C++ is supported.' });
  }

  const codeFilePath = path.join(__dirname, 'temp.cpp');
  const inputFilePath = path.join(__dirname, 'inputForRun.txt');
  const outputFilePath = path.join(__dirname, 'outputForRun.txt');

  fs.writeFileSync(codeFilePath, code);
  fs.writeFileSync(inputFilePath, input);

  exec(`g++ ${codeFilePath} -o temp.exe`, (compileError, compileStdout, compileStderr) => {
    if (compileError) {
      return res.json({ error: compileStderr });
    }

    exec(`temp.exe < ${inputFilePath} > ${outputFilePath}`, (runError, runStdout, runStderr) => {
      if (runError) {
        return res.json({ error: runStderr });
      }

      const output = fs.readFileSync(outputFilePath, 'utf-8');
      res.json({ output });
    });
  });
});

app.listen(8000, () => {
  console.log("server listening on port 8000");
});


