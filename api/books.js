const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const router = express.Router();
const Books = require('../model/book');

const createBook = function(req, res) {
  res.header('Access-Control-Allow-Origin', '*');
  const newBook = req.body;

  if (newBook) {
    const book = Books(newBook);

    Books.find({objectID: newBook.objectID}, function(err, books) {
      if (err) throw err;
      if (books.length > 0) {
        res.status(500).send({
          state: "error",
          message: "duplicated book"
        })
      } else {
        book.save(function(err) {
          if (err) throw err;
          console.log(`New Book ${newBook.title} is created!`);
          res.send({state: "success"});
        });
      }
    });
  } else {
    res.sendStatus(500, {
      "Content-Type": "text/plain;charset=utf-8"
    });
  }
}

const getAllBooks = function(req, res) {
  Books.find({}, (err, books) => {
    if (err) throw err;
    res.header('Access-Control-Allow-Origin', '*');
    res.json(books);
  });
};

const findByObjectId = function(req, res) {
  const { objectId } = req.params;

  Books.findOne({objectID: objectId}, (err, book) => {
    if (err) throw err;
    res.header('Access-Control-Allow-Origin', '*');
    res.json(book);
  });
};

const deleteByObjectId = function(req, res) {
  const { objectId } = req.params;

  Books.remove({objectID: objectId}, (err, dBook) => {
    if (err) throw err;
    res.header('Access-Control-Allow-Origin', '*');
    res.json({
      state: 'success'
    });
  });
};

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', getAllBooks);
router.get('/:objectId', findByObjectId);
router.post('/', createBook);
router.delete('/:objectId', deleteByObjectId);

module.exports = router;
