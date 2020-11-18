var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/todo_database',{
  useCreateIndex:true,
  useNewUrlParser:true,
  useUnifiedTopology:true
}).then(()=>{console.log("connection successful with database")})
.catch((err)=>{console.log("Error Got while setupping connection with database :"+err)});


