const CustomerModel = require('../model/customer');

const dummyData = {
  first_name: "San",
  last_name: "Zhang",
  email: "aaa.bb@gmail.com",
  phone: "8888888",
  address: "1234 Hope Drive"
}

const insertDummyToDB = function() {
  CustomerModel.create(dummyData).then(function(msg) {
    console.log("**** Successfully insert dummy data." + msg);
  }).catch(function(err) {
    console.log("++++ Failed to insert dummy data." + err);
  });
}

module.exports = insertDummyToDB;
