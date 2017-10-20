var express = require('express');
var router =  express.Router();
var customerModel=require.main.require('./models/customerModels/customerModel');


router.get('/admin',function(req,res){

	if(! req.session.loggedAdmin)
	{
		res.redirect('/login');
		return;
	}
	else
	{
		customerModel.getAllOrdrs(function(result){
      var topUser=-1;
      var topLenth=0;
      var topProduct=-1;
      var topProductLn=0;
		for( i=0;i<result.length;i++){
			customerModel.getOrderByCstmr(result[i].customer,i,function(resul,j){
			if(resul.length>topLenth){
				topLenth=resul.length;
				topUser=j;
			}
			//if((j+1)==result.length)console.log(result[topUser].customer);
					customerModel.getOrderByPrdt(result[j].sku,function(resu){
						//console.log(resu.length);
						if(resu.length>topProductLn){
							topProductLn=resu.length;
							topProduct=j;
						}
						if((j+1)==result.length){

							//console.log(result[topProduct].sku);
							customerModel.getProductBySku(result[topProduct].sku,function(r){

								customerModel.totalAmount(function(amount){ 

									customerModel.totalSold(function(products){ 

								res.render('admin/homeView',{user:result[topUser],product:r[0],amounts:amount.pricee,productt:products.product});

							});

						  });		

						});		

						}
			

					});

		});

		}
	});
		//res.render('admin/homeView');
	}
});

router.get('/logout',function(req,res){

    req.session.destroy();
	res.redirect('/home');
});

router.post('/logout',function(req,res){

    req.session.destroy();
	res.redirect('/home');
});

router.get('/home',function(req,res){

    req.session.destroy();
	res.redirect('/customer');
});

module.exports = router;