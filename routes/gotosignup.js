const express = require('express');
const path = require('path');
const db = require('../db/db');
const router = express.Router();

router.post('/', (req, res) => {
    res.render('signup', {message: ''});
});

module.exports = router;