const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//a name, description, category, price, number-in-stock and URL
const categorySchema = new Schema({
    name:{type:String , required:true},
    description:{type:String},
})

categorySchema.virtual("url").get(function(){
    return `/category/${this._id}`;
})

module.exports = mongoose.model("category" , categorySchema);