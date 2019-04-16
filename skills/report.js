// https://user-images.githubusercontent.com/37514390/42634676-1ba67bfa-85e4-11e8-9f6c-421dc278363b.jpg

var request = require('request');
module.exports = function (controller) {

    
    controller.hears([/^REPORT$/], 'direct_message,direct_mention', function (bot, message) {

        bot.startConversation(message, function (err, convo) {
            convo.say('Ok lets check the Reports');

var options = { method: 'GET',
  url: 'https://api.nasa.gov/planetary/apod',
  qs: { api_key: '2TmpjkT9PSZhCM7HtFzblAjmy6eW3V0H6qJvfCHi' },
  json: true,
  headers:  { } };
request(options, function (error, response, body) {
  if (error) throw new Error(error);

 // console.log(response.body.explanation);
 // console.log(" ");
 // console.log(response.body.hdurl)

  bot.reply(message,{text:'Here is your file!', files:['https://user-images.githubusercontent.com/37514390/42634676-1ba67bfa-85e4-11e8-9f6c-421dc278363b.jpg']});


                });
    
              })
        });
};
