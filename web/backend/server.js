const mongoose = require("mongoose");
const express = require("express");
var cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");

//MODELS
const User = require("./models/user");
const Report = require("./models/report");
const Location = require("./models/location");

const PDF = require("./helpers/generatePDF");

const API_PORT = 3001;
const app = express();
app.use(cors());
const router = express.Router();

// this is our MongoDB database
const dbRoute = "mongodb://localhost:27017/xamapali";

// connects our back end code with the database
mongoose.connect(dbRoute, { useNewUrlParser: true });

let db = mongoose.connection;

db.once("open", () => console.log("connected to the database"));

// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));

router.get("/getUser", (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username, password }, (err, doc) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: doc });
  });
});

router.get("/getListUsers", (req, res) => {
  User.find({}, (err, docs) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: docs });
  });
});

router.post("/createUser", (req, res) => {
  let docId = "";
  User.create(req.body)
    .then(doc => {
      console.log(doc);
      docId = doc._id.toString();
    })
    .catch(async err => await console.log(err));

  Location.create({
    userId: docId,
    coordinates: {
      lat: 1,
      lng: 1
    }
  }).then(location => res.json({ success: true, data: location }));
});

router.get("/getReports", (req, res) => {
  Report.find({}, (err, docs) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: docs });
  });
});

router.post("/newReport", (req, res) => {
  console.log(req.body);
  Report.create(req.body)
    .then(doc => {
      return res.json({ success: true, data: doc });
    })
    .catch(async err => await console.log(err));
});

router.get("/getLocations", (req, res) => {
  Location.find({}, (err, docs) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: docs });
  });
});

// router.get("/generatePDF", (req, res) => {
//   return res.json({success: true, data: docs});
// });

// // this is our update method
// // this method overwrites existing data in our database
// router.post("/updateData", (req, res) => {
//   const { id, update } = req.body;
//   Data.findByIdAndUpdate(id, update, err => {
//     if (err) return res.json({ success: false, error: err });
//     return res.json({ success: true });
//   });
// });

// // this is our create method
// // this method adds new data in our database
// router.post("/putData", (req, res) => {
//   let data = new Data();

//   const { id, message } = req.body;

//   if ((!id && id !== 0) || !message) {
//     return res.json({
//       success: false,
//       error: "INVALID INPUTS"
//     });
//   }
//   data.message = message;
//   data.id = id;
//   data.save(err => {
//     if (err) return res.json({ success: false, error: err });
//     return res.json({ success: true });
//   });
// });

// append /api for our http requests
app.use("/api", router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
