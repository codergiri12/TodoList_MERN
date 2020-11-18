const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors');
require('./connectDB');

const PORT = process.env.PORT || 8000;

const router = require('./router');

app.use(cors());
app.use(bodyParser.json())
app.use(express.json());
app.use(router);


app.listen(PORT,()=>{
  console.log("server started running")
})