var express = require('express');
var router =  express.Router();
var md5 = require("md5");
var userModel = require.main.require('./models/registeredUserModel');

router.get('/home',function(req,res){

	res.render('homePage');
});

router.get('/register',function(req,res){

	res.render('registrationView',{
		 errors: [],
		 error:''
    });
});

router.post('/register',function(req,res){

	req.checkBody('uname', 'User name is required').notEmpty();
	req.checkBody('uname', 'User name should be alphabets only').isAlpha();
	req.checkBody('uemail','User email is required').notEmpty();
	req.checkBody('upass', 'User Password is required').notEmpty();
	req.checkBody('upass', 'Minimum Password length have to be 5').isLength({ min: 5 });

	req.getValidationResult().then(function(result){

		userModel.getAll(function(result2){

			for(var i=0;i<result2.length;i++)
			{
				if (!result.isEmpty()) 
		        {
		            res.render('registrationView',{
			               errors: result.array(),
			               error:''
		            });
		        }
		        else if(result2[i].user_email == req.body.uemail)
		        {
		        	res.render('registrationView',{
			               errors: [],
			               error:'Email is already Registered'
		            });
		        }
		        else if(result2[i].user_name == req.body.uname)
		        {
		        	res.render('registrationView',{
			               errors: [],
			               error:'User Name is already Picked'
		            });
		        }
		        else
		        {
		        	var pass = md5(req.body.upass);

			        var userDetails = {

				        userName: req.body.uname,
				        userEmail: req.body.uemail,
				        userPass: pass,
				        userRole: req.body.urole
			        };

			        userModel.insert(userDetails, function(result){
				        res.redirect('/login');
			        }); 
		        }
			}

		});
	});
});

router.get('/login',function(req,res){

	res.render('loginView' ,{error: ''});
});

router.post('/login',function(req,res){

	var pass = md5(req.body.upass);

	var user = {
		username: req.body.uname,
		password: pass
	};

	userModel.verifyUser(user, function(valid){
		if(valid)
		{
			userModel.getUser(req.body.uname,function(result){

				if(result.user_role == "admin")
				{
					req.session.loggedAdmin = user;
			        res.redirect('/admin');
				}
				else
				{
					req.session.userName = user.username;
					//console.log(user);
			       res.redirect('/customer/'+req.session.userName );
				}

			});
		}
		else
		{
			res.render('loginView', {error: 'Invalid username or password'});
		}
	});
});

module.exports = router;