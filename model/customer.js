const express = require('express');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const counter = require('./counter');

const customerSchema = new Schema({
  id: {
    type: Number,
    index: true,
    unique: true,
    dropDups: true
  },
  first_name: String,
  last_name: String,
  email: String,
  phone: String,
  address: String
}, { collection: 'customer_store' });

// To implement auto_increment 'id' property
counter({ _id: 'customerId' }).save();
customerSchema.pre('save', function(next) {
  const doc = this;
  counter.findByIdAndUpdate({_id: 'customerId'}, {$inc: { seq: 1}}, {new: true}, function(error, data) {
    if(error) return next(error);

    if (doc.id == undefined) {
      doc.id = data.seq;
    }
    next(doc);
  });
});

const CustomerStore = mongoose.model('customer', customerSchema);

const customerModel = {
  create(data) {
    return new Promise((resolve, reject) => {
      CustomerStore(data).save(function(err) {
        if (err) {
          reject(err);
        } else {
          resolve('success');
          console.log(`New customer ${data.first_name} ${data.last_name} is created!`);
        }
      });
    });
  },
  getAll() {
    return new Promise((resolve, reject) => {
      CustomerStore.find({}, (err, customers) => {
        if (err) {
          reject(err);
        }
        resolve(customers);
      });
    })
  },
  getById(id) {
    return new Promise((resolve, reject) => {
      CustomerStore.findOne({id}, (err, customer) => {
        if (err) {
          reject(err);
        }
        resolve(customer);
      });
    })
  },
  deleteById(id) {
    return new Promise((resolve, reject) => {
      CustomerStore.remove({id}, (err) => {
        if (err) {
          reject(err);
        }
        resolve("success");
      });
    })
  }
}

module.exports = customerModel;
