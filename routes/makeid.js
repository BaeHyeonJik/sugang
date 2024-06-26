const express = require('express');
const path = require('path');
const db = require('../db/db');
const router = express.Router();

router.post('/', (req, res) => {
    let message = '';
    const { id, password, name, num, userclass } = req.body;
    
    if (id == '' || password == '' || name == '' || num == '' || userclass == '') {
        message = '모든 빈칸이 입력되야 합니다.';
        return res.render('signuppage', { message });
    }

    const query1 = 'SELECT * FROM users WHERE id = ?';
    const params1 = [id];

    db.query(query1, params1, (err, results) => {
        if (err) {
            console.error('MySQL 쿼리 실행 오류: ' + err.stack);
            return res.status(500).send('Server Error');
        }
        
        if (results.length > 0) {
            message = '이미 존재하는 ID입니다.';
            return res.render('signup', { message });
        } else {
            const query2 = 'INSERT INTO users (id, password, name, num, userclass) VALUES (?, ?, ?, ?, ?)';
            const params2 = [id, password, name, num, userclass];

            db.query(query2, params2, (err, results) => {
                if (err) {
                    console.error('MySQL 쿼리 실행 오류: ' + err.stack);
                    return res.status(500).send('Server Error');
                }
                message = ''
                return res.render('loginpage', { message });
            });
        }
    });
});

module.exports = router;
