const express = require('express');
const router = express.Router();
const licenseController = require('./api/license'),
      userController = require('./api/user'),
      bookController = require('./api/books');

router.use('/license', licenseController);
router.use('/user', userController);
router.use('/books', bookController);

router.get('/', (req, res) => {
  res.send('API Home Page');
});

module.exports = router;
