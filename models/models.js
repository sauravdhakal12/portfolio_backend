const mongoose = require("mongoose");
mongoose.set("strictQuery", "false");

// URL: Move to .env file
const URL = "mongodb+srv://share_app:L97eUA3053giNZLH@cluster0.sxcx7sm.mongodb.net/stockApp?retryWrites=true&w=majority";

// Connect to DB
mongoose.connect(URL).then(res => {
  console.log("Connected");
}).catch(err => {
  console.log("Couldn't connect");
});

// Create a Schema for the data
const stockSchema = new mongoose.Schema({
  
  // Rules
  //  - All fields should be non empty
  //  - Minimum quantity of share allowed is 10

  tickerSymbol: {
    type: String,
    required: [true, "Empty field not allowed"],
  },

  price: {
    type: Number,
    required: [true, "Empty field not allowed"],
  },

  quantity: {
    type: Number,
    min: [10, "Minimum quantity allowed is 10"],
    required: [true, "Empty field not allowed"],    
  }
});

// Remove _id and __v from json res
stockSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

// Export DB model
module.exports = mongoose.model("Stock", stockSchema);