const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    item_name:  {
        type: String,
       
    },
    inventory_id: {
        type: String,
       
    },
    customer_id:{
        type: String,
      
    },
    quantity:{
        type: Number,
    }
})

const orderModal = mongoose.model("order", orderSchema);

module.exports = orderModal;