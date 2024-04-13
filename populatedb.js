#! /usr/bin/env node

console.log(
    'This script populates some test books, authors, categorys and bookinstances to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
  );
  
  // Get arguments passed on command line
  const userArgs = process.argv.slice(2);
  
  const Category = require("./models/Category");
  const Items = require("./models/items");
  
  const categories = [];
  const items = [];
  
  const mongoose = require("mongoose");
  mongoose.set("strictQuery", false);
  
  const mongoDB = userArgs[0];
  
  main().catch((err) => console.log(err));
  
  async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(mongoDB);
    console.log("Debug: Should be connected?");
    await createCategories();
    await createItems();
    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
  }
  
  // We pass the index to the ...Create functions so that, for example,
  // category[0] will always be the Fantasy category, regardless of the order
  // in which the elements of promise.all's argument complete.
  async function categoryCreate(index, name , description) {
    const category = new Category({ name: name ,description : description});
    await category.save();
    categories[index] = category;
    console.log(`Added category: ${name}`);
  }
  
  
  async function itemCreate(index, name, description, category, price,stock) {
    const itemdetail = {
      name: name,
      description: description,
      category: category,
      price: price,
      stock: stock
    };
  
    const item = new Items(itemdetail);
    await item.save();
    items[index] = item;
    console.log(`Added book: ${item.name}`);
  }
  
  
  
  async function createCategories() {
    console.log("Adding categories");
    await Promise.all([
      categoryCreate(0, "Guitar" , "Some Guitars"),
      categoryCreate(1, "Watch" , "A few watches"),
      categoryCreate(2, "Music" , "Some tunes"),
    ]);
  }
  
  
  async function createItems() {
    console.log("Adding Items");
    await Promise.all([
      itemCreate(0,
        "70th Anniversary American Vintage II 1954 Stratocaster",
        "Each 70th Anniversary Stratocaster model showcases the rich heritage and legendary tones that have made the Strat® an unrivaled icon. From vintage purists to progressive players seeking cutting-edge features, rest assured there's a model that will deliver. Immerse yourself in the legacy of the Stratocaster and own a piece of Fender® history with the 70th Anniversary Stratocaster Collection.",
        categories[0],
        2599,
        2
      ),
      itemCreate(1,
        "Crash by Dave Mathews Band",
        "Recording of the album began in October 1995, and ended in January 1996. There were only four known songs from the Crash sessions that didn't make it to the final cut. However, none of the titles are known",
        categories[2],
        10,
        100
      ),
      itemCreate(2,
        "ROYAL OAK GRANDE COMPLICATION",
        "Combining the 3 categories of horological complications represented by short-time measurement, striking mechanism",
        categories[1],
        40000000,
        4
      )
    ])
}