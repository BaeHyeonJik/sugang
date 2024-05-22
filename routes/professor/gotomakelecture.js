const express = require('express');
const path = require('path');
const db = require('../../db/db');
const router = express.Router();

router.post('/', (req, res) => {
    res.render('professor/addlecture', {message: '', name: req.session.user.name, num: req.session.user.num});
});


module.exports = router;