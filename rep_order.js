const { query } = require('express');

module.exports = (app, getConnection) => {
    
    var bodyParser = require('body-parser');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.post('/reg_order', (req, res) => {
        var operation = req.body.operation;
        //this will return all the orders for a perticular user(id)
        if (operation === 'getallorders') {
            res.redirect(307, '/getallOrders');
        }
        //this will submit an order
        else
            if (operation === 'doorder') {
                res.redirect(307, '/doOrder');
            }
            //this will cancel an order
            else
                if (operation === 'cancelorder') {
                    res.redirect(307, '/cancelOrder');
                }
                else
                    if (operation === 'confirmorder') {
                        res.redirect(307, '/confirmOrder');
                    }
                    else
                        if (operation === 'getstatus') {
                            res.redirect(307, '/getStatus');
                        }
                        else { res.json({ "err_message": "key value error" }); }

    });

    app.post('/getallOrders', (req, res) => {
        var userId = req.body.userId;
        var querys = "select * from rep_order_dat where userId = '" + userId + "'";
        getConnection(function (err, connection) {
            connection.query(querys, function (err, result) {
                if (err) {
                    res.json({ "err_message": "Some query/query parameter error occurred" });
                }
                else {
                    res.json(JSON.stringify(result));
                }
            });
        });
    });

    app.post('/doOrder', (req, res) => {
        var prodId = req.body.prodId;
        var orderQuant = req.body.orderQuant;
        var userId = req.body.userId;
        var orderStatus = req.body.orderStatus;
        var orderId = 0;
        var orderQuantexs;

        var querys1 = "select totalQuant as orderQuantex from product_dat where productId = '" + prodId + "'";
        getConnection(function (err, connection) {
            connection.query(querys1, function (err, result) {
                if (err) {
                    res.json({ "err_message": "Some query/query parameter error occurred" });
                }
                else {
                    orderQuantexs = result[0].orderQuantex;
                    if (orderQuant <= orderQuantexs) {
                        var querys = "insert into rep_order_dat values('" + orderId + "','" + prodId + "','" + orderQuant + "','" + userId + "','" + orderStatus + "')";
                        //  getConnection(function(err,connection){
                        connection.query(querys, function (err, result) {
                            if (err) {
                                res.json({ "err_message": "Some query/query parameter error occurred" });
                            }
                            else {
                                res.json({ "message": "Order Successful" });
                                var remQuant = orderQuantexs - orderQuant;
                                var querys2 = "update product_dat set totalQuant = '" + remQuant + "'where productId = '" + prodId + "'";
                                connection.query(querys2, function (err, result) {
                                    if (err) { res.json({ "err_message": "some error occurred while updating the product" }); }
                                    else {
                                        console.log("product table updation successful");
                                    }
                                });
                                connection.release();
                            }
                        });
                        //});
                    }
                    else {
                        res.json({ "error_message": "No that much stock" });
                    }

                }
            });
        });
        // con.query(querys, (err, result) => {
        //     if (err) {
        //         res.json({ "err_message": "Some query/query parameter error occurred" });
        //     }
        //     else {
        //         res.json({ "message": "Order Successful" });
        //     }
        // });     
    });

    app.post('/cancelOrder', (req, res) => {
        var orderId = req.body.orderId;

        var querys1 = "select orderQuant,prodId from rep_order_dat where orderId = '" + orderId + "'";
        getConnection(function (err, connection) {
            connection.query(querys1, function (err, result) {
                if (err) {
                    res.json({ "err_message": "Some query/query parameter error occurred1" });
                }
                else {
                    var querys2 = "update product_dat set totalQuant = totalQuant + '" + result[0].orderQuant + "' where productId = '" + result[0].prodId + "'";
                    connection.query(querys2, function (err, result) {
                        if (err) {
                            res.json({ "err_message": "Some query/query parameter error occurred2" });
                        }
                        else {
                            var querys = "delete from rep_order_dat where orderId = '" + orderId + "'";
                            connection.query(querys, function (err, result1) {
                                if (err) {
                                    res.json({ "err_message": "Some query/query parameter error occurred3" });
                                }
                                else {
                                    //console.log("Order Deletion successful");
                                    res.json({"message" : "Order deletion Successful"});
                                }
                            });
                        }
                    });
                }
            });
        });
        // con.query(querys, (err, result) => {
        //     if (err) {
        //         res.json({ "err_message": "Some query/query parameter error occurred" });
        //     }
        //     else {
        //         res.json({ "message": "Order Cancelation Successful" });
        //     }
        // });
    });

    app.post('/confirmOrder', (req, res) => {
        var orderId = req.body.orderId;
        var querys = "update rep_order_dat set orderStatus = 'CNF' where orderId = '" + orderId + "'";
        getConnection(function (err, connection) {
            connection.query(querys, function (err, result) {
                if (err) {
                    res.json({ "err_message": "Some query/query parameter error occurred" });
                }
                else {
                    res.json({ "message": "Order Confirmation Successful" });
                }
            });
        });

        // con.query(querys, (err, result) => {
        //     if (err) {
        //         res.json({ "err_message": "Some query/query parameter error occurred" });
        //     }
        //     else {
        //         res.json({ "message": "Order Confirmation Successful" });
        //     }
        // });
    });

    app.post('/getStatus', (req, res) => {
        var orderId = req.body.orderId;
        querys = "select orderStatus from rep_order_dat where orderId = '" + orderId + "'";
        getConnection(function (err, connection) {
            connection.query(querys, function (err, result) {
                if (err) {
                    res.json({ "err_message": "Some query/query parameter error occurred" });
                }
                else {
                    if (result.length !== 0) {
                        res.json({ "orderStatus": result[0].orderStatus });
                    }
                    else {
                        res.json({ "err_message": "Order doesn't exist" });
                    }
                }
            });
        });
    });
}