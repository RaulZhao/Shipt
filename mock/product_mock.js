const ProductModel = require('../model/product');

const dummyData = {
  name: "Orange",
  price: null,
  weight: 2.7,
  category: {
    id: 2,
    name: "Category_B"
  }
}

const insertDummyToDB = function() {
  ProductModel.create(dummyData).then(function(msg) {
    console.log("**** Successfully insert dummy data." + msg);
  }).catch(function(err) {
    console.log("++++ Failed to insert dummy data." + err);
  });
}

module.exports = insertDummyToDB;
