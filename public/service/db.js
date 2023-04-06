const mysql = require('mysql');

const pool = mysql.createPool({
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: '111111',
    database: 'test1',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const db = {
    getConnection : (callback)=>{
      pool.getConnection((err, conn)=>{ 
        if(err)throw err; //연결 오류 발생시 상위 함수로 오류를 던지기
        callback(conn); //상위 함수에서 보낸 콜백함수에 conn이라는 Connection 객체를 파라미터로 담고 호출
      });
    }
  }
  
  module.exports = db; //db객체 반환