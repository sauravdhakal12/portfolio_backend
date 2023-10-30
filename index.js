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

// Temp data (moved to backend)
let data = [
  {
    id: 1,
    tickerSymbol: "NABIL",
    quantity: 12,
    price: "780",
  },
  {
    id: 2,
    tickerSymbol: "NICA",
    quantity: 20,
    price: "680",
  },
  {
    id: 3,
    tickerSymbol: "API",
    quantity: 40,
    price: "269",
  },
];

// NOTE: API

// Return all stocks
app.get("/stock/get", (req, res) => {
  res.json(data);
});

// Add new stock
const addNewStock = (d) => {
  data.push(d);
};

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
    console.log(err);
    return res.status(500);
  }); 
});

// Delete stock
const deleteStock = (d) => {
  let res = false;

  data = data.filter((stock) => {
    res = res || stock.tickerSymbol === d;
    return stock.tickerSymbol !== d;
  });

  return res;
};

app.delete("/stock/delete", (req, res) => {
  const data = req.body;
  const s = deleteStock(data["tickerSymbol"]);
  return res.json({ success: s });
});

// Handle unknown endpoint
const unknownEndPoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};
app.use(unknownEndPoint);

app.listen(4000, () => {
  console.log("Listening on port 4000");
});
