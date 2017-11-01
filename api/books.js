const express = require('express');
const router = express.Router();
const Books = require('../model/book');

const addBook = function(req, res) {
  const newBook = Books({
    title: "aa",
    url: "bb",
    author: "cc",
    num_comments: "123",
    pints: "234",
    objectID: "456"
  });

  newBook.save(function(err) {
    if (err) throw err;

    console.log('Book created!');
  });
}

const getAllBooks = function(req, res) {
  Books.find({}, (err, books) => {
    if (err) throw err;
    res.header('Access-Control-Allow-Origin', '*');
    res.json(books);
  });
};

const findById = function(req, res) {
  const { id } = req.params;

  Books.findById(id, (err, book) => {
    if (err) throw err;
    res.header('Access-Control-Allow-Origin', '*');
    res.json(book);
  });
};

router.get('/', getAllBooks);
router.get('/:id', findById);

module.exports = router;
