import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

require('dotenv').config();
export interface IWindow extends Window {
  webkitSpeechRecognition: any;
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'

})


export class HomePage {
static isRuning: any;
static textResult: string;

  constructor(public navCtrl: NavController) {
    HomePage.isRuning = false;
    HomePage.textResult = '';
  }
  


 public getLuisIntent() {

var request = require('request');
var querystring = require('querystring');
    // endpoint URL
    var endpoint =
        'https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/';

    // Set the LUIS_APP_ID environment variable 
    // to df67dcdb-c37d-46af-88e1-8b97951ca1c2, which is the ID
    // of a public sample application.    
    var luisAppId = 'd265e869-0407-4c6f-8520-3de7ef662231';

    // Read LUIS key from environment file ".env"
    // You can use the authoring key instead of the endpoint key. 
  // The authoring key allows 1000 endpoint queries a month.
    var endpointKey = '88c2a8145a08422daf5e94ef519cf516';

    // Create query string 
    var queryParams = {
        "verbose":  true,
        "q": HomePage.textResult,
        "subscription-key": endpointKey
    }

    // append query string to endpoint URL
    var luisRequest =
        endpoint + luisAppId +
        '?' + querystring.stringify(queryParams);

    // HTTP Request
    request(luisRequest,
        function (err, response, body) {
            // HTTP Response
            if (err){
                console.log(err);
                document.getElementById('result').innerHTML ='error!';
            }

            var data = JSON.parse(body);
            if(`${data.query}`=='null'){
              let noneAudio =new Audio();
              noneAudio.src = '../assets/audio/mock_none.mp3';
              noneAudio.play();
            }

            else{
                var resIntent = `${data.topScoringIntent.intent}`;
                // document.getElementById('result').innerHTML = ` Query: ${data.query}`+resIntent;
                 // document.getElementById('result').innerHTML = resIntent;
                if(resIntent == 'MyLocation'){
                  let myLocationAudio =new Audio();
                  myLocationAudio.src = '../assets/audio/mock_myLocation.mp3';
                  myLocationAudio.play();
                }
                else if(resIntent == 'AroundMe'){
                  let aroundMeAudio =new Audio();
                  aroundMeAudio.src = '../assets/audio/mock_aroundMe.mp3';
                  aroundMeAudio.play();
                }
                else if(resIntent == 'NearbyMarkers'){
                  let nearbyMarkersAudio =new Audio();
                  nearbyMarkersAudio.src = '../assets/audio/mock_nearbyMarkers.mp3';
                  nearbyMarkersAudio.play();
                }
                else if(resIntent == 'AheadOfMe'){
                  let aheadOfMeAudio =new Audio();
                  aheadOfMeAudio.src = '../assets/audio/mock_aheadOfMe.mp3';
                  aheadOfMeAudio.play();
                }
                else if(resIntent == 'Help'){
                  let helpAudio =new Audio();
                  helpAudio.src = '../assets/audio/mock_help.mp3';
                  helpAudio.play();
                }
                else{
                  let noneAudio =new Audio();
                  noneAudio.src = '../assets/audio/mock_none.mp3';
                  noneAudio.play();
                }
               
            }
        });
}


 public startConverting () {
  HomePage.isRuning=!HomePage.isRuning;

    if('webkitSpeechRecognition' in window){
      const {webkitSpeechRecognition} : IWindow = <IWindow>window;
      const speechRecognizer = new webkitSpeechRecognition();
      speechRecognizer.continuous = true;
      speechRecognizer.interimResults = true;
      speechRecognizer.lang = 'en-IN';
      speechRecognizer.start();

      if(HomePage.isRuning){
        document.getElementById('cortana').innerHTML = 'Stop';
      }
      else{
        HomePage.textResult = document.getElementById('result').innerHTML;
        document.getElementById('cortana').innerHTML = 'Cortana';
        // document.getElementById('result').innerHTML = HomePage.textResult;//test
        this.getLuisIntent();
      }
      var finalTranscripts = '';

      speechRecognizer.onresult = function(event){
        var interimTranscripts = '';
        for(var i = event.resultIndex; i < event.results.length; i++){
          if(!HomePage.isRuning){
            break;
          }
          var transcript = event.results[i][0].transcript;
          transcript.replace("\n", "<br>");
          if(event.results[i].isFinal){
            finalTranscripts += transcript;
          }else{
            interimTranscripts += transcript;
          }
        }
         document.getElementById('result').innerHTML = finalTranscripts + interimTranscripts ;
      };
      speechRecognizer.onerror = function (event) {
      };
    }else{
       document.getElementById('result').innerHTML = 'Your browser is not supported. If google chrome, please upgrade!';
    }
  }


  mock_myLocation(){
    let myLocationAudio =new Audio();
    myLocationAudio.src = '../assets/audio/mock_myLocation.mp3';
    myLocationAudio.play();
  }

  mock_nearbyMarkers(){
    let nearbyMarkersAudio =new Audio();
    nearbyMarkersAudio.src = '../assets/audio/mock_nearbyMarkers.mp3';
    nearbyMarkersAudio.play();
  }

  mock_aroundMe(){
    let aroundMeAudio =new Audio();
    aroundMeAudio.src = '../assets/audio/mock_aroundMe.mp3';
    aroundMeAudio.play();
  }

  mock_aheadOfMe(){
    let aheadOfMeAudio =new Audio();
    aheadOfMeAudio.src = '../assets/audio/mock_aheadOfMe.mp3';
    aheadOfMeAudio.play();
  }


}
