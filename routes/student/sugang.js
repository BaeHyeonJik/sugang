const express = require('express');
const path = require('path');
const db = require('../../db/db');
const router = express.Router();

router.post('/', (req, res) => {
    let message = '';
    const { p_id, title, st_count, total } = req.body;
    if (st_count < total) {
        const query1 = 'select * from registers where s_id = ? and p_id = ? and title = ?';
        const params1 = [req.session.user.id, p_id, title];
        db.query(query1, params1, (err, results) => {
            if (err) {
                console.error('MySQL 쿼리 실행 오류: ' + err.stack);
                return res.status(500).send('Server Error1');
            }
            if (results.length > 0) {
                message = '이미 수강신청을 했습니다.';
                executeQuery3();
            } else {
                message = '수강신청되었습니다.';
                const query2 = 'insert into registers values(?, ?, ?)';
                const params2 = [req.session.user.id, p_id, title];
                db.query(query2, params2, (err, results) => {
                    if (err) {
                        console.error('MySQL 쿼리 실행 오류: ' + err.stack);
                        return res.status(500).send('Server Error2');
                    }
                    executeQuery3();
                });
            }
        });
    } else {
        message = '수강인원이 꽉 찼습니다.';
        executeQuery3();
    }

    function executeQuery3() {
        const query3 = 'select u.id, u.name, t.title, coalesce(t.st_count, 0) as st_count, t.total, t.credit from users as u join (select l.p_id, l.title, coalesce(c.st_count, 0) as st_count, l.total, l.credit from lectures as l left outer join (select p_id, title, count(*) as st_count from registers group by p_id, title) as c on l.p_id = c.p_id and l.title = c.title) as t on u.id = t.p_id order by u.id';
        db.query(query3, (err, results) => {
            if (err) {
                console.error('MySQL 쿼리 실행 오류: ' + err.stack);
                return res.status(500).send('Server Error3');
            }
            res.render('student/sugangpage', { lectures: results, message: message, name: req.session.user.name, num: req.session.user.num });
        });
    }
});

module.exports = router;
