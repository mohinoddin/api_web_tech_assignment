const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
    customer_id:  {
        type: String,
    },
    customer_name: {
        type: String,
    },
    email :{
        type: String,
    }
})

const customerModal = mongoose.model("customer", customerSchema);

module.exports = customerModal;