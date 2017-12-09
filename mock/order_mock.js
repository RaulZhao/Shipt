const OrderModel = require('../model/order');

const dummyData = {
  customer_id: 1,
  customer_name: "David",
  products: [1,2],
  shipping_status: "pending"
}

const insertDummyToDB = function() {
  OrderModel.create(dummyData).then(function(msg) {
    console.log("**** Successfully insert dummy data." + msg);
  }).catch(function(err) {
    console.log("++++ Failed to insert dummy data." + err);
  });
}

module.exports = insertDummyToDB;
