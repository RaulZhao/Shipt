const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const router = express.Router();
const ProductModel = require('../model/product');

const init = function() {
  const dummyData = {
    id: 1,
    name: "Apple",
    price: 3,
    weight: 2.7,
    category_id: 20,
    shipping: "pending"
  }
  ProductModel.create(dummyData).then(function(msg) {
    console.log("&&&&&&"+msg);
  }).catch(function(msg) {
    console.log("%%%%%%"+msg);
  });

  ProductModel.getAll().then((data) => {
    console.log(data);
  }).catch((err) => {
    throw err;
  });
}
init();

const error_cb = function(res) {
  res.sendStatus(500);
};

const createProduct = function(req, res) {
  res.header('Access-Control-Allow-Origin', '*');
  const newProduct = req.body;

  if (newProduct) {
    ProductModel.create(newProduct).then(function(msg) {
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

const getAllProducts = function(req, res) {
  ProductModel.getAll().then((data) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.json(data);
  }).catch((err) => {
    throw err;
  });
};

const findProductById = function(req, res) {
  const { id } = req.params;

  if (!id) {
    error_cb(res);
  }
  ProductModel.getById(id).then((data) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.json(data);
  }).catch((err) => {
    throw err;
  });
};

const deleteProductById = function(req, res) {
  const { id } = req.params;

  if (!id) {
    error_cb(res);
  }
  console.log(`Try to delete product with ID: ${id}`);
  ProductModel.deleteById(id).then(() => {
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

router.get('/', getAllProducts);
router.get('/:id', findProductById);
router.post('/', createProduct);
router.delete('/:id', deleteProductById);

module.exports = router;
