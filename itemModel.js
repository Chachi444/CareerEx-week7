const mongoose = require("mongoose")

const itemSchema = new mongoose.Schema({
    itemName: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },

    dateFound: {
        type: String,
        default: true,
    },
    locationFound: {
        type: String, default: "true"
    },

    claimed: {
        type: Boolean,
        default: "true",
    }

}, { timestamps: true })

const Items = mongoose.model("lostItems", itemSchema)

module.exports = Items



