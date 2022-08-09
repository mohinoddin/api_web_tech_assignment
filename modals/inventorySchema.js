const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
    inventory_id:  {
        type: String,
    },
    inventory_type: {
        type: String,
    },
    item_name :{
        type: String,
    },
    available_quantity:{
        type:Number,
    }
});

const inventoryModal = mongoose.model("inventory", inventorySchema);

module.exports = inventoryModal;