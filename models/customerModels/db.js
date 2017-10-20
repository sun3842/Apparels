var mysql=require('mysql');

var connection=mysql.createConnection(
		{
			host     : 'localhost',
			user     : 'root',
			password : '',
			database : 'apparels2'
		}
	);
connection.connect();
module.exports={
	execute: function(sql,param,callback){

		if(param == null)
		{
			connection.query(sql, function(err, result){
				if(err)
				{
					console.log(err);
				}
				else
				{
					callback(result);
				}
			});
		}
		else
		{
			connection.query(sql, param, function(err, result){
				if(err)
				{
					console.log(sql);
					console.log(err);
				}
				else
				{
					//console.log(sql);

					callback(result);
				}
			});
		}

	}
};