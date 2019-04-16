var request = require('request');
module.exports = function (controller) {

    
    controller.hears([/^BG$/], 'direct_message,direct_mention', function (bot, message) {

        bot.startConversation(message, function (err, convo) {
            convo.say('Ok lets check your Blood Sugar Level');
            request.get({
                url: "https://rkt1d.herokuapp.com/api/v1/entries/current.json",
                json: true,
                headers: {'User-Agent': 'request'}
              }, (err, res, data) => {
                var bloodsugar = data
                var sgv = (bloodsugar[0].sgv);
                console.log(sgv);  
              
                
                convo.say(sgv + ' this looks ok!', function (response, convo) {
                convo.say();    
                    convo.next();
                });
    
              })
        });

    });
};