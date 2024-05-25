const express = require('express');
const path = require('path');
const db = require('../db/db');
const router = express.Router();

router.post('/', (req, res) => {
    const {where} = req.body
    if(where == 'signup'){
        res.render('signuppage', {message: ''});
    }else if(where == 'addlecture'){
        res.render('professor/addlecturepage', {message: '', name: req.session.user.name, num: req.session.user.num});
    }else if(where == 'addboard'){
        res.render('professor/addboardpage', {name: req.session.user.name, num: req.session.user.num});
    }
   
});
module.exports = router;