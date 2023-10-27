const express = require("express");
const app = express();

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
const data = [
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

app.post("/stock/add", (req, res) => {
  const data = req.body;
  addNewStock(data);

  return res.json(data);
});

app.listen(4000, () => {
  console.log("Listening on port 4000");
});
