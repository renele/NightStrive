var request = require('request');
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

            var options = { method: 'POST',
            url: 'https://rkt1d.herokuapp.com/api/v1/treatments',
            headers: 
             { 'cache-control': 'no-cache',
               'Content-Type': 'application/json',
               'API-SECRET': '75c5b0956523255b2c400b8174e58221f9633c02' },
            body: 
             { enteredBy: 'botKit',
               eventType: 'Meal Bolus',
               carbs: Karbs,
               insulin: Humalog,
               created_at: res,
               },
            json: true };
          
          request(options, function (error, response, body) {
            if (error) throw new Error(error);
          
            console.log(body);
          });
              
                
                convo.say('ok entered ' + Karbs + ' Kohlenhydrathe and ' + Humalog +' Einheiten Insulin', function (response, convo) {
                   
                    convo.next();
                });
    
              })
        });

    };
