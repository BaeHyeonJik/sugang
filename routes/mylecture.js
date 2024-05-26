const express = require('express');
const path = require('path');
const db = require('../db/db');
const router = express.Router();


router.post('/', (req, res) => {
    if (req.session.user.userclass == 'professor'){
        const query = 'select l.title, l.total, coalesce(r.st_count, 0) as st_count, l.credit from lectures as l left join (select title, count(*) as st_count from registers where p_id = ? group by title) r on l.title = r.title where l.p_id = ? order by l.title';
        params = [req.session.user.id, req.session.user.id]
        db.query(query, params, (err, results, fields) => {
            if (err) {
                console.error('error executing query: ' + err.stack);
                res.status(500).send('Server Error');
                return;
            }
            res.render('professor/proflecturepage', {lectures: results, name: req.session.user.name, num: req.session.user.num});
        });
    }else{
        const query = 'select u.id, u.name, t.title, coalesce(t.st_count, 0) as st_count, t.total, t.credit from users as u join (select l.p_id, l.title, coalesce(c.st_count, 0) as st_count, l.total, l.credit from lectures as l left outer join (select p_id, title, count(*) as st_count from registers group by p_id, title) as c on l.p_id = c.p_id and l.title = c.title where (l.p_id, l.title) in (select p_id, title from registers where s_id = ?)) as t on u.id = t.p_id order by u.id;'
        params = [req.session.user.id]
        db.query(query, params, (err, results, fields) => {
            if (err) {
                console.error('error executing query: ' + err.stack);
                res.status(500).send('Server Error');
                return;
            }
            res.render('student/stulecturepage', {lectures: results, name: req.session.user.name, num: req.session.user.num});
        });
    }
});

module.exports = router;



  