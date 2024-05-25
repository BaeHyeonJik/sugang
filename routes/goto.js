const express = require('express');
const path = require('path');
const db = require('../db/db');
const router = express.Router();

router.post('/', (req, res) => {
    const {where} = req.body
    if(where == 'signuppage'){
        res.render('signuppage', {message: ''});
    }else if(where == 'addlecturepage'){
        res.render('professor/addlecturepage', {message: '', name: req.session.user.name, num: req.session.user.num});
    }else if(where == 'addboardpage'){
        const {title} = req.body
        res.render('professor/addboardpage', {name: req.session.user.name, num: req.session.user.num, title: title});
    }
   
});
module.exports = router;