const mongoose = require('mongoose');
const express = require('express');


//create schema
var todoSchema = new mongoose.Schema({
  text:{
    type:String,
    required:true
  },
  checked:{
    type:Boolean
  }
});

const TodoCollection = new mongoose.model("todo_list",todoSchema);

module.exports= TodoCollection;