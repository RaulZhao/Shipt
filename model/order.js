const express = require('express');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const counter = require('./counter');

const orderSchema = new Schema({
  id: {
    type: Number,
    index: true,
    unique: true,
    dropDups: true
  },
  customer_id: {
    type: Number,
    required: true
  },
  customer_name: String,
  products: Array,
  shipping_status: String,
  createTime: {
    type: Date,
    default: new Date()
  }
}, { collection: 'order_store' });

// To implement auto_increment 'id' property
counter({ _id: 'orderId' }).save();
orderSchema.pre('save', function(next) {
  const doc = this;
  counter.findByIdAndUpdate({_id: 'orderId'}, {$inc: { seq: 1}}, {new: true}, (error, data) => {
    if(error) return next(error);

    if (doc.id == undefined) {
      doc.id = data.seq;
    }
    next(doc);
  });
});

const OrderStore = mongoose.model('order', orderSchema);

const OrderModel = {
  create(data) {
    return new Promise((resolve, reject) => {
      OrderStore(data).save(function(err) {
        if (err) {
          reject(err);
        } else {
          resolve('success');
          console.log(`New Order ${data.name} is created!`);
        }
      });
    });
  },
  getAll() {
    return new Promise((resolve, reject) => {
      OrderStore.find({}, (err, orders) => {
        if (err) {
          reject(err);
        }
        resolve(orders);
      });
    })
  },
  getById(id) {
    return new Promise((resolve, reject) => {
      OrderStore.findOne({id}, (err, order) => {
        if (err) {
          reject(err);
        }
        resolve(order);
      });
    })
  },
  deleteById(id) {
    return new Promise((resolve, reject) => {
      OrderStore.remove({id}, (err) => {
        if (err) {
          reject(err);
        }
        resolve("success");
      });
    })
  }
}

module.exports = OrderModel;
