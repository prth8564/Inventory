const { ObjectId } = require('mongodb');
const Category = require('../models/Category');
const Item = require('../models/items');
const asyncHandler = require("express-async-handler");
exports.category_list = asyncHandler(async (req,res,next) =>{

    const allcategory = await Category.find({} , "name")
    .sort({name:1})
    .exec();
    console.log()
    res.render("category_list" , {name:"Category_list" , category_list : allcategory});
    //res.send("Not Implemented -- category_list");
})

exports.category_detail = asyncHandler(async (req,res,next) =>{
    const category_det = await Category.find({_id : new ObjectId(req.params.id)})
    .exec();

    const items_in_category = await Item.find({category : new ObjectId(category_det[0]._id)}).exec();
    res.render("category_details",{name : "Category Details" , category_detail : category_det , item_list : items_in_category}  );
    //res.send(category_det);;
})