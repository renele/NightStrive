var request = require('request-promise');
var today = new Date().toISOString();
var CARBS; 
var CARBS1;
var LABEL; 
var edemapost = function (eat){
  console.log("starting foodDB connection")
  console.log(eat + ' inside edemapost 1')

  return new Promise(
      function(resolve,reject){
        var request = require('request');
		request.get({
		url: "https://api.edamam.com/api/food-database/parser",
		json: true,
		qs: 
		{ ingr: eat,
		app_id: 'f6fa7396',
		app_key: '0aaafd4677be5d2c7297f3d3389ac92a' },
		headers: 
			{ Host: 'api.edamam.com',
                Accept: '*/*'} },
			(err, res, data) => {
                if (err){
                    console.log(err);
                    reject(err);
                  }
      console.log(data.parsed)
      if (Array.isArray(data.parsed) && data.parsed.length){
       var CARBS = data['parsed'][0]['food']['nutrients']['CHOCDF'] 
        console.log(CARBS + '  inside edemafunction 2'); 
        resolve([CARBS,"NF"]);
      }           
     else if(Array.isArray(data.hints) && data.hints.length){
     var CARBS = data['hints'][0]['food']['nutrients']['CHOCDF']
     var LABEL = data['hints'][0]['food']['label'] 
      console.log(CARBS + '  inside edemafunction 3'); 
      console.log(LABEL + '  inside edemafunction 4');
      resolve(["NF",CARBS,LABEL]);
     }
     else {reject('not found')
     }
                  })
            });
        };
module.exports = function (controller) {
  controller.hears([/^FOOD.*$/], 'direct_message,direct_mention', function (bot, message) {
    //var word = message.response.log.message
    console.log(message)
    var word = message.text.split(" ")
    var eat = word[1]
    console.log(eat + 'ok goood it from webex imput')
      bot.startConversation(message, function (err, convo) {
      edemapost(eat)
      .then((edemapostResponse) => {
         console.log(edemapostResponse + ' resolved promise 1')
        var CARBS = edemapostResponse
         console.log(CARBS + ' resolved promise 2')
                  if (CARBS[0] != "NF" ) {
                    console.log (CARBS[0])
          convo.say('ok ' + eat + ' hat ' + CARBS[0] + ' gramm an Kohlenhydraten (per 100g)!' )
         }
         else{
          convo.say('ok eintrag '+ eat + ' nicht direkt gefunden, aber: ' + CARBS[2] + ' hat ' + CARBS[1] + ' gramm an Kohlenhydraten (per 100g)!')
         }
      }).catch(err => {
        console.log(err);
        convo.say('ok we could not find the food you were looking to doublecheck see here -> https://dashboard.heroku.com/apps/rkt1d ' + err)
      });
    });
});
};
    
