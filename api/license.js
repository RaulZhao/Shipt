const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

function indexLicense(req, res) {
  res.json({'licenseId': '12345677654321'});
}

function downloadLicense(req, res) {
  const licenseFile = path.resolve(__dirname, "../db/license.json");

  res.download(licenseFile, "license.json", (err) => {
    if(err) {
      console.log(`***** Error happens when download file ${licenseFile}`, err);
    } else {
      console.log(`***** Successfully download file ${licenseFile}`);
    }
  });
}

function uploadLicense(req, res) {
  console.log(`File upload is not supported for now`);
}

router.get('/', indexLicense);
router.get('/download', downloadLicense);
router.get('/upload', uploadLicense);

module.exports = router;
