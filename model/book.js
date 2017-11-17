const express = require('express');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: String,
  url: String,
  author: String,
  num_comments: Number,
  points: Number,
  objectID: Number
}, { collection: 'book_store' });

const BookStore = mongoose.model('book_store', bookSchema);

module.exports = BookStore;
