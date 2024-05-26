const express = require('express');
const path = require('path');
const db = require('../db/db');
const router = express.Router();


router.post('/', (req, res) => {
    if (req.session.user.userclass == 'professor'){
        const {title} = req.body
        const query = 'select * from boards where p_id = ? and title = ? order by reg_time desc';
        params = [req.session.user.id, title]
        db.query(query, params, (err, results, fields) => {
            if (err) {
                console.error('error executing query: ' + err.stack);
                res.status(500).send('Server Error');
                return;
            }
            res.render('professor/profboardpage', {boards: results, name: req.session.user.name, num: req.session.user.num, title: title});
        });
    }else{
        const {p_id, title} = req.body
        console.log(p_id, title)
        const query2 = 'select * from boards where p_id = ? and title = ? order by reg_time desc';
        params2 = [p_id, title]
        db.query(query2, params2, (err, results, fields) => {
            if (err) {
                console.error('error executing query: ' + err.stack);
                res.status(500).send('Server Error');
                return;
            }
            res.render('student/showboardpage', {boards: results, name: req.session.user.name, num: req.session.user.num, title: title});
        });
    }
});

module.exports = router;



  