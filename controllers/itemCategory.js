const item = require('../models/items');
const asyncHandler = require('express-async-handler');

exports.item_list = asyncHandler(async (req,res,next) => {

    const allitems = await item.find({} , "name category")
    .sort({name:1})
    .populate("category")
    .exec();

    res.render("item_list" , {name:"Item List" , item_list:allitems});
    // res.send("Not implemented -- item list");
})

exports.item_details = asyncHandler(async (req,res,next) =>{
    res.send("Not implemented -- item_details");
})