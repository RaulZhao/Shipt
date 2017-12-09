const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const router = express.Router();
const OrderModel = require('../model/order');

const init = function() {
  const dummyData = {
    customer_id: 1,
    customer_name: "Zhang",
    products: [1,2],
    shipping_status: "pending"
  }
  OrderModel.create(dummyData).then(function(msg) {
    console.log("&&&&&&"+msg);
  }).catch(function(msg) {
    console.log("%%%%%%"+msg);
  });
}
init();

const error_cb = function(res) {
  res.sendStatus(500);
};

const createOrder = function(req, res) {
  res.header('Access-Control-Allow-Origin', '*');
  const newOrder = req.body;

  if (newOrder) {
    OrderModel.create(newOrder).then(function(msg) {
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

const getAllOrders = function(req, res) {
  OrderModel.getAll().then((data) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.json(data);
  }).catch((err) => {
    throw err;
  });
};

const findOrderById = function(req, res) {
  const { id } = req.params;

  if (!id) {
    error_cb(res);
  }
  OrderModel.getById(id).then((data) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.json(data);
  }).catch((err) => {
    throw err;
  });
};

const deleteOrderById = function(req, res) {
  const { id } = req.params;

  if (!id) {
    error_cb(res);
  }
  console.log(`Try to delete order with ID: ${id}`);
  OrderModel.deleteById(id).then(() => {
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

router.get('/', getAllOrders);
router.get('/:id', findOrderById);
router.post('/', createOrder);
router.delete('/:id', deleteOrderById);

module.exports = router;
