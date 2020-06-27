const { query } = require('express');

module.exports = (app,con) =>{

    //for parsing the body of the POST request
    var bodyParser = require('body-parser');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    //redirect controller
    app.post('/reg_order',(req,res)=>{

        var operation = req.body.operation;
        //this will return all the orders for a perticular user(id)
        if(operation === 'getallorders')
        {
            res.redirect(303,'/getallOrders');
        }
        else{res.json({"err_message":"key value error"}); }
        
    });

    app.get('/getallOrders',(req,res)=>{
         var userId = req.body.userId;
        // var querys = "select * from reg_order_dat where userId = '" + userId + "'";

         res.json({"userid":userId});

        // con.query(querys,(err,result)=>{
        //     if(err){
        //         res.json({"err_message":"Some query error occurred"}); 
        //     }
        //     else{
        //         res.json(JSON.stringify(result));
        //     }
        // });
    });
}