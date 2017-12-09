const CategoryModel = require('../model/category');

const dummyData1 = {
  id: 1,
  name: "Category_A"
}

const dummyData2 = {
  id: 2,
  name: "Category_B"
}

const insertDummyToDB = function() {
  CategoryModel.create(dummyData1).then(function(msg) {
    console.log("**** Successfully insert dummy data." + msg);
  }).catch(function(err) {
    console.log("++++ Failed to insert dummy data." + err);
  });

  CategoryModel.create(dummyData2);
}

module.exports = insertDummyToDB;
