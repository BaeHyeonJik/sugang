const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config();

const Pool = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database:  process.env.DATABASE_NAME,
    port: '3306'
});

Pool.connect((err) => {
    if (err) {
      console.error('MySQL 연결 오류: ', err);
      throw err;
    }
    console.log('MySQL에 성공적으로 연결되었습니다.');
  });

module.exports = Pool;
