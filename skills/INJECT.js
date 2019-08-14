var request = require('request');
module.exports = function (controller) {
controller.hears([/^INJECT.*$/], 'direct_message,direct_mention', function (bot, message) {
//var word = message.response.log.message
console.log(message)
var word = message.text.split(" ")
var Humalog = word[1]
console.log()
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
               eventType: 'Correction Bolus',
               insulin: Humalog,
               insulinName: 'humalog',
               insulinCurve: 'bilinear',
               insulinID: '1556899407954052d675cdf6',
               insulinType: 'mittelschnell wirkend',
                },
            json: true };
          
          request(options, function (error, response, body) {
            if (error) throw new Error(error);
          
            console.log(body);
          });
              
                
                convo.say('ok entered ' + Humalog +' Einheiten Insulin in your Diary.', function (response, convo) {
                   
                    convo.next();
                });
    
              })
        });
    };
