const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//a name, description, category, price, number-in-stock and URL
const itemSchema = new Schema({
    name:{type:String , required:true},
    description:{type:String},
    category:{type:Schema.Types.ObjectId , ref: "category" , required:true },
    price:{type:Number},
    stock:{type:Number}
})

itemSchema.virtual("url").get(function(){
    return `/items/${this._id}`;
})

module.exports = mongoose.model("items" , itemSchema);