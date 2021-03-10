var mongoose = require("mongoose");

var compliantSchema = new mongoose.Schema({
    creatorUsername: String,
    creatorId: String,
    name: String,
    problem: String,
    productExperice: String,
    feeback: String,
    status: {type: String , default: "Pending" }
});

module.exports = mongoose.model("compliant" , compliantSchema);