const express = require('express');
const router = express.Router();

const DEFAULT_USER = {
  "id": "jwefo9239wfi0few9",
  "name": "raul",
  "email": "raulzhao1986@gmail.com"
}

function indexUser(req, res) {
  res.json(DEFAULT_USER);
}

router.get('/', indexUser)

module.exports = router;
