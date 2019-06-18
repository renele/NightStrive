var request = require('request');
var mongoClient = require("mongodb").MongoClient;
var server = "mongodb://heroku_06f8l08c:nfr62mmhsa9vg04n3vovlo9eb7@ds145474.mlab.com:45474/heroku_06f8l08c";
var oldinsulin;
var today = new Date().toISOString();
var insulinreducer = function (addedinsulin) {


  console.log("starting reducer")
  console.log(addedinsulin)
  mongoClient.connect(server, { useNewUrlParser: true }, function (error, db) {
    if (error)
      console.log("Error while connecting to database: ", error);
    else
      //console.log("Connection established successfully");
      //perform operations here

      var dbo = db.db("heroku_06f8l08c");
    dbo.collection("insulin").findOne({}, { sort: { $natural: -1 } }, function (err, result) {
      if (err) throw err;
      console.log(result.insulinleft);
      console.log(addedinsulin)
      var oldinsulin = result.insulinleft;
      console.log("ok happy days Thomas")
      var remaininginsulin = oldinsulin - addedinsulin;
      console.log(remaininginsulin)
      if (!Number.isInteger(remaininginsulin)) throw err;
      var myobj = { type: "Insulin", insulin: "Humalog", insulinleft: remaininginsulin, date: today, };
      dbo.collection("insulin").insertOne(myobj, function (err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        db.close();

      });
    });
  });
}


module.exports = function (controller) {
  controller.hears([/^MEAL.*$/], 'direct_message,direct_mention', function (bot, message) {
    //var word = message.response.log.message
    console.log(message)
    var word = message.text.split(" ")
    var Karbs = word[1]
    var Humalog = word[2]
    console.log()
    const res = (new Date()).toISOString();
    bot.startConversation(message, function (err, convo) {
      convo.say('Ok lets puts this into the diary');

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
          eventType: 'Meal Bolus',
          carbs: Karbs,
          insulin: Humalog,
          created_at: res,
          dia: 4,
        },
        json: true
      };
      insulinreducer(Humalog);

      request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
      });


      convo.say('ok entered ' + Karbs + ' Kohlenhydrathe and ' + Humalog + ' Einheiten Insulin.', function (response, convo) {

        convo.next();
      });

    })
  });

};
