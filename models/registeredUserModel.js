var db = require('./db2');
module.exports = {

	insert: function(userDetails,callbackFromController){
		var sql = "INSERT INTO user VALUES(null,?,?,?,?)";
		db.execute(sql,[userDetails.userName,userDetails.userEmail,userDetails.userPass,userDetails.userRole],function(result){
			callbackFromController(result);
		});
	},

	getAll: function(callbackFromController)
	{
		var sql = "SELECT * FROM user";
		db.execute(sql,null,function(result){
			callbackFromController(result);
		});
	},

	verifyUser: function(user, callbackFromController)
	{
		var sql = "SELECT * FROM user WHERE user_name=? AND user_password=?";

		db.execute(sql, [user.username, user.password], function (result){
			
			if(result.length == 1)
			{
				callbackFromController(true);
			}
			else
			{
				callbackFromController(false);
			}
		});
	},

	getUser: function(name, callbackFromController){
		var sql = "SELECT * FROM user WHERE user_name=?";
		db.execute(sql, [name], function(result){
			callbackFromController(result[0]);
		});
	}
};