const express = require('express');
const path = require('path');
const router = express.Router();


router.post('/', (req, res) => {
    req.session.destroy(function(){
        req.session;
    });
    res.render('login');    
});

module.exports = router;