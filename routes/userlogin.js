const express = require('express');
const path = require('path');
const db = require('../db/db');
const router = express.Router();


router.post('/', (req, res) => {
    message = ''
    const { id, password} = req.body;
    const query = 'select * from users where id = ? and password = ?';
    params = [id, password]
    db.query(query, params, (err, results, fields) => {
        if (err) {
            console.error('error executing query: ' + err.stack);
            res.status(500).send('Server Error');
            return;
        }
        if (results.length > 0) {
            req.session.user = {
                id: results[0].id,
                name: results[0].name,
                num: results[0].num,
                userclass: results[0].userclass
            };
            res.render('home', {name: results[0].name, num: results[0].num, userclass: results[0].class});
            
          } else {
            message = '입력하신 정보와 일치하는 ID가 없습니다.'
            res.render('login', {message: message})
        }
    });
});

module.exports = router;



  