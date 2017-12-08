const express = require('express');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  id: Number,
  name: String,
  price: Number,
  weight: Number,
  category_id: Number,
  shipping: String
}, { collection: 'product_store' });

const ProductStore = mongoose.model('product', productSchema);

const ProductModel = {
  create(data) {
    return new Promise((resolve, reject) => {
      ProductStore.find({id: data.id}, function(err, products) {
        if (err) {
          reject(err);
        }
        if (products.length > 0) {
          reject('duplicated product');
        } else {
          ProductStore(data).save(function(err) {
            if (err) {
              reject(err);
            } else {
              resolve('success');
              console.log(`New Product ${data.name} is created!`);
            }
          });
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
