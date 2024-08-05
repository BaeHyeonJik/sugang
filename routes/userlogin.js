const express = require('express');
const path = require('path');
const Pool = require('../db/db');
const router = express.Router();


router.post('/', async (req, res) => {
    const connection = Pool.getConnection();
    const { id, password} = req.body;
    try{
        let response = {};
        const userInfo = await connection.query(
            `SELECT * FROM users WHERE id = ? AND password = ?`, 
            [id, password]
        ).then(([v]) => {
            return {
                id: v.id,
                name: v.name,
                num: v.num,
                userclass: v.userclass
            }
        })
        if(userInfo.length > 0){
            response = {
                statusCode: 200,
                userInfo: userInfo,
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



  
