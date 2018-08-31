var express = require("express");
var mongodb = require("mongodb")
var MongoClient = require("mongodb").MongoClient;
var cors = require("cors");
// var mongoose=require("mongoose");
var bodyParser = require("body-parser");
var url = "mongodb://192.168.141.29:27017";
// var url="mongodb://localhost:27017";



// var Schema = mongoose.Schema;
// var ObjectId = Schema.ObjectId;

//mongoose.connect(url,{ useNewUrlParser: true });
// mongoose.connect(url,{ useNewUrlParser: true }).then(
//     () => {console.log('Database is connected') },
//     err => { console.log('Can not connect to the database'+ err)}
// );

var app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//get method for employee menu
app.get('/', function (req, res) {
    // let item_name=req.body.item_name;
    mongodb.MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
        if (err) throw err;
        else {
            //console.log("database connected");


            let db = client.db('MOWA');
            db.collection("items").find({}).toArray(function (err, result) {     //function(err,data){
                if (err) throw err;
                else {
                    res.json(result);
                }
            })

        }

    });
});

//post method for logging in
app.post('/login', function (req, res) {
    var user = req.body.userid;
    var pas = req.body.password;

    //console.log(typeof(user), typeof(pas));
    mongodb.MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {

        if (err) throw err;
        else {
            let db = client.db('MOWA');
            // db.collection("login").find({login_id : user}).toArray(function(err,result){


            //console.log("id = "+user +" password = "+pas);
            db.collection("login").findOne({ 'login_id': user, 'password': pas }, function (err, result) {
                if (err) throw err;
                else if (result == null || !result) {
                    res.json({ success: false, message: "wrong user" });
                    //console.log("result null");
                }
                else {
                    res.json({ success: true, result });
                    //console.log(result);
                }
            })
        }
    });
});


//get method for chef main menu
app.get("/mainmenu", function (req, res) {
    mongodb.MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
        if (err) throw err;
        else {
            db = client.db("MOWA");
            db.collection("menu").find({}).toArray(function (err, result) {
                if (err) throw err;
                else {
                    res.json(result);
                }
            });
        }
    });
});


//posting menu from chef
app.post("/menuselected", function (req, res) {
    let item = req.body.item_name;

    mongodb.MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
        if (err) throw err;
        else {
            db = client.db("MOWA");
            db.collection("items").findOne({ "item_name": item }, function (err, resu) {
                if (err) throw err;
                else if (!resu || resu == null) {
                    db.collection("items").insert({ "item_name": item }, function (err, result) {
                        if (err) throw err;
                        else {
                            res.json({ message: "inserted" });
                            //console.log("successfully added");
                        }
                    })
                }
                else {
                    res.json({ message: "duplicate" })
                }
            });
        }
    });
});


//removing the items from the employess dishes
app.post("/menudelete", function (req, res) {
    let item = req.body.item_name;
    mongodb.MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
        if (err) throw err;
        else {
            db = client.db("MOWA");
            db.collection("items").findOne({ "item_name": item }, function (err, resu) {
                if (err) throw err;
                else if (!resu || resu == null) {
                    res.json({ message: "no item" });
                }
                else {
                    db.collection("items").remove({ "item_name": item }, function (err, resu) {
                        if (err) throw err;
                        else {
                            res.json({ message: "removed" });
                        }
                    });
                }
            });
        }
    });
});

//removing item from main menu
app.post("/mainmenuadd", function (req, res) {
    let item = req.body.item_name;
    mongodb.MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
        if (err) throw err;
        else {
            db = client.db("MOWA");
            db.collection("menu").insert({ "item_name": item }, function (err, resu) {
                if (err) throw err;
                else {
                    res.json({ message: "success" });
                }
            });
        }
    });
});

//increasing the count of attenders
app.post("/attend", function (req, res) {
    let today = req.body.date;
    let attendance = req.body.attendance;
    mongodb.MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
        if (err) throw err;
        else {
            //console.log(attendance);
            if (attendance == "attend") {
                db = client.db("MOWA");
                db.collection("EmployeeCount").findOne({ "Date": today }, function (err, result) {
                    if (err) throw err;
                    else if (!result || result == null) {
                        db = client.db("MOWA");
                        db.collection("EmployeeCount").insert({ "Date": today, "AttendCount": 1, "NotAttendCount": 0 }, function (err, result) {
                            if (err) throw err;
                            else {
                                res.json({ message: "inserted new row" });
                            }
                        });
                    }
                    else if (result) {
                        db = client.db("MOWA");
                        db.collection("EmployeeCount").update({ "Date": today }, { $inc: { AttendCount: 1 } }, function (err, result) {
                            if (err) throw err;
                            else {
                                res.json({ message: "incremented not attend" });
                            }
                        });
                    }
                });
            }
            else if (attendance == "notattend") {
                db = client.db("MOWA");
                db.collection("EmployeeCount").findOne({ "Date": today }, function (err, result) {
                    // db.collection("EmployeeCount").update({"Date" : today},{ $inc: { NotAttendCount:1 } },function(err,result){
                    if (err) throw err;
                    else if (!result || result == null) {
                        db = client.db("MOWA");
                        db.collection("EmployeeCount").insert({ "Date": today, "AttendCount": 0, "NotAttendCount": 1 }, function (err, result) {
                            if (err) throw err;
                            else {
                                res.json({ message: "inserted new row" });
                            }
                        });
                    }
                    else if (result) {
                        db = client.db("MOWA");
                        db.collection("EmployeeCount").update({ "Date": today }, { $inc: { NotAttendCount: 1 } }, function (err, result) {
                            if (err) throw err;
                            else {
                                res.json({ message: "incremented not attend" });
                            }
                        });
                    }
                });
            }
        }
    });
});


app.post("/feedback", function (req, res) {
    let radio = req.body.radio;
    let comment = req.body.msg;
    let name = req.body.user;
    let mail = req.body.email;

    mongodb.MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
        if (err) throw err;
        else {
            db = client.db("MOWA");
            db.collection("feedback").insert({ "name": name, "email": mail, "rating": radio, "comment": comment }, function (err, resu) {
                if (err) throw err;
                else {
                    res.json({ message: "success" });
                }
            });
        }
    });
});


//getting count of people attending
app.post("/count",function(req,res){
    let date = req.body.date;
    mongodb.MongoClient.connect(url, { useNewUrlParser: true }, function (err, client){
        if(err) throw err;
        else {
            db= client.db("MOWA");
            db.collection("EmployeeCount").findOne({"Date":date},function(err,result){
                if(err) throw err;
                else if(!result || result==null){
                    res.json({msg:"norecord"});
                }
                else{
                    res.json(result);
                }
            });
        }
    });
});

app.listen(5000);
