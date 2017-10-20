var db=require.main.require('./models/customerModels/db');

module.exports={

	getCustomer : function(id,callback){
		
		
        var sql='select * from users WHERE id=?';
		db.execute(sql,[id],function(result){

			 callback(result);

		});

	},

	getMenu : function(name,callback){
		
		
        var sql='select * from category , product WHERE category.name = product.category1 AND (category.name = ? OR category.parent = ? )';
		db.execute(sql,[name,name],function(result){

			 callback(result);

		});

	},

	getAllMenu : function(callback){
		
		
        var sql='select * from category';
		db.execute(sql,null,function(result){

			 callback(result);

		});

	},

	getChart : function(name,callback){
		
		
        var sql='select * from chart WHERE userName=?';
		db.execute(sql,[name],function(result){

			 callback(result);

		});

	},

	getAllProduct : function(callback){
		
		var sql='select * from product';
		db.execute(sql,null,function(result){

			 callback(result);

		});

	},

	totalAmount : function(callback){
		
		var sql="select sum(pricee) as pricee from orders WHERE status='Delivered'";
		db.execute(sql,null,function(result){

			 callback(result[0]);

		});

	},

	totalSold : function(callback){
		
		var sql="select count(sku) as product from orders WHERE status='Delivered'";
		db.execute(sql,null,function(result){

			 callback(result[0]);

		});

	},

	getProductDetails : function(name,callback){
		
		
        var sql='select * from product WHERE name=?';
		db.execute(sql,[name],function(result){

			 callback(result);

		});

	},

	addToChart : function(chart,callback){
		
		//console.log(chart.userName);
		
        var sql='INSERT INTO chart(id, userName, productName, quantity, pricee, sku) VALUES (null,?,?,?,?,?)';
		db.execute(sql,[chart.userName,chart.productName,chart.quantity,chart.unitPrice,chart.sku],function(result){

			 callback(result);

		});

	},
	getChartById : function(id,callback){
		
		
        var sql='select * from chart WHERE id=?';
		db.execute(sql,[id],function(result){

			 callback(result);

		});

	},

	updateChartById : function(id,quantity,callback){
		
		
        var sql='UPDATE chart SET quantity=? WHERE id=?';
		db.execute(sql,[quantity,id],function(result){

			 callback(result);

		});

	},

	removeChartById : function(id,callback){
		
		
        var sql='DELETE FROM chart WHERE id=?';
		db.execute(sql,[id],function(result){

			 callback(result);

		});

	},

	updateProduct : function(name,quantity,callback){

		var sql='UPDATE product SET quantity=? WHERE name=?';
		db.execute(sql,[quantity,name],function(result){

			 callback(result);

		});



	},

	getOrderbyName : function(name,callback){

		var sql='SELECT * FROM orders , product  WHERE product.sku = orders.sku AND orders.customer = ?';
		db.execute(sql,[name],function(result){

			 callback(result);

		});



	},



	removeChart : function(id,callback){
		var sql='DELETE FROM chart WHERE id=?';
		db.execute(sql,[id],function(result){

			 callback(result);

		});

	},

	addOrder : function(order,callback){
		var date= new Date();
		var currentDate = date.getDate()+'.'+date.getMonth()+'.'+date.getFullYear();
		var cDate = currentDate.toString();
		//console.log(cDate);
		var sql='INSERT INTO `orders`(`id`, `sku`, `customer`, `quantity`, `date`, `pricee`, `status` , `address` , `phone`) VALUES (null,?,?,?,?,?,"Pending",?,?)';
		//console.log(order.sku,order.userName,order.quantity,order.totalPrice,currentDate);
		db.execute(sql,[order.sku,order.userName,order.quantity,currentDate,order.totalPrice,order.address,order.phone],function(result){

			 callback(result);

		});

	},

	getProductByNmae : function(name,callback){

		var sql='select * from product WHERE name=?';
		db.execute(sql,[name],function(result){

			 callback(result);

		});


	},

	getUserDetails : function(name,callback){
		var sql='select * from user WHERE user_name=?';

		db.execute(sql,[name],function(result){

			 callback(result);

		});


	},

	getAllOrdrs : function(callback){

		 var sql='select * from `orders`';
		 db.execute(sql,null,function(result){

			 callback(result);

		});

	},
	getOrderByCstmr : function(name,i,callback){

		var sql='select `orders`.`customer`,`orders`.`quantity`,`orders`.`date`,`orders`.`pricee`,`orders`.`status`,`product`.`name` FROM `orders` JOIN `product` ON `orders`.`sku`=`product`.`sku` WHERE `orders`.`customer`=?;';

		db.execute(sql,[name],function(result){

			 callback(result,i);

		});


	},

	getOrderByPrdt :  function(sku,callback){

		var sql='select `orders`.`customer`,`orders`.`quantity`,`orders`.`date`,`orders`.`pricee`,`orders`.`status`,`product`.`name` FROM `orders` JOIN `product` ON `orders`.`sku`=`product`.`sku` WHERE `orders`.`sku`=?;';

		db.execute(sql,[sku],function(result){

			 callback(result);

		});


	},

	getProductBySku : function(sku,callback){

		var sql='select * from product WHERE sku=?';
		db.execute(sql,[sku],function(result){

			 callback(result);

		});


	}



}