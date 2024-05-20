const express = require('express');
const path = require('path');
const db = require('../db/db');
const router = express.Router();


router.post('/', (req, res) => {
    message = ''
    const { id, password } = req.body;
    const query = 'select * from users where id = ? and password = ?';
    params = [id, password]
    db.query(query, params, (err, results, fields) => {
        if (err) {
            console.error('error executing query: ' + err.stack);
            res.status(500).send('Server Error');
            return;
        }
        if (results.length > 0) {
            res.render('home')
          } else {
            message = '입력하신 정보와 일치하는 ID가 없습니다.'
            res.render('login', {message: message})
        }
    });
});

module.exports = router;



  