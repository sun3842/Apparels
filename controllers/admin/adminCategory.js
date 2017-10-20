var express = require('express');
var router =  express.Router();
var catagoryModel = require.main.require('./models/admin/categoryModel');


router.get('/admin/category',function(req,res){

	if(! req.session.loggedAdmin)
	{
		res.redirect('/login');
		return;
	}
	else
	{

	    catagoryModel.getAll(function(result){

		    allCategory = result;

		    res.render('admin/category/CategoryView',{
			    errors: [],
			    searchResult:'',
			    categorys : result 
		    });
	    });
    }
});

router.post('/admin/category',function(req,res){

	if(! req.session.loggedAdmin)
	{
		res.redirect('/login');
		return;
	}
	else
	{

		catagoryModel.getByName(req.body.sname,function(result){

	        catagoryModel.getAll(function(result2){

		        allCategory = result2;

		        if(result.length != 0)
		        {
		        	var tableHead = "<table border='1' width='100%' class='table'><tr><th>Category Name</th><th>Parent Category</th><th>Total Products</th><th>Options</th></tr>";
		        	var tableData = tableHead + "<tr align='center'><td>"+req.body.sname+"</td><td>"+result[0].parent+"</td><td>"+result[0].count+"</td><td><a href='/admin/category/edit/"+result[0].id+"'>Edit</a> | <a href='/admin/category/delete/"+result[0].id+"'>Delete</a></td></tr></table>";

		        	res.render('admin/category/CategoryView',{
			               errors: [],
			               searchResult:tableData,
			               categorys : result2 
		            });
		        }
		        else 
		        {
		            res.render('admin/category/CategoryView',{
			               errors: [],
			               searchResult:'No Data Found',
			               categorys : result2 
		            });
		        }
	        });

	    });
    }
});

router.get('/admin/category/create',function(req,res){

	if(! req.session.loggedAdmin)
	{
		res.redirect('/login');
		return;
	}
	else
	{

	   catagoryModel.getAll(function(result){

		   res.render('admin/category/CategoryCreateView',{
			   errors: [],
			   categoryNames : result 
		   });
	   });

    }

});

router.post('/admin/category/create',function(req,res){

	if(! req.session.loggedAdmin)
	{
		res.redirect('/login');
		return;
	}

	req.checkBody('cname', 'Category name is required').notEmpty();
	req.checkBody('cname', 'Category name should be alphabets only').isAlpha();
	req.getValidationResult().then(function(result){

		if (!result.isEmpty()) 
		{
			catagoryModel.getAll(function(result2){

		        res.render('admin/category/CategoryCreateView',{
			         errors: result.array(),
			         categoryNames : result2 
		        });
	        });
		}
		else
		{
			var categoryDetails = {

				categoryName: req.body.cname,
				option: req.body.parentName
			};

			catagoryModel.insert(categoryDetails, function(result){
				res.redirect('/admin/category');
			}) 
		}
	});
});

router.get('/admin/category/edit/:id',function(req,res){

    var id = req.params.id;

    if(! req.session.loggedAdmin)
	{
		res.redirect('/login');
		return;
	}

	else
	{

	    catagoryModel.get(id,function(results){

		    catagoryModel.getAll(function(allCategory){

		    res.render('admin/category/CategoryEditView',{
			    errors: [],
			    categoryName : results ,
			    options: allCategory
		    });
	    });

       });
   	}		

});

router.post('/admin/category/edit/:id', function(req, res){

	if(! req.session.loggedAdmin)
	{
		res.redirect('/login');
		return;
	}

    var id = req.params.id;

	req.checkBody('cname', 'Category name is required').notEmpty();
	req.checkBody('cname', 'Category name should be alphabets only').isAlpha();
	req.getValidationResult().then(function(result){

		if (!result.isEmpty()) 
		{
			catagoryModel.get(id,function(result2){

		        res.render('admin/category/CategoryEditView',{
			         errors: result.array(),
			         categoryName : result2, 
			         options: allCategory
		        });
	        });
		}

		else if( req.body.cname == req.body.parentName )
		{
			res.redirect('/admin/category');
		}

		else if(req.body.parentName == "Same")
		{
			var categoryDetails = {

				categoryId : req.body.cId,
				categoryName: req.body.cname
			};

			catagoryModel.updateWithoutParent(categoryDetails, function(result){
				res.redirect('/admin/category');
			}) 
		}

		else
		{
			var categoryDetails = {

				categoryId : req.body.cId,
				categoryName: req.body.cname,
				option: req.body.parentName
			};

			catagoryModel.get(id,function(results5){

				if( req.body.parentName == "None" )
				{
					if( results5.parent == "None" )
					{
						catagoryModel.update(categoryDetails, function(result){
				                    res.redirect('/admin/category');
			             }); 
					}
					else
					{
						catagoryModel.updateCategory2(results5.parent,results5.count,function(result){

						catagoryModel.update(categoryDetails, function(result){
				                    res.redirect('/admin/category');
			             }); 

					   });
					}
				}

				else
				{
					catagoryModel.updateCategory2(results5.parent,results5.count,function(result){

						catagoryModel.update(categoryDetails, function(result){

							catagoryModel.updateCategory(req.body.parentName,results5.count,function(result){

								    res.redirect('/admin/category');

							});	
				                    
			             }); 
					});	
				}

			});	
		}
	});

});


router.get('/admin/category/delete/:id',function(req,res){

    var id = req.params.id;

    if(! req.session.loggedAdmin)
	{
		res.redirect('/login');
		return;
	}
	else
	{

	   catagoryModel.get(id,function(results){

		   res.render('admin/category/CategoryDeleteView',{
			   categoryName : results 
		   });
	   });
    }

});

router.post('/admin/category/delete/:id', function(req, res){

	if(! req.session.loggedAdmin)
	{
		res.redirect('/login');
		return;
	}
	
	var categoryDetails = {
		categoryId: req.body.cId
	};

	catagoryModel.get(req.body.cId,function(result){

		    if(result.parent != "None")
		    {
		    	 catagoryModel.updateCategory2(result.parent,result.count, function(result1){

		    	 	catagoryModel.delete(categoryDetails, function(result2){

		    		catagoryModel.deleteProduct(req.body.cname, function(result3){

		    			if(result.length != 0)
		    			{
		    				res.redirect('/admin/category');
		    			}
		    			else
		    			{
		    			    res.redirect('/admin/category');
		    			}
		    		});

		    	 });	

		    	});	
		    }
		    else
		    {
		    	catagoryModel.selectAllProduct(req.body.cname,function(result4){

		    		if(result4.length != 0)
		    		{
		    			for(var i=0 ; i<result4.length ; i++)
		    			{
		    				catagoryModel.deleteProduct(result4[i].category1,function(result6)
		    				{

		    					catagoryModel.delete(categoryDetails,function(result5){

		    			           catagoryModel.deleteWithParent(req.body.cname,function(result7){

		    			                 if(result7.length !=0)
		    			                 {
		    			                 	res.redirect('/admin/category');
		    			                 }	
		    			                 else
		    			                 {
		    			                 	res.redirect('/admin/category');
		    			                 }

		    				        });
		    			        });

		    				});
		    			}

		    		}
		    		else
		    		{
		    			catagoryModel.delete(categoryDetails,function(result8){

		    			    catagoryModel.deleteWithParent(req.body.cname,function(result9){

		    			        if(result9)
		    			        {
		    			        	res.redirect('/admin/category');
		    			        }	
		    			        else
		    			        {
		    			        	res.redirect('/admin/category');
		    			        }

		    				});
		    			});
		    		}

		    	});
		    }
	});

});

module.exports = router;