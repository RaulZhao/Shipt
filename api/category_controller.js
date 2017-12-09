const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const router = express.Router();
const CategoryModel = require('../model/category');

const error_cb = function(res) {
  res.sendStatus(500);
};

const createCategory = function(req, res) {
  res.header('Access-Control-Allow-Origin', '*');
  const newCategory = req.body;

  if (newCategory) {
    CategoryModel.create(newCategory).then(function(msg) {
      res.send({state: "success"});
    }).catch(function(message) {
      res.status(500).send({
        state: "error",
        message
      });
    });
  } else {
    error_cb(res);
  }
}

const getAllCategorys = function(req, res) {
  CategoryModel.getAll().then((data) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.json(data);
  }).catch((err) => {
    throw err;
  });
};

const findCategoryById = function(req, res) {
  const { id } = req.params;

  if (!id) {
    error_cb(res);
  }
  CategoryModel.getById(id).then((data) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.json(data);
  }).catch((err) => {
    throw err;
  });
};

const deleteCategoryById = function(req, res) {
  const { id } = req.params;

  if (!id) {
    error_cb(res);
  }
  console.log(`Try to delete Category with ID: ${id}`);
  CategoryModel.deleteById(id).then(() => {
    res.header('Access-Control-Allow-Origin', '*');
    res.json({
      state: 'success'
    });
  }).catch((err) => {
    throw err;
  });
};


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', getAllCategorys);
router.get('/:id', findCategoryById);
router.post('/', createCategory);
router.delete('/:id', deleteCategoryById);

module.exports = router;
