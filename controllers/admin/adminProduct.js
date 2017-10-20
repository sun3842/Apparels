var express = require('express');
var router =  express.Router();
var productModel = require.main.require('./models/admin/productModel');
var catagoryModel = require.main.require('./models/admin/categoryModel');

router.get('/admin/product',function(req,res){

	if(! req.session.loggedAdmin)
	{
		res.redirect('/login');
		return;
	}

	productModel.getAll(function(result){

		productModel.getAllInfo(function(result2){

		res.render('admin/product/productView',{
			errors: [],
			products : result,
			searchResult:'',
			product : result2
		});

	  });	

	});

});

router.post('/admin/product',function(req,res){

	if(! req.session.loggedAdmin)
	{
		res.redirect('/login');
		return;
	}
	else
	{

	   productModel.getByProduct(req.body.sname,function(result3){

	      productModel.getAll(function(result){

	       	productModel.getAllInfo(function(result4){

	          productModel.getAllInfo2(req.body.sname,function(result2){

		        allProduct = result;

		        if(result3.length != 0)
		        {
		        	var tableHead = "<table border='1' width='100%' class='table'><tr><th>Product Image</th><th>Product Name</th><th>Product SKU</th><th>Product Price</th><th>Product Quantity</th><th>Product Category</th><th>Parent Category</th><th>Options</th></tr>";
		        	var tableData = tableHead + "<tr align='center'><td><img src='"+result3[0].image1+"' width='100' height='70'></td><td>"+result3[0].name+"</td><td>"+ result3[0].sku +"</td><td>"+ result3[0].price + "</td><td>"+ result3[0].quantity +"</td><td>"+ result3[0].category1 +"</td><td>"+ result2.parent +"</td><td><a href='/admin/product/edit/"+ result3[0].id +"'>Edit</a> | <a href='/admin/product/delete/"+ result3[0].id+ "'>Delete</a></td></tr></table> ";

		        	res.render('admin/product/productView',{
			               errors: [],
			               products : result,
			               searchResult:tableData,
			               product : result4
		            });
		        }
		        else 
		        {
		            res.render('admin/product/productView',{
			               errors: [],
			               products : result,
			               searchResult:'No Data Found',
			               product : result4                
		            });
		        }
	        });

	        });

	      });

	    });
    }
});

router.get('/admin/product/create',function(req,res){

	if(! req.session.loggedAdmin)
	{
		res.redirect('/login');
		return;
	}

	catagoryModel.getAll(function(result){

		    res.render('admin/product/productCreateView',{
			         errors: "",
			         categoryNames : result 
		 });
	});

});

router.post('/admin/product/create',function(req,res){

	if(! req.session.loggedAdmin)
	{
		res.redirect('/login');
		return;
	}

  catagoryModel.getAll(function(categoryList){

	if(req.files.filename)
	{
		var file=req.files.filename,
		name = file.name,
		type = file.mimetype,
		length = file.data.toString().length,
		maxlength = 8*1024*1024; 

		if(length>maxlength)
		{
			res.render('admin/product/productCreateView',{errors : "File size exceeds the limit of 8mb" , categoryNames : categoryList });
		}
		else
		{
			if(type.match(/image\/*/i))
			{
				file.mv('G:/Books/ATP3/ATP/public/image/'+name,function(err){

					if(err)
					{
						res.render('admin/product/productCreateView',{errors : "Error Occured!" , categoryNames : categoryList });
					}
					else
					{
						var productDetails = {

				            productName: req.body.pname,
				            productSku: req.body.psku,
				            productPrice: req.body.pprice,
				            productDescription: req.body.pdescription,
				            productStock: req.body.pstock,
				            productCategory1: req.body.pcategory1,
				            productImage: '/image/'+name
			            };

			            productModel.getAll(function(resultss1){

		                       allProduct = resultss1;

						for(var i=0 ; i< allProduct.length ; i++)
						{
							if( allProduct[i].sku == req.body.psku )
							{
								res.render('admin/product/productCreateView',{errors : "SKU id already used" , categoryNames : categoryList });
								break;
							}

							else
							{
								productModel.insert(productDetails, function(result){


				                         if( req.body.pcategory1 != "None" )
				                         {
				                         		productModel.updateCategory(req.body.pcategory1, function(result){

				                         		    productModel.getByCategory (req.body.pcategory1,function(result2){

				                         		    	if( result2.parent != "None" )
				                         		    	{
				                         		    		productModel.updateCategory(result2.parent , function(result){

				                         		    			   res.redirect('/admin/product');

				                         		    		});	
				                         		    	}

				                         		    	else
				                         		    	{
				                         		    		res.redirect('/admin/product');
				                         		    	}

				                         		    });      

				                         	    }); 
				                         }

				                         else
				                         {
				                         	res.redirect('/admin/product');
				                         }
			                    });
							}
					    }

					  }); 

					}
				});
			}

			else
			{
				res.render('admin/product/productCreateView',{errors : "Format not allowed!" , categoryNames : categoryList });
			}
		}
	}

	else
	{
		res.render('admin/product/productCreateView',{errors : "No File selected !" , categoryNames : categoryList });
	}

   });	

});



router.get('/admin/product/edit/:id',function(req,res){

	if(! req.session.loggedAdmin)
	{
		res.redirect('/login');
		return;
	}

	catagoryModel.getAll(function(categoryList){

		var id = req.params.id;

		productModel.get(id,function(result){

			  res.render('admin/product/productEditView',{
			  	errors:"",
			  	productName:result,
			  	options:categoryList
			  });
		});
	});		

});

router.post('/admin/product/edit/:id',function(req,res){

	if(! req.session.loggedAdmin)
	{
		res.redirect('/login');
		return;
	}

   var id = req.params.id;

  productModel.get(id,function(categorysById){

    catagoryModel.getAll(function(categoryList){

    var productDetails = {

				            productName: req.body.pname,
				            productSku: req.body.psku,
				            productPrice: req.body.pprice,
				            productDescription: req.body.pdescription,
				            productStock: req.body.pstock,
				            productCategory1: req.body.pcategory1,
				            productImage: '/image/'+name
			            };

    var productWithoutCategory = {

				            productName: req.body.pname,
				            productSku: req.body.psku,
				            productPrice: req.body.pprice,
				            productDescription: req.body.pdescription,
				            productStock: req.body.pstock,
				            productImage: '/image/'+name
			            };

	var productDetails2 = {

				            productName: req.body.pname,
				            productSku: req.body.psku,
				            productPrice: req.body.pprice,
				            productDescription: req.body.pdescription,
				            productStock: req.body.pstock,
				            productCategory1: req.body.pcategory1
			            };

    var productWithoutCategory2 = {

				            productName: req.body.pname,
				            productSku: req.body.psku,
				            productPrice: req.body.pprice,
				            productDescription: req.body.pdescription,
				            productStock: req.body.pstock,
			            };	


	if(req.files.filename)
	{
		var file=req.files.filename,
		name = file.name,
		type = file.mimetype,
		length = file.data.toString().length,
		maxlength = 8*1024*1024; 

		if(length>maxlength)
		{
			res.render('admin/product/productEditView',{errors : "File size exceeds the limit of 8mb" , productName:categorysById , options:categoryList  });
		}
		else
		{
			if(type.match(/image\/*/i))
			{
				file.mv('G:/Books/ATP3/ATP/public/image/'+name,function(err){

					if(err)
					{
						res.render('admin/product/productEditView',{errors : "Error Occured!" , productName:categorysById , options:categoryList });
					}
					else
					{

			            productModel.getAll(function(resultss1){

		                       allProduct = resultss1;


		                    if( req.body.pcategory1 == "Same" )
		                    {
		                    	productModel.updateNoCategory(id,productWithoutCategory,function(result){

		                    		     res.redirect('/admin/product');
		                    	});
		                    }

		                    else if( req.body.pcategory1 == categorysById.category1 )
		                    {
		                    	productModel.updateWithCategory(id,productWithoutCategory,function(result){

		                    		     res.redirect('/admin/product');
		                    	});
		                    }

							else
							{
								productModel.getByCategory(categorysById.category1, function(result4){

								if( result4.parent != "None" )
								{

									  productModel.updateCategory2(categorysById.category1, function(result){

									  productModel.updateCategory2(result4.parent, function(result){

										productModel.updateWithCategory(id,productDetails,function(result){

										   productModel.updateCategory(req.body.pcategory1, function(result){

		                    		           productModel.getByCategory(req.body.pcategory1,function(result3){

		                    		           	      if( result3.parent != "None" )
		                    		           	      {
		                    		           	      	  productModel.updateCategory(result3.parent, function(result){

		                    		           	      	  	     res.redirect('/admin/product');

		                    		           	      	  });	
		                    		           	      }

		                    		           	      else
		                    		           	      {
		                    		           	      	   res.redirect('/admin/product');
		                    		           	      }

		                    		           });
		                    		        });  
		                    	        });
								    });
								  });	  
								}

								else
								{
									productModel.updateCategory2(categorysById.category1, function(result){

									productModel.updateWithCategory(id,productDetails,function(result){

										  productModel.updateCategory(req.body.pcategory1, function(result){

		                    		           productModel.getByCategory(req.body.pcategory1,function(result3){

		                    		           	      if( result3.parent != "None" )
		                    		           	      {
		                    		           	      	  productModel.updateCategory(result3.parent, function(result){

		                    		           	      	  	     res.redirect('/admin/product');

		                    		           	      	  });	
		                    		           	      }

		                    		           	      else
		                    		           	      {
		                    		           	      	   res.redirect('/admin/product');
		                    		           	      }

		                    		           });
		                    		       });
		                    		           
		                    	        });
									});
								}
								
							   });	
							}

					  }); 

					}
				});
			}

			else
			{
				res.render('admin/product/productEditView',{errors : "Format not allowed!" , productName:categorysById , options:categoryList });
			}
		}
	}

	else
	{
		productModel.getAll(function(resultss1){

		allProduct = resultss1;


		if( req.body.pcategory1 == "Same" )
		{
		    productModel.updateNoCategory2(id,productWithoutCategory2,function(result){

		        res.redirect('/admin/product');
		    });
		}

		else if( req.body.pcategory1 == categorysById.category1 )
	    {
		    productModel.updateWithCategory2(id,productWithoutCategory2,function(result){

		            res.redirect('/admin/product');
		    });
		}

        else
	    {
            productModel.getByCategory(categorysById.category1, function(result4){

			    if( result4.parent != "None" )
				{

				    productModel.updateCategory2(categorysById.category1, function(result){

					productModel.updateCategory2(result4.parent, function(result){

					productModel.updateWithCategory2(id,productDetails2,function(result){

				    productModel.updateCategory(req.body.pcategory1, function(result){

		            productModel.getByCategory(req.body.pcategory1,function(result3){

		                 if( result3.parent != "None" )
		                 {
		                      productModel.updateCategory(result3.parent, function(result){

		                    	  res.redirect('/admin/product');

		                      });	
		                 }

		                 else
		                 {
		                      res.redirect('/admin/product');
		                 }   

		              });
		             });  
		            });
		           });
			      });	  
				}

				else
				{
					productModel.updateCategory2(categorysById.category1, function(result){

					  productModel.updateWithCategory2(id,productDetails2,function(result){

					    productModel.updateCategory(req.body.pcategory1, function(result){

		                     productModel.getByCategory(req.body.pcategory1,function(result3){

		                    		  if( result3.parent != "None" )
		                    		  {
		                    		        productModel.updateCategory(result3.parent, function(result){

		                    		           	    res.redirect('/admin/product');

		                    		        });	
		                    		   }

		                    		   else
		                    		   {
		                    		        res.redirect('/admin/product');
		                    		   }

		                       });
		                 });
		                    		           
		             });
	                });
			    }
								
			 });	
		 }

	    }); 
	}

   });
 
 });

});


router.get('/admin/product/delete/:id',function(req,res){

	if(! req.session.loggedAdmin)
	{
		res.redirect('/login');
		return;
	}

		var id = req.params.id;

		productModel.get(id,function(result){

			  res.render('admin/product/productDeleteView',{
			  	errors:"",
			  	productName:result
			  });
		});		

});


router.post('/admin/product/delete/:id',function(req,res){

	if(! req.session.loggedAdmin)
	{
		res.redirect('/login');
		return;
	}

		var id = req.params.id;

		productModel.get(id,function(result){

			var productDetails = {

			   productId: req.body.pId,	
			   productName: req.body.pname,
			   productSku: req.body.psku,
			   productPrice: req.body.pprice,
			   productDescription: req.body.pdescription,
			   productStock: req.body.pstock,
			   productCategory: req.body.poption
			};

			productModel.delete(productDetails.productCategory, function(result){

				productModel.updateCategory2(productDetails.productCategory,function(result){

					     productModel.getByCategory(productDetails.productCategory,function(result3){

					     	       if(result3.parent != "None")
					     	       {
					     	       	   productModel.updateCategory2(result3.parent,function(result){

					     	       	   	          res.redirect('/admin/product');

					     	       	   });	
					     	       }

					     	       else
					     	       {
					     	       	      res.redirect('/admin/product');
					     	       }
					     });
				});

	        });

	   });		

});

module.exports = router;