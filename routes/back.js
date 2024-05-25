const express = require('express');
const path = require('path');
const db = require('../db/db');
const router = express.Router();

router.post('/', (req, res) => {
    const {where} = req.body
    if(where == 'loginpage'){
        res.render('loginpage', {message: ''});
    }else if(where == 'homepage'){
        res.render('homepage', {name: req.session.user.name, num: req.session.user.num, userclass: req.session.user.userclass});
    };
});
module.exports = router;