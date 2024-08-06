const express = require('express');
const path = require('path');
const Pool = require('../db/db');
const bcrypt = require("bcryptjs");
const router = express.Router();

const hash = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
}

router.post('/', async (req, res) => {
    const connection = Pool.getConnection();
    const { id, password, name, num, userclass } = req.body;
    try{
        id = id.trim();
        password = password.trim();
        name = name.trim();
        num = num.trim();
        password = await hash(password);
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
