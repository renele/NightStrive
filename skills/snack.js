var request = require('request');
module.exports = function (controller) {
controller.hears([/^SNACK.*$/], 'direct_message,direct_mention', function (bot, message) {
//var word = message.response.log.message
console.log(message)
var word = message.text.split(" ")
var CARBS = word[1]
var notiz = word[2]
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
             { enteredBy: 'botKit',
               eventType: 'Carb Correction',
               carbs: CARBS,
               notes: notiz,
               },
            json: true };
          
          request(options, function (error, response, body) {
            if (error) throw new Error(error);
          
            console.log(body);
          });
              
                
                convo.say('ok entered ' + CARBS +' Gramm and Kohlenhydraten to your Diary.', function (response, convo) {
                   
                    convo.next();
                });
    
              })
        });

    };
