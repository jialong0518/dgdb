let mysql = require('mysql');
    
    
    let Pm = new Promise(function (resolve, reject) {
        let db_config={
            host:"localhost",
            user:"root",
            password:"123456",
            port:"3306",
            database:"dgdbDate" 
        };  
        let connection=mysql.createConnection({
            host:"localhost",
            user:"root",
            password:"123456",
            port:"3306",
            database:"dgdbDate" 
        });
        //开始链接数据库
        connection.connect(function(err){
            if(err){
                console.log(`mysql连接失败: ${err}!`);
            }else{
                console.log("mysql连接成功!");
            }
        });
        let sqlQuery="select * from login";
         let qwe =  connection.query(sqlQuery,function(err,result){
            if(err){
                console.log(`SQL error: ${err}!`);
            }else{
                resolve( result )
                console.log(result);
            }
        });
    })
    export { Pm }
