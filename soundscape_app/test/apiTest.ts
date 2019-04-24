

var request = require('request');
var querystring = require('querystring');
var assert = require('assert');
var endpoint =
    'https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/';
var luisAppId = 'd265e869-0407-4c6f-8520-3de7ef662231';

var endpointKey = '88c2a8145a08422daf5e94ef519cf516';

// Create query string 
var queryParams = {
    "verbose":  true,
    "q": '',
    "subscription-key": endpointKey
}
var aroundMeTestCases = ["around of me","what is around of me", "what is nearby"];
var helpTestCases = ["what do I do","please give me some instructions", "I need some hints", 
"how to use this app", "what are the available commands"];
var placeTestCases = ["nearby supermarket", "nearby hospital", "nearby bank", "supermarket around me",
    "banks around of me", "where is the nearest shop", "how to get to the nearest restaurant", 
    "tell me the hospital around of me", "I want to find a restaurant"];
var intentFromAPI;

for (var i=0; i< placeTestCases.length;i++){
  queryParams.q=placeTestCases[i];
  getIntent(queryParams);
  assert(intentFromAPI === "direction");
}
for (var i=0; i< helpTestCases.length;i++){
  queryParams.q=helpTestCases[i];
  getIntent(queryParams);
  assert(intentFromAPI === "help");
}
for (var i=0; i< aroundMeTestCases.length;i++){
  queryParams.q=aroundMeTestCases[i];
  getIntent(queryParams);
  assert(intentFromAPI === "AroundMe");
}

function getIntent(para){
  var luisRequest =
      endpoint + luisAppId +
      '?' + querystring.stringify(para);

  request(luisRequest,
      function (err, response, body) {
          // HTTP Response
          if (err){
              console.log(err);
              document.getElementById('result').innerHTML ='error!';
          }

          var data = JSON.parse(body);
         
          var resIntent = `${data.topScoringIntent.intent}`;
          intentFromAPI = resIntent; 
  });
}