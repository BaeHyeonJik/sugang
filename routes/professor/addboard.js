const express = require('express');
const path = require('path');
const db = require('../../db/db');
const router = express.Router();

router.post('/', (req, res) => {
    let message = '';
    const {title, boardtitle, content} = req.body;

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;


    if (boardtitle == '' || content == '') {
        message = '모든 빈칸이 입력되야 합니다.';
        return res.render('professor/addboardpage', {name: req.session.user.name, num: req.session.user.num, title: title, message: message});
    }
    const query = 'INSERT INTO boards (p_id, title, boardtitle, content, reg_time) VALUES (?, ?, ?, ?, ?)';
    const params = [req.session.user.id, title, boardtitle, content, formattedDate];

    db.query(query, params, (err, results) => {
        if (err) {
            console.error('MySQL 쿼리 실행 오류: ' + err.stack);
            return res.status(500).send('Server Error');
        }
        message = '새로운 게시물이 등록되었습니다.'
        res.render('professor/addboardpage', {name: req.session.user.name, num: req.session.user.num, title: title, message: message});
    });
});





module.exports = router;