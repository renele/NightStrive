var request = require("request");
var mongoClient = require("mongodb").MongoClient;
var server = "mongodb://heroku_06f8l08c:nfr62mmhsa9vg04n3vovlo9eb7@ds145474.mlab.com:45474/heroku_06f8l08c";
var token;
mongoClient.connect(server, { useNewUrlParser: true }, function(error, db)  { 
if(error)
console.log("Error while connecting to database: ", error);
else
console.log("Connection established successfully");
    //perform operations here

    var dbo = db.db("heroku_06f8l08c");
    dbo.collection("activity").findOne({}, {sort:{$natural:-1}}, function(err, result) {
      if (err) throw err;
      console.log(result.token);
      token = result.token;

      db.close();
    });
    });
module.exports = function (controller) {

    
  controller.hears([/^STRAVA$/], 'direct_message,direct_mention', function (bot, message) {
console.log(token)
      bot.startConversation(message, function (err, convo) {
          convo.say('Ok lets the last sport session');


            request.get({
                url: "https://www.strava.com/api/v3/activities",
                json: true,
		page: '1', 
		per_page: '1', 
		scope: 'view_private',
                headers: {'User-Agent': 'request',
		Authorization: 'Bearer ' + token
}
              }, (err, res, data) => {
                var sportsact = data
                var strecke = (sportsact[0].distance);
                var event = (sportsact[0].name);
                var herzrate = (sportsact[0].average_heartrate);
 //               console.log(strecke + ' Meters');  
 //               console.log(event);  

 
                bot.reply(message,{text: strecke + ' Meter ' + event + ' bei einer Herzfrequenz von ' + herzrate});

                    

                 
                  })
            });
    
        });
    };

