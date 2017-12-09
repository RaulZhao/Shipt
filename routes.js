const express = require('express');
const router = express.Router();
const customerController = require('./api/customer_controller');
const productController = require('./api/product_controller');
const categoryController = require('./api/category_controller');
const orderController = require('./api/order_controller');

router.use('/customers', customerController);
router.use('/products', productController);
router.use('/categories', categoryController);
router.use('/orders', orderController);

router.get('/', (req, res) => {
  res.send('API Home Page');
});

module.exports = router;
