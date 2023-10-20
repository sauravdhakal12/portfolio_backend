const express = require("express");
const app = express();

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

// Return all stocks
app.get("/api/stocks", (req, res) => {
  res.json(data);
});

app.listen(4000, () => {
  console.log("Listening on port 4000");
});
