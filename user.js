const { query } = require('express');

module.exports = (app, getConnection) => {

    var bodyParser = require('body-parser');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
   

    //Request Controller and redirecter
    app.post('/user', (req, res) => {

        var operation = req.body.operation;

        if (operation === "create") {
            res.redirect(307, "/createUser");
        }
        else
            if (operation === "delete") {
                res.redirect(307, "/deleteUser");
            }
            else
                if (operation === 'allusers') {
                    res.redirect(303, "/allUsers");
                }
                else
                    if (operation === 'singleuser') {
                        res.redirect(307, "/singleUser");
                    }
                    else
                        if (operation === 'loginuser') {
                            res.redirect(307, '/loginUser');
                        }
                        else
                            if (operation === 'suspenduser') {
                                res.redirect(307, '/suspendUser');
                            }
                            else
                                if (operation === 'verifyotp') {
                                    res.redirect(307, '/verifyotp');
                                }
                                else
                                    if (operation === 'updateuser') {
                                        res.redirect(307, '/updateUser');
                                    }
                                    else
                                        if (operation === 'changepassword') {
                                            res.redirect(307, '/changePassword');
                                        }
                                        else {
                                            res.json({ "err_message": "key value error" });
                                        }
    });


    //getting all users
    app.get('/allUsers', (req, res) => {
        querys = "select * from user_dat";
        getConnection(function(err,connection){
            connection.query(querys,function(err,result){
                if (err) { res.json({ "err_message": "Some query error occurred" }); }
                else{
                    res.json(JSON.stringify(result));
                    connection.release();
                }
            });
        });
        // con.query(querys, (err, result) => {
        //     if (err) { res.json({ "err_message": "Some query error occurred" }); }
        //     else {
        //         res.json(JSON.stringify(result));
        //     }
        // });
    });

    // //getting single user
    app.post('/singleUser', (req, res) => {
        var id = req.body.id;
        querys = "select * from user_dat where id = '" + id + "'";
        getConnection(function(err,connection){
            connection.query(querys,function(err,result){
                if (err) { res.json({ "err_message": "Some query error occurred" }); }
                else{
                    res.json(JSON.stringify(result));
                    connection.release();
                }
            });
        });
        // con.query(querys, (err, result) => {
        //     if (err) { res.json({ "err_message": "Some query error occurred" }); }
        //     else {
        //         res.json(JSON.stringify(result));
        //     }
        // });
    });

    // //creating an user
    app.post('/createUser', function (req, res) {
        var id = 0;
        var name = req.body.name;
        var phone = req.body.phone;
        var email = req.body.email;
        var address = req.body.address;
        var otp_verified = req.body.otp_verified;
        var md5_password = req.body.md5_password;
        var suspended = req.body.suspended;
        querys = "insert into user_dat values('" + id + "','" + name + "','" + phone + "','" + email + "','" + address + "','" + otp_verified + "','" + md5_password + "','" + suspended + "')";
        getConnection(function(err,connection){
            connection.query(querys,function(err,result){
                if (err) { res.json({ "err_message": "Some query error occurred" }); }
                else{
                    res.redirect("/allUsers");
                    connection.release();
                }
            });
        });
    //     con.query(querys, (err, result) => {
    //         if (err) { res.json({ "err_message": "error in query occurred " + err }); }
    //         else {
    //             res.redirect("/allUsers");
    //         }
    //     });
     });

     //deleting an user
    app.post('/deleteUser', (req, res) => {
        var id = req.body.id;
        querys = "delete from user_dat where id = '" + id + "'";
        getConnection(function(err,connection){
            connection.query(querys,function(err,result){
                if (err) { res.json({ "err_message": "Some query error occurred" }); }
                else{
                    res.redirect("/allUsers");
                    connection.release();
                }
            });
        });
        // con.query(querys, (err, result) => {
        //     if (err) { res.json({ "err_message": "Error occured in query " }); }
        //     else {
        //         res.redirect(303, "/allUsers");
        //     }
        // });
    });

    // //login an user
    app.post('/loginUser', (req, res) => {
        var email = req.body.email;
        var md5_password = req.body.md5_password;
        querys = "select count(*) as user_count from user_dat where email = '" + email + "'and md5_password = '" + md5_password + "'";
        getConnection(function(err,connection){
            connection.query(querys,function(err,result){
                if (err) { res.json({ "err_message": "Error occured in query " + err }); }
                else{
                    //will send an one value key value pair array, field name will be user_count
                     res.send(result[0]);
                }
            });
        });
        // con.query(querys, (err, result) => {
        //     if (err) { res.json({ "err_message": "Error occured in query " + err }); }
        //     else {
        //         //will send an one value key value pair array, field name will be user_count
        //         res.send(result[0]);
        //     }
        // });
    });

    // //suspend an user
    app.post('/suspendUser', (req, res) => {
        var suspend_state = req.body.suspend_state;
        var id = req.body.id;
        //to suspend user
        if (suspend_state === true) {
            querys = "update user_dat set suspended = 1 where id = '" + id + "'";
            getConnection(function(err,connection){
                connection.query(querys,function(err,result){
                    if (err) { res.json({ "err_message": "Some query error occurred" }); }
                    else{
                        res.json({ "status": "OK" });
                        connection.release();
                    }
                });
            });
            // con.query(querys, (err, result) => {
            //     if (err) { res.json({ "err_message": "Error occured in query " + err }); }
            //     else {
            //         res.json({ "status": "OK" });
            //     }
            // });
        }
        //to active the user
        else if (suspend_state === false) {
            querys = "update user_dat set suspended = 0 where id = '" + id + "'";
            getConnection(function(err,connection){
                connection.query(querys,function(err,result){
                    if (err) { res.json({ "err_message": "Some query error occurred" }); }
                    else{
                        res.json({ "status": "OK" });
                        connection.release();
                    }
                });
            });
            // con.query(querys, (err, result) => {
            //     if (err) { res.json({ "err_message": "Error occured in query " + err }); }
            //     else {
            //         res.json({ "status": "OK" });
            //     }
            // });
        }
    });

    // //verfiy otp status change
    app.post('/verifyotp', (req, res) => {
        var isotpVerified = req.body.isotpVerified;
        var id = req.body.id;
        //if otp is verified
        if (isotpVerified === true) {
            querys = "update user_dat set otp_verified = 1 where id = '" + id + "'";
            getConnection(function(err,connection){
                connection.query(querys,function(err,result){
                    if (err) { res.json({ "err_message": "Some query error occurred" }); }
                    else{
                        res.json({ "status": "OK" });
                        connection.release();
                    }
                });
            });
            // con.query(querys, (err, result) => {
            //     if (err) { res.json({ "err_message": "Error occured in query " + err }); }
            //     else {
            //         res.json({ "status": "OK" });
            //     }
            // });
        }
        //if otp is not verified
        else if (isotpVerified === false) {
            querys = "update user_dat set otp_verified = 0 where id = '" + id + "'";
            getConnection(function(err,connection){
                connection.query(querys,function(err,result){
                    if (err) { res.json({ "err_message": "Some query error occurred" }); }
                    else{
                        res.json({ "status": "OK" });
                        connection.release();
                    }
                });
            });
            // con.query(querys, (err, result) => {
            //     if (err) { res.json({ "err_message": "Error occured in query " + err }); }
            //     else {
            //         res.json({ "status": "OK" });
            //     }
            // });
        }
    });
    // //update user detail(address)
    app.post('/updateUser', (req, res) => {
        var address = req.body.address;
        var id = req.body.id;
        querys = "update user_dat set address = '" + address + "' where id = '" + id + "'";
        getConnection(function(err,connection){
            connection.query(querys,function(err,result){
                if (err) { res.json({ "err_message": "Some query error occurred" }); }
                else{
                    res.json({ "status": "OK" });
                    connection.release();
                }
            });
        });
        // con.query(querys, (err, result) => {
        //     if (err) { res.json({ "err_message": "Error occured in query " + err }); }
        //     else {
        //         res.json({ "status": "OK" });
        //     }
        // });
    });

     //change password/forgot password
    app.post('/changePassword', (req, res) => {
        var md5_password = req.body.md5_password;
        var id = req.body.id;
        querys = "update user_dat set md5_password = '" + md5_password + "' where id = '" + id + "'";
        getConnection(function(err,connection){
            connection.query(querys,function(err,result){
                if (err) { res.json({ "err_message": "Some query error occurred" }); }
                else{
                    res.json({ "status": "OK" });
                    connection.release();
                }
            });
        });
        // con.query(querys, (err, result) => {
        //     if (err) { res.json({ "err_message": "Error occured in query " + err }); }
        //     else {
        //         res.json({ "status": "OK" });
        //     }
        // });
    });
}