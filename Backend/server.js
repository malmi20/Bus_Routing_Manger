require ("dotenv").config()
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose")
const busesRoutes = require('./routes/buses')

//express app
const app = express();

//middleware
app.use(express.json());

app.use(cors());

app.use((err,req,res,next)=>{
console.log(req.path, req.method)
next()

  const errorStatus = err.status || 500
  const errorMessage = err.message || "something went wrong"
  return res.status(errorStatus).json({
      success: false,
      status: errorStatus,
      message: errorMessage,
      stack: err.stack
  })
})

//Routes
app.use('/api/buses', busesRoutes)




//DB connection
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
     //listening for request
     app.listen(process.env.PORT, ()=> {
     console.log("DB connected and listening on port ", process.env.PORT)
     })
})
.catch((error)=>{
    console.log(error)
})