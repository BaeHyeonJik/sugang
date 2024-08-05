const express = require('express');
const path = require('path');
const Pool = require('../db/db');
const router = express.Router();

router.post('/', async (req, res) => {
    const connection = Pool.getConnection();
    const { id, password, name, num, userclass } = req.body;
    try{
        const [userId] = await connection.query(
            `SELECT * FROM users WHERE id = ?`, 
            [id]
        )
        if(id == '' || password == '' || name == '' || num == '' || userclass == ''){
            res.status(200).json({ statusCode: 200 });
        }
        if(userId.length > 0){
            res.status(200).json({ statusCode: 200 });
        } else {
            await connection.query(
                `INSERT INTO users (id, password, name, num, userclass) VALUES (?, ?, ?, ?, ?)`,
                [id, password, name, num, userclass]
            )
            res.status(200).json({ statusCode: 200 });
        }
    } catch (err) {
        res.status(400).json({ statusCode: 400 });
        return response;
    } finally {
        connection.release();
    }
});

module.exports = router;
