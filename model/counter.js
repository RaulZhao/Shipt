const express = require('express');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const counterSchema = new Schema({
  _id: {type: String, default: 'entityId'},
  seq: {type: Number, default: 0}
}, { collection: 'counter' });

const counter = mongoose.model('counter', counterSchema);
counter({
  _id: 'productId'
}).save();

module.exports = counter;
