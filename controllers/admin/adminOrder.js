var express = require('express');
var router =  express.Router();
var orderModel = require.main.require('./models/admin/orderModel');

router.get('/admin/order',function(req,res){

	if(! req.session.loggedAdmin)
	{
		res.redirect('/login');
		return;
	}
	else
	{

	    orderModel.getAll(function(result){

	      orderModel.getOrders(function(result2){

		    allOrder = result;

		    res.render('admin/order/orderHomeView',{
			    errors: [],
			    searchResult:'',
			    orders : result,
			    order : result2  
		    });
	    });

	   }); 	
    }
});

router.post('/admin/order',function(req,res){

	if(! req.session.loggedAdmin)
	{
		res.redirect('/login');
		return;
	}
	else
	{

		orderModel.getByName(req.body.sname,function(result){

	       orderModel.getAll(function(result2){

	        orderModel.getOrders(function(order){

	          orderModel.getOrderId(req.body.sname,function(orderId){
	          		
		        allOrder = result2;

		        if(result.length != 0)
		        {
		        	var tableHead = "<table border='1' class='table'><tr><th>Order Id</th><th>Customer Name</th><th>Customer Address</th><th>Customer Phone</th><th>Product Name</th><th>Product Quantity</th><th>Total Price</th><th>Order Date</th><th>Order Status</th><th>Option</t</tr>";
		        	var tableData = tableHead + "<tr>"+"<td>"+result[0].sku+"</td><td>"+result[0].customer+"</td><td>"+result[0].address+"</td><td>"+result[0].phone+"</td><td>"+result[0].name+"</td><td>"+result[0].quantity+"</td><td>"+result[0].pricee+"</td><td>"+result[0].date+"</td><td>"+result[0].status+"</td><td><a href='/admin/order/edit/"+orderId[0].id+"'>Edit</a></td></tr></table>";

		        	res.render('admin/order/orderHomeView',{
			               errors: [],
			               searchResult:tableData,
			               orders : result2, 
			               order: order
		            });
		        }
		        else 
		        {
		            res.render('admin/order/orderHomeView',{
			               errors: [],
			               searchResult:'No Data Found',
			               orders : result2 ,
			               order: order
		            });
		        }
	        });

	       });   

	    });

	   });    
    }
});

router.get('/admin/order/edit/:id',function(req,res){

    var id = req.params.id;

    if(! req.session.loggedAdmin)
	{
		res.redirect('/login');
		return;
	}

	else
	{

	    orderModel.gets(id,function(results){

		    res.render('admin/order/orderEditView',{
			    errors: [],
			    orders : results 
		    });
       });
   	}		

});

router.post('/admin/order/edit/:id',function(req,res){

    var id = req.params.id;

    if(! req.session.loggedAdmin)
	{
		res.redirect('/login');
		return;
	}

	else
	{

	    orderModel.updateOrderId(req.body.ostatus,id,function(results){

		    res.redirect('/admin/order');
       });
   	}		

});

module.exports = router;