const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();

router.get('/', (req, res, next) => {
  // 1. Import rootDir from '../util/path' module (line 5)
  // 2. rootDir already points to the project root directory
  // 3. Use path.join() to construct the path from root to views folder
  res.sendFile(path.join(rootDir, 'views', 'shop.html'));
});

module.exports = router;
