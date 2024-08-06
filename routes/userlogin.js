const express = require('express');
const path = require('path');
const bcrypt = require("bcryptjs");
const Pool = require('../db/db');
const router = express.Router();

const comparePassword = async (password, hash) => {
    const isResult = await bcrypt.compare(password, hash);
    return isResult;
}

router.post('/', async (req, res) => {
    const connection = Pool.getConnection();
    const {id, password} = req.body;
    try{
        id = id.trim();
        password = password.trim();
        let response = {};
        const [userInfo] = await connection.query(
            `SELECT * FROM users WHERE id = ?`, 
            [id]
        )
        if(userInfo.length > 0 && comparePassword(password, userInfo.password)){          
            response = {
                statusCode: 200,
                userInfo: {
                    id: userInfo.id,
                    name: userInfo.name,
                    num: userInfo.num,
                    userclass: userInfo.userclass
                },
                message: 'MATCH'   
            }          
        } else { 
            response = {
                statusCode: 200,
                message: 'NOT MATCH'
            }
        }
        res.status(200).json(response);
    } catch (err) {
        res.status(400).json(err);
    } finally {
        connection.release();
    }
});

module.exports = router;



  
