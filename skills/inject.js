var request = require('request-promise');
var mongoClient = require("mongodb").MongoClient;
var server = "mongodb://heroku_06f8l08c:nfr62mmhsa9vg04n3vovlo9eb7@ds145474.mlab.com:45474/heroku_06f8l08c";
var oldinsulin;
var today = new Date().toISOString();
var insulinreducer = function (addedinsulin){
  console.log("starting reducer")
  console.log(addedinsulin)

  return new Promise(
      function(resolve,reject){
        mongoClient.connect(server, { useNewUrlParser: true }, function (error, db) {
          if (error)
            console.log("Error while connecting to database: ", error);
          else
          //console.log("Connection established successfully");
          //perform operations here

            var dbo = db.db("heroku_06f8l08c");
          dbo.collection("humalog").findOne({}, { sort: { $natural: -1 } }, function (err, result) {
            if (err) throw err;
            console.log(result.insulinleft);
            console.log(addedinsulin)
            var oldinsulin = result.insulinleft;
            console.log("ok happy days Thomas")
            var remaininginsulin = oldinsulin - addedinsulin;
            console.log(remaininginsulin)
            if (!Number.isInteger(remaininginsulin)) throw err;
            var myobj = { type: "Bolus Insulin", insulin: "Humalog", insulinleft: remaininginsulin, date: today, };
            dbo.collection("humalog").insertOne(myobj, function (err, res) {
              if (err){
                console.log(err);
                reject(err);
              }
              console.log("1 document inserted");
              db.close();
              console.log('end of promise insuinreducer ' + remaininginsulin)
              resolve(remaininginsulin);
              
            });
          });
        });
      }
  )
}

var nightscoutpost = function (Humalog){
  var options = {
    method: 'POST',
    url: 'https://rkt1d.herokuapp.com/api/v1/treatments',
    headers:
    {
      'cache-control': 'no-cache',
      'Content-Type': 'application/json',
      'API-SECRET': '75c5b0956523255b2c400b8174e58221f9633c02'
    },
    body:
    {
      enteredBy: 'botKit',
      insulinName: 'humalog',
      insulinCurve: 'bilinear',
      insulinID: '1556899407954052d675cdf6',
      insulinType: 'mittelschnell wirkend',
      carbDelayTime: 20,
      eventType: 'Correction Bolus',
      insulin: Humalog,
      created_at: new Date().toISOString(),
      dia: 4,
    },
    json: true
  };


  return request(options);
}

module.exports = function (controller) {
  controller.hears([/^INJECT.*$/], 'direct_message,direct_mention', function (bot, message) {
    //var word = message.response.log.message
    console.log(message)
    var word = message.text.split(" ")
    var Humalog = word[1]
    console.log()
      bot.startConversation(message, function (err, convo) {
      convo.say('Ok lets puts this into the diary');

      Promise.all([
        insulinreducer(Humalog),
        nightscoutpost(Humalog)
      ])
      .then((insulinreducerResponse) => {
        console.log(insulinreducerResponse[0])
        convo.say('Ok entered '+ Humalog + ' Einheiten Insulin, you have ' + insulinreducerResponse[0] + ' Einheiten left in your Pen.', function (response, convo) {
          convo.next();
        });
      }).catch(err => {
        console.log(err);
        convo.say('something went wrong please check the logs -> https://dashboard.heroku.com/apps/rkt1d' + err, function (response, convo) {
          convo.next();
        });
      });   
    });
  })
};
