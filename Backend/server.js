const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

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