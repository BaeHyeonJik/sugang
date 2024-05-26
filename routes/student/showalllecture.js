const express = require('express');
const path = require('path');
const db = require('../../db/db');
const router = express.Router();


router.post('/', (req, res) => {
    const query = 'select u.id, u.name, t.title, coalesce(t.st_count, 0) as st_count, t.total, t.credit from users as u join (select l.p_id, l.title, coalesce(c.st_count, 0) as st_count, l.total, l.credit from lectures as l left outer join (select p_id, title, count(*) as st_count from registers group by p_id, title) as c on l.p_id = c.p_id and l.title = c.title) as t on u.id = t.p_id order by u.id';
    db.query(query, params, (err, results) => {
        if (err) {
            console.error('MySQL 쿼리 실행 오류: ' + err.stack);
            return res.status(500).send('Server Error');
        }
        res.render('student/sugangpage', {lectures: results, message: '', name: req.session.user.name, num: req.session.user.num});
    });
});


module.exports = router;