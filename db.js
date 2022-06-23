const mysql = require('mysql');

const connection = mysql.createConnection({
  host     : 'us-cdbr-east-05.cleardb.net',
  user     : 'bc1b90d39f1495',
  password : '93fc10e3',
  port : '3306',
  database : 'heroku_17e8f4382e59ccc',
  dateStrings : 'date' //날짜 시간 출력
});
 


//리스트 전체를 불러오는 함수
function getAllMemos(callback) {
    connection.query('select * from memos ORDER BY id DESC' , 
    (err, rows, fields) => {
        if(err) throw err;
        callback(rows);
    });
}

//리스트에 새로운 내용을 추가하는 함수
function insertMemo(content, title,writer,callback) {
    connection.query(`INSERT INTO memos(content, created, updated, title, writer) VALUES('${content}',NOW(), NOW(),'${title}','${writer}')`,(err, result) => {
        if(err) throw err;
        callback();
    });
}

//리스트 중 id값이 일치하는 row만 불러오는 방법
function getMemoById(id, callback) {
    connection.query(`SELECT * from memos WHERE ID = ${id}` , (err, row, fields) => {
        if(err) throw err;
        callback(row);
    });
}

//리스트를 수정하고 싶을 때 id값이 일치하는 부분을 수정하는 함수
function updateMemoById(id, content , title, writer,callback){
    connection.query(`UPDATE MEMOS SET CONTENT='${content}', title='${title}',writer='${writer}', updated=NOW() WHERE ID='${id}'`, (err, result) => {
        if(err) throw err;
        callback();
    });
}


//리스트 중 id값이 일치하는 부분을 삭제하는 함수
function deleteMemoById(id, callback) {
    connection.query(`DELETE from memos WHERE ID = ${id}` , (err, result) => {
        if(err) throw err;
        callback();
    });
}



module.exports = {
    getAllMemos,
    insertMemo,
    getMemoById,
    updateMemoById,
    deleteMemoById
}

