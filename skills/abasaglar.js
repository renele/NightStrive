var request = require('request');
var mongoClient = require("mongodb").MongoClient;
var server = "mongodb://heroku_06f8l08c:nfr62mmhsa9vg04n3vovlo9eb7@ds145474.mlab.com:45474/heroku_06f8l08c";
var oldinsulin;
var today = new Date().toISOString();
var remaininginsulin;
var insulinreducer = function (addedinsulin) {

  mongoClient.connect(server, { useNewUrlParser: true }, function (error, db) {
    if (error)
      console.log("Error while connecting to database: ", error);
    else
      //console.log("Connection established successfully");
      //perform operations here

      var dbo = db.db("heroku_06f8l08c");
    dbo.collection("abasaglar").findOne({}, { sort: { $natural: -1 } }, function (err, result) {
      if (err) throw err;
      var oldinsulin = result.insulinleft;
      var wastedinsulin = 2;
      var remaininginsulin = oldinsulin - addedinsulin - wastedinsulin;
      if (!Number.isInteger(remaininginsulin)) throw err;
      var myobj = { type: "Basal Insulin", insulin: "ABASAGLAR", insulinleft: remaininginsulin, date: today, };
      dbo.collection("abasaglar").insertOne(myobj, function (err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        db.close();

      });
    });
  });
}



module.exports = function (controller) {
controller.hears([/^LANG.*$/], 'direct_message,direct_mention', function (bot, message) {
//var word = message.response.log.message
console.log(message)
var word = message.text.split(" ")
var ABASA = word[1]
console.log()
const res = (new Date()).toISOString();
        bot.startConversation(message, function (err, convo) {
            convo.say('Ok lets puts this into the diary');

            var options = { method: 'POST',
            url: 'https://rkt1d.herokuapp.com/api/v1/treatments',
            headers: 
             { 'cache-control': 'no-cache',
               'Content-Type': 'application/json',
               'API-SECRET': '75c5b0956523255b2c400b8174e58221f9633c02' },
            body: 
             { 
               enteredBy: 'botKit',
               absolute: ABASA,
               insulinName: "Abasaglar",
               insulinDIA: 24,
               eventType: "Temp Basal",
               insulinID: "1556899424730d4c73ced99f",
               insulinType: "Langwirkend",
               duration: 1440,
               created_at: res,
               },
            json: true };
            insulinreducer(ABASA);

          
          request(options, function (error, response, body) {
            if (error) throw new Error(error);
          
            console.log(body);
          });
              
                
                convo.say('ok entered ' + ABASA + ' an Langzeit Insulin Abasaglar.', function (response, convo) {
                   
                    convo.next();
                });
    
              })
        });

    };
