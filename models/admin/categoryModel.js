var db = require('./db');
module.exports = {

	insert: function(categoryDetails,callbackFromController){
		var sql = "INSERT INTO category VALUES(null,?,?,?)";
		db.execute(sql,[categoryDetails.categoryName,categoryDetails.option,0],function(result){
			callbackFromController(result);
		});
	},

	getAll: function(callbackFromController)
	{
		var sql = "SELECT * FROM category";
		db.execute(sql,null,function(result){
			callbackFromController(result);
		});
	},

	getAllNone: function(callbackFromController)
	{
		var parentCategory = "None";
		var sql = "SELECT * FROM category WHERE parent !='"+parentCategory+"'";
		db.execute(sql,null,function(result){
			callbackFromController(result);
		});
	},

	get: function(id, callbackFromController){
		var sql = "SELECT * FROM category WHERE id=?";
		db.execute(sql, [id], function(result){
			callbackFromController(result[0]);
		});
	},

	getByName: function(name, callbackFromController){
		var sql = "SELECT * FROM category WHERE name=?";
		db.execute(sql, [name], function(result){
			callbackFromController(result);
		});
	},

	update: function(categoryDetails, callbackFromController) {
		var sql = "UPDATE category SET name=?, parent=? WHERE id=?";
		db.execute(sql, [categoryDetails.categoryName, categoryDetails.option, categoryDetails.categoryId], function(result){
			callbackFromController(result);
		});
	} ,

	updateWithoutParent: function(categoryDetails, callbackFromController) {
		var sql = "UPDATE category SET name=? WHERE id=?";
		db.execute(sql, [categoryDetails.categoryName , categoryDetails.categoryId], function(result){
			callbackFromController(result);
		});
	} ,

	updateCategory : function(categoryName, counts , callbackFromController) {
		var sql = "UPDATE category SET count = count + ? WHERE name=?";
		db.execute(sql, [counts,categoryName], function(result){
			callbackFromController(result);
		});
	} ,

	updateCategory2 : function(categoryName, counts , callbackFromController) {
		var sql = "UPDATE category SET count = count - ? WHERE name=?";
		db.execute(sql, [counts , categoryName], function(result){
			callbackFromController(result);
		});
	} ,

	delete: function(categoryDetails, callbackFromController) {
		var sql = "DELETE FROM category WHERE id=?";
		db.execute(sql, [categoryDetails.categoryId], function(result){
			callbackFromController(result);
		});
	} ,

	deleteWithParent: function(parents, callbackFromController) {
		var sql = "DELETE FROM category WHERE parent=?";
		db.execute(sql, [parents], function(result){
			callbackFromController(result);
		});
	} ,

	deleteProduct: function(category, callbackFromController) {
		var sql = "DELETE FROM product WHERE category1=?";
		db.execute(sql, [category], function(result){
			callbackFromController(result);
		});
	}, 

	selectAllProduct: function(category, callbackFromController) {
		var sql = "SELECT * FROM category , product WHERE category.name = product.category1 AND category.parent=?";
		db.execute(sql, [category], function(result){
			callbackFromController(result);
		});
	} 
};