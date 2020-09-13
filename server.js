const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User');
mongoose.connect('mongodb://localhost/userData');
const bodyParser = require('body-parser');
const port = 8090;
const app = express();

app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`server is listening on port:${port}`);
})

function sendResponse(res,err,data){
  if (err){
    res.json({
      success: false,
      message: err
    })
  } else if (!data){
    res.json({
      success: false,
      message: "Not Found"
    })
  } else {
    res.json({
      success: true,
      data: data
    })
  }
}

// CREATE
app.post('/users', (req, res) => {
  User.create({
    name: req.body.newData.name,
    email: req.body.newData.email,
    password: req.body.newData.password
  }, (err, data) => {sendResponse(res,err,data)})
})

app.route('/users/:id')
  // READ
  .get((req, res) => {
    User.findById(req.params.id, (err, data) => {sendResponse(res,err,data)})
  })
  // UPDATE
  .put((req, res) => {
    User.findByIdAndUpdate(
      req.params.id, // find user with this id
      { // update with these details
        name: req.body.newData.name,
        email: req.body.newData.email,
        password: req.body.newData.password
      },
      {
        new: true // return the updated document
      }, (err, data) => { // response handler
        sendResponse(res,err,data)
      })
  })
  // DELETE
  .delete((req, res) => {
    User.findByIdAndDelete(
      req.params.id, // find user with this id
      (err, data) => {
        sendResponse(res,err,data)
      }
    )
  })