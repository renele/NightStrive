var request = require("request");

module.exports = function (controller) {

    
  controller.hears([/^REDDIT$/], 'direct_message,direct_mention', function (bot, message) {

      bot.startConversation(message, function (err, convo) {
          convo.say('Ok lets have some fun');


request.get({
                url: "https://www.reddit.com/r/funny.json",
                json: true,
		
                headers: {'User-Agent': 'request',
		}

              }, (err, res, data) => {
                var funny = data
                var pictures = (funny)
                var pic1 = (pictures['data']['children'][0]['data']['url'])
                var pic2 = (pictures['data']['children'][1]['data']['url'])
                var pic3 = (pictures['data']['children'][2]['data']['url'])
                var pic4 = (pictures['data']['children'][3]['data']['url'])
                var pic5 = (pictures['data']['children'][4]['data']['url'])
                var pic6 = (pictures['data']['children'][5]['data']['url'])


                bot.reply(message,{text: pic1});
                bot.reply(message,{text:'Here is your file!', files:[pic1]});
                bot.reply(message,{text: pic2});
                bot.reply(message,{text:'Here is your file!', files:[pic2]});
                bot.reply(message,{text: pic3});
                bot.reply(message,{text:'Here is your file!', files:[pic3]});
                bot.reply(message,{text: pic4});
                bot.reply(message,{text:'Here is your file!', files:[pic4]});
                bot.reply(message,{text: pic5});
                bot.reply(message,{text:'Here is your file!', files:[pic5]});
                bot.reply(message,{text: pic6});
                bot.reply(message,{text:'Here is your file!', files:[pic6]});
//               console.log(pic1)
//                console.log(pic2) 
//                console.log(pic3) 
//                console.log(pic4) 
//                console.log(pic5)  
//                console.log(pic6)  

              });
            });
          });
        };
  

// response['rows'][0]['elements']['distance']['test']