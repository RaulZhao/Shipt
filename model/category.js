const express = require('express');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  id: {
    type: Number,
    required: true,
    index: true,
    unique: true,
    dropDups: true
  },
  name: String,
  products: {type: Array, default: []}
}, { collection: 'category_store' });

const CategoryStore = mongoose.model('category', categorySchema);

const CategoryModel = {
  create(data) {
    return new Promise((resolve, reject) => {
      CategoryStore(data).save(function(err) {
        if (err) {
          reject(err);
        } else {
          resolve('success');
          console.log(`New Category ${data.name} is created!`);
        }
      });
    });
  },
  getAll() {
    return new Promise((resolve, reject) => {
      CategoryStore.find({}, (err, categorys) => {
        if (err) {
          reject(err);
        }
        resolve(categorys);
      });
    })
  },
  getById(id) {
    return new Promise((resolve, reject) => {
      CategoryStore.findOne({id}, (err, category) => {
        if (err) {
          reject(err);
        }
        resolve(category);
      });
    })
  },
  deleteById(id) {
    return new Promise((resolve, reject) => {
      CategoryStore.remove({id}, (err) => {
        if (err) {
          reject(err);
        }
        resolve("success");
      });
    })
  }
}

module.exports = CategoryModel;
