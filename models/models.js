const mongoose = require("mongoose");
mongoose.set("strictQuery", "false");

// URL: Move to .env file
const URL = "mongodb+srv://share_app:L97eUA3053giNZLH@cluster0.sxcx7sm.mongodb.net/stockApp?retryWrites=true&w=majority"

// Connect to DB
mongoose.connect(URL).then(res => {
  console.log("Connected");
}).catch(err => {
  console.log("Couldn't connect");
});

// Create a Schema for the data
const stockSchema = new mongoose.Schema({
  tickerSymbol: String,
  price: Number,
  quantity: Number
});

// Remove _id and __v from json res
stockSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject._id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

// Export DB model
module.exports = mongoose.model('Stock', stockSchema);