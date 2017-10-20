var db = require('./db');
module.exports = {

	getAll: function(callbackFromController)
	{
		var sql = "SELECT * FROM orders , product WHERE product.sku = orders.sku";
		db.execute(sql,null,function(result){
			callbackFromController(result);
		});
	},

	getOrders: function(callbackFromController)
	{
		var sql = "SELECT * FROM orders";
		db.execute(sql,null,function(result){
			callbackFromController(result);
		});
	},

	getOrderId: function(name,callbackFromController)
	{
		var sql = "SELECT orders.id FROM orders , product WHERE product.sku = orders.sku AND product.name = ?";
		db.execute(sql,[name],function(result){
			callbackFromController(result);
		});
	},

	updateOrderId: function(status,id,callbackFromController)
	{
		var sql = "UPDATE orders SET status = ? WHERE id=?";
		db.execute(sql,[status,id],function(result){
			callbackFromController(result);
		});
	},

	getByName: function(name,callbackFromController)
	{
		var sql = "SELECT * FROM orders , product WHERE product.sku = orders.sku AND product.name = ?";
		db.execute(sql,[name],function(result){
			callbackFromController(result);
		});
	},

	gets: function(id,callbackFromController)
	{
		var sql = "SELECT * FROM orders , product WHERE product.sku = orders.sku AND orders.id = ?";
		db.execute(sql,[id],function(result){
			callbackFromController(result[0]);
		});
	}
};