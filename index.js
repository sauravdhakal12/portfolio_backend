const express = require("express");
const app = express();

const Stock = require("./models/models");

// Cross Origin Resource Sharing
const custom_cors = (req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "OPTIONS, POST, GET");
  next();
};
app.use(custom_cors);

// Parse data from request, available as request.body
app.use(express.json());


const errorHandler = (err, req, res, next) => {
  console.log(err.message);
  
  // Id dosen't follow correct format
  if(err.name === "CastError") {
    return res.status(400).json({"error": "Malformed ID"});
  }

  // Error from DB
  else if (err.name === "ValidationError") {
    
    // Get msg
    const msg = Object.values(err.errors).map(value => value.message)[0];

    return res.status(400).json({"error": msg});
  }

  // Unknown error
  else {
    return res.status(500).json({"error": "Unknown Error"});
  }
};


// TODO: API is not in REST 

// Return all stocks
app.get("/stock/get", (req, res, next) => {
  
  // Fetch all stocks from DB
  Stock.find({}).then(data => {

    // Return the list back
    return res.json(data);

    // Error handeling
  }).catch(err => next(err));
});


// Save Stock info to DB
app.post("/stock/add", (req, res, next) => {

  // Get data from form
  const data = req.body;

  // Create a new object out of Stock model
  const newStock = new Stock(data);

  // Save new Stock info
  newStock.save().then((d) => {
    return res.json(d);

    // Error handeling
  }).catch((err) => next(err));
});


// Delete stock by id
app.delete("/stock/delete/:id", (req, res, next) => {

  // Get id from request
  const id = req.params.id;
  
  // Find and delete (if not found, returns remove object or null)
  Stock.findByIdAndRemove(id).then(data => {

    // TODO: Data null or not
    return res.json(data);
    }).catch(err => next(err));
});

// Handle unknown endpoint
const unknownEndPoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};
app.use(unknownEndPoint);

app.use(errorHandler);

app.listen(4000, () => {
  console.log("Listening on port 4000");
});
