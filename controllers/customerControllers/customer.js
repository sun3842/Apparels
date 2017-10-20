var express=require('express');
var router=express.Router();
var customerModel=require.main.require('./models/customerModels/customerModel');


router.get('/customer/:name',function(req,res){
		//req.session.userName='star';
		var ip =req.socket.remoteAddress;
		if(req.session.userName&&req.session.userName!=null){
			userName=req.session.userName;
		}
		else userName=ip;
		customerModel.getChart(userName,function(result){
			chartNumber=result.length;
			customerModel.getAllProduct(function(result){

				customerModel.getAllMenu(function(menus){
				//console.log(result.length);
				res.render('customerViews/home',{customer:userName,chart:chartNumber,product:result,menu:menus});
			});

		  });		
			
		});
		//res.render('customer/home',{customer:result[0]});
	//res.render('customer/home',{id:req.params.id});
});

router.get('/customers/:name/:ids',function(req,res){
		//req.session.userName='star';
		var ip =req.socket.remoteAddress;
		if(req.session.userName&&req.session.userName!=null){
			userName=req.session.userName;
		}
		else userName=ip;
		customerModel.getChart(userName,function(result){
			chartNumber=result.length;
			customerModel.getMenu(req.params.ids,function(results){
			customerModel.getAllMenu(function(menus){	
				//console.log(result.length);
				res.render('customerViews/home',{customer:userName,chart:chartNumber,product:results,menu:menus});
			});

		  });	
			
		});
		//res.render('customer/home',{customer:result[0]});
	//res.render('customer/home',{id:req.params.id});
});

router.post('/customer/:name',function(req,res){
		//req.session.userName='star';
		var ip =req.socket.remoteAddress;
		if(req.session.userName&&req.session.userName!=null){
			userName=req.session.userName;
		}
		else userName=ip;
		customerModel.getChart(userName,function(result){
			chartNumber=result.length;
			customerModel.getProductByNmae(req.body.searchBox,function(result){
				//console.log(result.length);
				  customerModel.getAllMenu(function(menus){

				     res.render('customerViews/home',{customer:userName,chart:chartNumber,product:result,menu:menus});
			});

		  });		  
			
		});
		//res.render('customer/home',{customer:result[0]});
	//res.render('customer/home',{id:req.params.id});
});

router.post('/customers/:name/:ids',function(req,res){
		//req.session.userName='star';
		var ip =req.socket.remoteAddress;
		if(req.session.userName&&req.session.userName!=null){
			userName=req.session.userName;
		}
		else userName=ip;
		customerModel.getChart(userName,function(result){
			chartNumber=result.length;
			customerModel.getMenu(req.params.ids,function(results){
			customerModel.getAllMenu(function(menus){	
				//console.log(result.length);
				res.render('customerViews/home',{customer:userName,chart:chartNumber,product:results,menu:menus});
			});

		  });	
			
		});
		//res.render('customer/home',{customer:result[0]});
	//res.render('customer/home',{id:req.params.id});
});



//**************************************************************************************temp
router.post('/customer',function(req,res){
		//req.session.userName='star';
		var ip =req.socket.remoteAddress;
		if(req.session.userName&&req.session.userName!=null){
			userName=req.session.userName;
		}
		else userName=ip;
		customerModel.getChart(userName,function(result){
			chartNumber=result.length;
			customerModel.getAllProduct(function(result){
				//console.log(result.length);

				customerModel.getProductByNmae(req.body.searchBox,function(result){

					customerModel.getAllMenu(function(menus){

				if(req.session.loggedAdmin)
	            {
		            res.render('homePage',{customer:userName,chart:chartNumber,product:result,links:'/admin',menu:menus});
	            }

	            else if(req.session.loggedUser)
	            {
		            res.render('homePage',{customer:userName,chart:chartNumber,product:result,links:'/user/login',menu:menus});
	            }

	            else
	            {
	                res.render('homePage',{customer:userName,chart:chartNumber,product:result,links:'/login',menu:menus});	
	            }
			});

				//res.render('homePage',{customer:userName,chart:chartNumber,product:result});
			});
			
		});

	   });		
		//res.render('customer/home',{customer:result[0]});
	//res.render('customer/home',{id:req.params.id});
});

router.get('/customer',function(req,res){
		//req.session.userName='star';
		var ip =req.socket.remoteAddress;
		if(req.session.userName&&req.session.userName!=null){
			userName=req.session.userName;
		}
		else userName=ip;
		customerModel.getChart(userName,function(result){
			chartNumber=result.length;
			customerModel.getAllProduct(function(result){
				customerModel.getAllMenu(function(menus){

				if(req.session.loggedAdmin)
	            {
		            res.render('homePage',{customer:userName,chart:chartNumber,product:result,links:'/admin',menu:menus});
	            }

	            else if(req.session.loggedUser)
	            {
		            res.render('homePage',{customer:userName,chart:chartNumber,product:result,links:'/user/login',menu:menus});
	            }

	            else
	            {
	                res.render('homePage',{customer:userName,chart:chartNumber,product:result,links:'/login',menu:menus});	
	            }
				
			});

		  });		
			
		});
		//res.render('customer/home',{customer:result[0]});
	//res.render('customer/home',{id:req.params.id});
});

router.get('/customers/:names',function(req,res){
		//req.session.userName='star';
		var ip =req.socket.remoteAddress;
		if(req.session.userName&&req.session.userName!=null){
			userName=req.session.userName;
		}
		else userName=ip;
		customerModel.getChart(userName,function(result){
			chartNumber=result.length;
			customerModel.getProductByNmae(req.body.searchBox,function(result2){
			customerModel.getMenu(req.params.names,function(result){
				customerModel.getAllMenu(function(menus){

				if(req.session.loggedAdmin)
	            {
		            res.render('homePage',{customer:userName,chart:chartNumber,product:result,links:'/admin',menu:menus});
	            }

	            else if(req.session.loggedUser)
	            {
		            res.render('homePage',{customer:userName,chart:chartNumber,product:result,links:'/user/login',menu:menus});
	            }

	            else
	            {
	                res.render('homePage',{customer:userName,chart:chartNumber,product:result,links:'/login',menu:menus});	
	            }
				
			});
			
		});

	   });		

	  });		
		//res.render('customer/home',{customer:result[0]});
	//res.render('customer/home',{id:req.params.id});
});

router.post('/customers/:names',function(req,res){
		//req.session.userName='star';
		var ip =req.socket.remoteAddress;
		if(req.session.userName&&req.session.userName!=null){
			userName=req.session.userName;
		}
		else userName=ip;
		customerModel.getChart(userName,function(result){
			chartNumber=result.length;
			customerModel.getProductByNmae(req.body.searchBox,function(result){
			customerModel.getMenu(req.params.names,function(result){
				customerModel.getAllMenu(function(menus){

				if(req.session.loggedAdmin)
	            {
		            res.render('homePage',{customer:userName,chart:chartNumber,product:result,links:'/admin',menu:menus});
	            }

	            else if(req.session.loggedUser)
	            {
		            res.render('homePage',{customer:userName,chart:chartNumber,product:result,links:'/user/login',menu:menus});
	            }

	            else
	            {
	                res.render('homePage',{customer:userName,chart:chartNumber,product:result,links:'/login',menu:menus});	
	            }
				
			});

		});		
			
		});

	  });		
		//res.render('customer/home',{customer:result[0]});
	//res.render('customer/home',{id:req.params.id});
});

router.get('/customer/productDetails/:name',function(req,res){
	var ip =req.socket.remoteAddress;
		if(req.session.userName&&req.session.userName!=null){
			userName=req.session.userName;
		}
		else userName=ip;

			customerModel.getChart(userName,function(result){
			chartNumber=result.length;
			customerModel.getProductDetails(req.params.name,function(result){
			res.render('customerViews/productDetails',{customer:userName,chart:chartNumber,productDetails:result[0],message:""});
			});
			
		});
});
router.post('/customer/productDetails/:id',function(req,res){

	//console.log(req.body.productName);
    //req.session.totalChart=0;
     var ip =req.socket.remoteAddress;
     if(req.session.userName&&req.session.userName!=null){
			userName=req.session.userName;
		}
		else userName=ip;
     //console.log(ip);
	if(req.body.quantity>0&&req.body.quantity<=10&&req.body.quantity<=req.body.available){
			if(req.session.userName&&req.session.userName!=null){
				var chart={
				userName:req.session.userName,
				productName:req.body.productName,
				quantity:req.body.quantity,
				unitPrice:req.body.unitPrice,
				sku:req.body.sku
			};
			    customerModel.addToChart(chart,function(result){
			    	console.log(userName);
			    	res.redirect('/customer/'+userName);
			});
		}
		else{

			var chart={
				userName:ip,
				productName:req.body.productName,
				quantity:req.body.quantity,
				unitPrice:req.body.unitPrice,
				sku:req.body.sku
			};
			    customerModel.addToChart(chart,function(result){
			    	res.redirect('/customer/'+userName);
			});

		}

	}
	else{
		if(req.session.userName&&req.session.userName!=null){
			userName=req.session.userName;
		}
		else userName=ip;
		    customerModel.getChart(userName,function(result){
			chartNumber=result.length;
			customerModel.getProductDetails(req.params.id,function(result){
			res.render('customerViews/productDetails',{customer:userName,chart:chartNumber,productDetails:result[0],message:"Enter valid quantity"});
			});
			
		}); 
	}
});

router.get('/customer/chartList/:name',function(req,res){
	var ip =req.socket.remoteAddress;

	if(req.session.userName&&req.session.userName!=null){
			userName=req.session.userName;
		}
		else userName=ip;

	customerModel.getChart(userName,function(result){

			chartNumber=result.length;

			//result[0].total=result[0].unitPrice*result[0].quantity;

			for(var i=0;i<result.length;i++) result[i].totalPrice=result[i].pricee*result[i].quantity;
			res.render('customerViews/chartList',{chartList:result,chart:chartNumber,customer:userName});
		

	});

});


router.get('/customer/chartList/:name/orderProduct/:id',function(req,res){
	var ip =req.socket.remoteAddress;
		if(req.session.userName&&req.session.userName!=null){
			userName=req.session.userName;
		}
		else userName=ip;

			customerModel.getChartById(req.params.id,function(result){
			result[0].totalPrice = result[0].pricee * result[0].quantity;
			res.render('customerViews/orderProduct',{chartProduct:result[0],customer:userName});
		

	});


});

/*router.get('/customer/chartList/:name/updateChart/:id',function(req,res){
	var ip =req.socket.remoteAddress;
		if(req.session.userName&&req.session.userName!=null){
			userName=req.session.userName;
		}
		else userName=ip;

			customerModel.getChartById(req.params.id,function(result){
			result[0].totalPrice=result[0].pricee*result[0].quantity;
			res.render('customerViews/updateChart',{chartProduct:result[0],customer:userName});
		

	});*/

	router.get('/customer/chartList/:name/updateChart/:id',function(req,res){
	var ip =req.socket.remoteAddress;
		if(req.session.userName&&req.session.userName!=null){
			userName=req.session.userName;
		}
		else userName=ip;

			customerModel.getChartById(req.params.id,function(result){
			result[0].totalPrice=result[0].pricee*result[0].quantity;
			res.render('customerViews/updateChart',{chartProduct:result[0],customer:userName,message:''});
		

	});

	
});
router.get('/customer/chartList/:name/removeChart/:id',function(req,res){
	var ip =req.socket.remoteAddress;
		if(req.session.userName&&req.session.userName!=null){
			userName=req.session.userName;
		}
		else userName=ip;

			customerModel.getChartById(req.params.id,function(result){
			result[0].totalPrice=result[0].pricee*result[0].quantity;
			res.render('customerViews/removeChart',{chartProduct:result[0],customer:userName});
		

	});

	
});

router.post('/customer/chartList/:name/orderProduct/:id',function(req,res){
	var ip =req.socket.remoteAddress;
	if(req.session.userName&&req.session.userName!=null){
			userName=req.session.userName;
			customerModel.getChartById(req.body.ChartId,function(result){
			result[0].totalPrice=result[0].pricee*result[0].quantity;
			result[0].address = req.body.paddress;
			result[0].phone = req.body.pphone;
			var order=result[0];
			//order.totalPrice=req.body.Price;
			var productName=result[0].productName;
			customerModel.getProductDetails(productName,function(result){
				if(result[0].quantity<req.body.Quantity){

					//res.render('customerViews/order',{msg:"",userName:userName,orderss:[]});

					res.redirect('/customer/order/'+userName);

				}

				else{
					var updateQuantity=result[0].quantity-req.body.Quantity;
					customerModel.updateProduct(productName,updateQuantity,function(result){
						customerModel.removeChart(req.params.id,function(result){
							customerModel.addOrder(order,function(result){
								//res.render('customerViews/order',{msg:"",userName:userName,orderss:[]});

								res.redirect('/customer/order/'+userName);

							});

							
						});
					});

				}

			});
		});

		}
		else {
			res.redirect('/login');
		}

		
	
});

/*router.post('/customer/chartList/:name/updateChart/:id',function(req,res){
	var ip =req.socket.remoteAddress;
		if(req.session.userName&&req.session.userName!=null){
			userName=req.session.userName;
		}
		else userName=ip;

			customerModel.updateChartById(req.body.ChartId,req.body.Quantity,function(result){
			res.redirect('/customer/'+userName);
		

	});
});*/

router.post('/customer/chartList/:name/updateChart/:id',function(req,res){
	var ip =req.socket.remoteAddress;
		if(req.session.userName&&req.session.userName!=null){
			userName=req.session.userName;
		}
		else userName=ip;//******************
		customerModel.getProductDetails(req.body.productName,function(result){

			var r=result;

			if(req.body.Quantity>0&&req.body.Quantity<=10&&req.body.Quantity<=result[0].quantity){
			customerModel.updateChartById(req.body.ChartId,req.body.Quantity,function(result){
			res.redirect('/customer/'+userName);
		});

	}
	else{
		customerModel.getChartById(req.params.id,function(result){
			result[0].totalPrice=result[0].pricee*result[0].quantity;
			res.render('customerViews/updateChart',{chartProduct:result[0],customer:userName,message:"Invalid input(Quantity must be less or equal"+r[0].quantity+")"});
		

	});
	}
			//res.render('customerViews/productDetails',{customer:userName,chart:chartNumber,productDetails:result[0],message:"Enter valid quantity"});
	});
		//*******************

});

router.get('/customer/order/:name',function(req,res){

	userName = req.session.userName;

	customerModel.getOrderbyName(req.params.name,function(result){

		res.render('customerViews/order',{msg:"",userName:userName,orderss:result});

	});

});

router.post('/customer/chartList/:name/removeChart/:id',function(req,res){
	var ip =req.socket.remoteAddress;
		if(req.session.userName&&req.session.userName!=null){
			userName=req.session.userName;
		}
		else userName=ip;

			customerModel.removeChartById(req.body.ChartId,function(result){
			res.redirect('/customer/'+userName);
		});
});

router.get('/user/login',function(req,res){

	if(req.session.userName){

		customerModel.getUserDetails(req.session.userName,function(result){
				//console.log(result.length);
				res.render('customerViews/customerDetails',{customer:result[0]});
			});

	}
	else{
		res.redirect('/login');
	}

});
module.exports=router;