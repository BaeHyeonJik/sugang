const express = require('express');
const path = require('path');
const db = require('../db/db');
const router = express.Router();


router.post('/', (req, res) => {
    if (req.session.user.userclass == 'professor'){
        const query = 'select l.title, l.total, coalesce(r.st_count, 0) as st_count, l.credit from lectures as l left join (select title, count(*) as st_count from registers where p_id = ? group by title) r on l.title = r.title where l.p_id = ?';
        params = [req.session.user.id, req.session.user.id]
        db.query(query, params, (err, results, fields) => {
            if (err) {
                console.error('error executing query: ' + err.stack);
                res.status(500).send('Server Error');
                return;
            }
            res.render('professor/proflecturepage', {lectures: results, name: req.session.user.name, num: req.session.user.num, userclass: req.session.user.userclass});
        });
    }else{
        res.send('hi')
    }
});

module.exports = router;



  