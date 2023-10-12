require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

//express app
const app = express();

//middleware
app.use(express.json()); //to add json to the 'req' Object

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

//routes
app.use(`/api/user`, require("./routes/user/userRoutes"));
app.use(`/api/buses`, require("./routes/bus/busRoutes"));


app.use((err, _req, res, _next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something Went Wrong, Please Contact Technical Team.";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

//connect to DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log(
        "Connected to db & listening for requests on port",
        process.env.PORT
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });
