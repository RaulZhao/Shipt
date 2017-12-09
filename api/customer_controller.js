const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const router = express.Router();
const CustomerModel = require('../model/customer');

const init = function() {
  const dummyData = {
    first_name: "San",
    last_name: "Zhang",
    email: "aaa.bb@gmail.com",
    phone: "8888888",
    address: "1234 Hope Drive"
  }
  CustomerModel.create(dummyData).then(function(msg) {
    console.log("&&&&&&"+msg);
  }).catch(function(msg) {
    console.log("%%%%%%"+msg);
  });
}
init();

const error_cb = function(res) {
  res.sendStatus(500);
};

const createCustomer = function(req, res) {
  res.header('Access-Control-Allow-Origin', '*');
  const newCustomer = req.body;

  if (newCustomer) {
    CustomerModel.create(newCustomer).then(function(msg) {
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

const getAllCustomers = function(req, res) {
  CustomerModel.getAll().then((data) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.json(data);
  }).catch((err) => {
    throw err;
  });
};

const findCustomerById = function(req, res) {
  const { id } = req.params;

  if (!id) {
    error_cb(res);
  }
  CustomerModel.getById(id).then((data) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.json(data);
  }).catch((err) => {
    throw err;
  });
};

const deleteCustomerById = function(req, res) {
  const { id } = req.params;

  if (!id) {
    error_cb(res);
  }
  console.log(`Try to delete Customer with ID: ${id}`);
  CustomerModel.deleteById(id).then(() => {
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

router.get('/', getAllCustomers);
router.get('/:id', findCustomerById);
router.post('/', createCustomer);
router.delete('/:id', deleteCustomerById);

module.exports = router;
