module.exports = (app,con)=>{

    var bodyParser = require('body-parser');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    //Request Controller and redirecter
    app.post('/user',(req,res)=>{

    var operation = req.body.operation;

    if(operation === "create"){
        res.redirect(307,"/createUser");
    }
    else 
    if(operation === "delete"){
        res.redirect(307,"/deleteUser");
    }
    else 
    if(operation === 'alluser'){
        res.redirect(303,"/allUsers");
    }
    else 
    if(operation === 'singleuser'){
        res.redirect(303,"/singleUser");
    }
    else
    if(operation === 'loginuser'){
        res.redirect(307,'/loginUser');
    }
    else{
        res.json({"err_message":"key value error"});
    } 
   });
    

//getting all users
app.get('/allUsers',(req,res)=>{
    querys = "select * from user_dat";
    con.query(querys,(err,result)=>{
        if(err){res.json({"err_message":"Some query error occurred"});  }
        else{
            res.json(JSON.stringify(result));
        }
    });
});

//getting single user
app.get('/singleUser',(req,res)=>{
    var id = req.body.id;
    querys = "select * from user_dat where id = '" + id + "'"; 
    con.query(querys,(err,result)=>{
        if(err){res.json({"err_message":"Some query error occurred"});  }
        else{
            res.json(JSON.stringify(result));
        }
    });
});

//creating an user
app.post('/createUser',function(req,res) {
    var id = 0;
    var name = req.body.name;
    var phone = req.body.phone;
    var email = req.body.email;
    var address = req.body.address;
    var otp_verified = req.body.otp_verified;
    var md5_password = req.body.md5_password;
    var suspended = req.body.suspended;

    querys="insert into user_dat values('"+ id +"','" + name +"','"+phone+"','"+email+"','"+address+"','"+otp_verified+"','"+md5_password+"','"+suspended+"')";
    con.query(querys,(err,result)=>{
        if(err){res.json({"err_message":"error in query occurred " +  err});}
        else{
            res.redirect("/allUsers");
        }
    });
});

//deleting an user
app.post('/deleteUser',(req,res)=>{
    var id=req.body.id;
    querys="delete from user_dat where id = '" + id + "'";
    con.query(querys,(err,result)=>{
        if(err){res.json({"err_message":"Error occured in query "});}
        else{
            res.redirect(303,"/allUsers");
        }
    });
});

//login an user
app.post('/loginUser',(req,res)=>{
    var email = req.body.email;
    var md5_password = req.body.md5_password;
    querys = "select count(*) as user_count from user_dat where email = '" + email + "'and md5_password = '" + md5_password + "'";
    //res.send(querys);
    con.query(querys,(err,result)=>{
        if(err){res.json({"err_message":"Error occured in query " + err});}
        else{
            //will send an one value key value pair array, field name will be user_count
            res.send(result[0]);
        }
    });
});


}