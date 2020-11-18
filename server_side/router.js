const express = require('express');
const mongoose = require('mongoose');

const TodoCollection = require('./todoCollection');

const router = express.Router();

router.post('/todo',async (req,res)=>{
  try {
    const todoDocument = new TodoCollection(req.body);
    console.log("Added todo sucessfully")
    const result = await todoDocument.save();
    res.status(201).send(result);
  } catch (error) {
    console.log("error in catch statement ");
    console.log(error);
  }
});

router.get('/todos',async (req,res)=>{
  try {
    const result = await TodoCollection.find();
    console.log("Displayed all todo's successfully in the postman");
    res.status(200).send(result);
  } catch (error) {
    console.log("error in catch statement ");
    console.log(error);
  }
});

router.get("/todo/:id",async (req,res)=>{
  try {
    const id = req.params.id;
    console.log("U  have requested for "+id);
    const result = await TodoCollection.findById(id);
    if(!result.length){
      res.status(200).send(result);
    }
    else{
      res.status(500).send("No TOdo exists with that ID")
    }
  } catch (error) {
    console.log("error in catch statement ");
    console.log(error);
  }
});

router.patch('/todo/:id',async (req,res)=>{
  try {
    const id = req.params.id;
    const updatedTodo = req.body;
    const result =await TodoCollection.findByIdAndUpdate(id,updatedTodo,{new:true});
    if(!result.length){
      console.log("updated todo with id: "+id);
      res.status(200).send(result);
    }else{
      console.log("SORRY! can't update any Todo with that ID value");
      res.status(400).send("SORRY! can't update any Todo with that ID value");
    }
  } catch (error) {
    console.log("error in catch statement ");
    console.log(error);
  }
});
router.patch('/todoByPos/:pos',async(req,res)=>{
  var pos = (req.params.pos);
  pos = parseInt(pos);
  const doc = await TodoCollection.find().skip(pos).limit(1);
  const id = (doc[0]._id);
  const checkVal = !(doc[0].checked);
  const result = await TodoCollection.findByIdAndUpdate(id,{checked:checkVal},{new:true});
  console.log("updatad by position successfully");
  res.status(201).send(checkVal);
})

router.delete('/todo/:id',async (req,res)=>{
  try {
    const id = req.params.id;
    const result = await TodoCollection.findByIdAndDelete(id);
    if(!result.length){
      console.log("deleted todo with id: "+id);
      res.status(200).send(result);
    }else{
      console.log("SORRY! can't delete any Todo with that ID value");
      res.status(400).send("SORRY! can't delete any Todo with that ID value");
    }
  } catch (error) {
    console.log("error in catch statement ");
    console.log(error);
  }
});

router.delete('/todoByPos/:pos',async(req,res)=>{
  var pos = (req.params.pos);
  pos = parseInt(pos);
  const doc = await TodoCollection.find().skip(pos).limit(1);
  const id = (doc[0]._id);
  const result = await TodoCollection.findByIdAndDelete(id);
  console.log("deleted by position successfully");
  res.status(201).send(result);
})

module.exports = router;