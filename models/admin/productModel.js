var db = require('./db');
module.exports = {

	insert: function(productDetails,callbackFromController){
		var sql = "INSERT INTO product VALUES(null,?,?,?,?,?,?,?)";
		db.execute(sql,[productDetails.productName,productDetails.productSku,productDetails.productPrice,productDetails.productDescription,productDetails.productStock,productDetails.productImage,
			productDetails.productCategory1],function(result){
			callbackFromController(result);
		});
	},

	getAllInfo: function(callbackFromController)
	{
		var sql = "SELECT * FROM product , category WHERE product.category1=category.name";
		db.execute(sql,null,function(result){
			callbackFromController(result);
		});
	} ,

	getAllInfo2: function(name,callbackFromController)
	{
		var sql = "SELECT * FROM product , category WHERE product.category1=category.name AND product.category1 = ?";
		db.execute(sql,[name],function(result){
			callbackFromController(result[0]);
		});
	} ,

	getAll: function(callbackFromController)
	{
		var sql = "SELECT * FROM product";
		db.execute(sql,null,function(result){
			callbackFromController(result);
		});
	} ,

	updateNoCategory: function(id , productDetails, callbackFromController) {
		var sql = "UPDATE product SET name=? , sku=? , price=? , description=? , quantity=? , image1=? WHERE id=?";
		db.execute(sql, [productDetails.productName,productDetails.productSku,productDetails.productPrice,productDetails.productDescription,productDetails.productStock,productDetails.productImage,
			id] , function(result){
			callbackFromController(result);
		});
	} ,

	updateNoCategory2: function(id , productDetails, callbackFromController) {
		var sql = "UPDATE product SET name=? , sku=? , price=? , description=? , quantity=?  WHERE id=?";
		db.execute(sql, [productDetails.productName,productDetails.productSku,productDetails.productPrice,productDetails.productDescription,productDetails.productStock,
			id] , function(result){
			callbackFromController(result);
		});
	} ,

	updateWithCategory: function(id , productDetails, callbackFromController) {
		var sql = "UPDATE product SET name=? , sku=? , price=? , description=? , quantity=? , image1=? , category1=?  WHERE id=?";
		db.execute(sql, [productDetails.productName,productDetails.productSku,productDetails.productPrice,productDetails.productDescription,productDetails.productStock,productDetails.productImage,
  productDetails.productCategory1 , id] , function(result){
			callbackFromController(result);
		});
	} ,

	updateWithCategory2: function(id , productDetails, callbackFromController) {
		var sql = "UPDATE product SET name=? , sku=? , price=? , description=? , quantity=? , category1=?  WHERE id=?";
		db.execute(sql, [productDetails.productName,productDetails.productSku,productDetails.productPrice,productDetails.productDescription,productDetails.productStock,
  productDetails.productCategory1 , id] , function(result){
			callbackFromController(result);
		});
	} ,

	updateCategory : function(categoryName, callbackFromController) {
		var sql = "UPDATE category SET count = count + 1 WHERE name=?";
		db.execute(sql, [categoryName], function(result){
			callbackFromController(result);
		});
	} ,

	updateCategory2 : function(categoryName, callbackFromController) {
		var sql = "UPDATE category SET count = count - 1 WHERE name=?";
		db.execute(sql, [categoryName], function(result){
			callbackFromController(result);
		});
	} ,

	get: function(id, callbackFromController){
		var sql = "SELECT * FROM product WHERE id=?";
		db.execute(sql, [id], function(result){
			callbackFromController(result[0]);
		});
	} ,

	getByCategory: function(name, callbackFromController){
		var sql = "SELECT * FROM category WHERE name=?";
		db.execute(sql, [name], function(result){
			callbackFromController(result[0]);
		});
	},

	getByProduct: function(name, callbackFromController){
		var sql = "SELECT * FROM product WHERE name=?";
		db.execute(sql, [name], function(result){
			callbackFromController(result);
		});
	},

	delete: function(category, callbackFromController) {
		var sql = "DELETE FROM product WHERE category1=?";
		db.execute(sql, [category], function(result){
			callbackFromController(result);
		});
	}

	 /*select: function(name, callbackFromController){
		var sql = "SELECT * FROM product,category WHERE product.category1=?";
		db.execute(sql, [name], function(result){
			callbackFromController(result[0]);
		});
	}*/
};