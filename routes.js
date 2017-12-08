const express = require('express');
const router = express.Router();
const licenseController = require('./api/license'),
      userController = require('./api/user'),
      productController = require('./api/products');

router.use('/license', licenseController);
router.use('/user', userController);
router.use('/products', productController);

router.get('/', (req, res) => {
  res.send('API Home Page');
});

module.exports = router;
