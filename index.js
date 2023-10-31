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


// TODO: API is not in REST 

// Return all stocks
app.get("/stock/get", (req, res) => {
  
  // Fetch all stocks from DB
  Stock.find({}).then(data => {

    // Return the list back
    return res.json(data);

    // Error handeling (TODO: Move to middleware)
  }).catch(err => {
    console.log(err);
    return res.status(404);
  });
});


// Save Stock info to DB
app.post("/stock/add", (req, res) => {

  // Get data from form
  const data = req.body;

  // Create a new object out of Stock model
  const newStock = new Stock(data);

  // Save new Stock info
  newStock.save().then((d) => {
    return res.json(d);
  }).catch((err) => {

    // Error handeling(TODO: move to middleware)
    let msg = "";
    
    if(err.errors.tickerSymbol) {
      msg = err.errors.tickerSymbol.properties.message;
    }
    else if(err.errors.price) {
      msg = err.errors.price.properties.message;
    }
    else if(err.errors.quantity) {
      msg = err.errors.quantity.properties.message;
    }
    
    return res.status(400).json({"error": msg});
  }); 
});


// Delete stock by id
app.delete("/stock/delete/:id", (req, res) => {

  // Get id from request
  const id = req.params.id;
  
  // Find and delete (if not found, returns remove object or null)
  Stock.findByIdAndRemove(id).then(data => {

    // TODO: Data null or not
    return res.json(data);
  }).catch(err => {

    // TODO: error, malformed key
    console.log(err);
    return res.status(500);
  });
});

// Handle unknown endpoint
const unknownEndPoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};
app.use(unknownEndPoint);

app.listen(4000, () => {
  console.log("Listening on port 4000");
});
