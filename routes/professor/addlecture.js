const express = require('express');
const path = require('path');
const db = require('../../db/db');
const router = express.Router();


router.post('/', (req, res) => {
    let message = '';
    const {title, total, credit} = req.body;
    if (title== '' || total == '' || credit == '') {
        message = '모든 빈칸이 입력되야 합니다.';
        return res.render('professor/addlecturepage', { message, name: req.session.user.name, num: req.session.user.num });
    }
    const query1 = 'SELECT * FROM lectures WHERE p_id = ? and title = ?';
    const params1 = [req.session.user.id, title];

    db.query(query1, params1, (err, results) => {
        if (err) {
            console.error('MySQL 쿼리 실행 오류: ' + err.stack);
            return res.status(500).send('Server Error');
        }
        
        if (results.length > 0) {
            message = '이미 등록된 강의입니다.';
            return res.render('professor/addlecturepage', { message, name: req.session.user.name, num: req.session.user.num });
        } else {
            const query2 = 'INSERT INTO lectures (p_id, title, total, credit) VALUES (?, ?, ?, ?)';
            const params2 = [req.session.user.id, title, total, credit];

            db.query(query2, params2, (err, results) => {
                if (err) {
                    console.error('MySQL 쿼리 실행 오류: ' + err.stack);
                    return res.status(500).send('Server Error');
                }
                message = '새로운 강의가 등록되었습니다.'
                res.render('professor/addlecturepage', {message: message, name: req.session.user.name, num: req.session.user.num});
            });
        }
    });
});


module.exports = router;