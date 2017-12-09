const express = require('express');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const counter = require('./counter');

const productSchema = new Schema({
  id: {
    type: Number,
    index: true,
    unique: true,
    dropDups: true
  },
  name: String,
  price: Number,
  weight: Number,
  category: {
    id: {
      type: Number,
      index: true,
      required: true
    },
    name: String
  },
  createTime: {
    type: Date,
    default: new Date()
  }
}, { collection: 'product_store' });

// To implement auto_increment 'id' property
counter({ _id: 'productId' }).save();
productSchema.pre('save', function(next) {
  const doc = this;
  counter.findByIdAndUpdate({_id: 'productId'}, {$inc: { seq: 1}}, {new: true}, (error, data) => {
    if(error) return next(error);

    if (doc.id == undefined) {
      doc.id = data.seq;
    }
    next(doc);
  });
});

const ProductStore = mongoose.model('product', productSchema);

const ProductModel = {
  create(data) {
    return new Promise((resolve, reject) => {
      ProductStore(data).save(function(err) {
        if (err) {
          reject(err);
        } else {
          resolve('success');
          console.log(`New Product ${data.name} is created!`);
        }
      });
    });
  },
  getAll() {
    return new Promise((resolve, reject) => {
      ProductStore.find({}, (err, products) => {
        if (err) {
          reject(err);
        }
        resolve(products);
      });
    })
  },
  getById(id) {
    return new Promise((resolve, reject) => {
      ProductStore.findOne({id}, (err, product) => {
        if (err) {
          reject(err);
        }
        resolve(product);
      });
    })
  },
  deleteById(id) {
    return new Promise((resolve, reject) => {
      ProductStore.remove({id}, (err) => {
        if (err) {
          reject(err);
        }
        resolve("success");
      });
    })
  }
}

module.exports = ProductModel;
