var request = require('request');
module.exports = function (controller) {
controller.hears([/^LANG.*$/], 'direct_message,direct_mention', function (bot, message) {
//var word = message.response.log.message
console.log(message)
var ABASA = [$1]
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
