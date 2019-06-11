var mongoClient = require("mongodb").MongoClient;
var server = "mongodb://heroku_06f8l08c:nfr62mmhsa9vg04n3vovlo9eb7@ds145474.mlab.com:45474/heroku_06f8l08c";
var oldinsulin;
var addedinsulin = Humalog ;
var today = new Date().toISOString();
mongoClient.connect(server, { useNewUrlParser: true }, function(error, db)  { 
if(error)
console.log("Error while connecting to database: ", error);
else
//console.log("Connection established successfully");
    //perform operations here

    var dbo = db.db("heroku_06f8l08c");
    dbo.collection("insulin").findOne({}, {sort:{$natural:-1}}, function(err, result) {
      if (err) throw err;
      console.log(result.insulinleft);
      oldinsulin = result.insulinleft;
      var remaininginsulin = oldinsulin - addedinsulin ;
      var myobj = { type: "Insulin", insulin: "Humalog", insulinleft: remaininginsulin, date: today, };
      dbo.collection("insulin").insertOne(myobj, function(err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      db.close();
      
    });
    });
  });
