import { Component } from '@angular/core';
import {NavController, Platform} from 'ionic-angular';
// import { Geolocation } from '@ionic-native/geolocation';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
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

  constructor(public navCtrl: NavController, public platform: Platform, public tts: TextToSpeech,private speechRecognition: SpeechRecognition) {
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



    function queryPlace(queryString){
      var latLng;

      navigator.geolocation.getCurrentPosition(storePosition, handleLocationError, 
        {timeout:10000, enableHighAccuracy:true});

      function handleLocationError(error) {
        switch (error.code) {
          case 3:
          document.getElementById('result').innerHTML = 'ERR: timeout';
            // ...deal with timeout
            break;
          case 2:
          document.getElementById('result').innerHTML = 'ERR: device cannot get data';
            // ...device can't get data
            break;
          case 1:
          document.getElementById('result').innerHTML = 'ERR: User denied';
            // ...user said no
        }
      }

      function storePosition(position) {
        const lng = position.coords.longitude;
        const lat = position.coords.latitude;

        latLng=`${ lat },${ lng }`;
        var type = queryString;
        var url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?'+'location='+
        latLng+'&'+'type='+type+
        '&rankby=distance&key=AIzaSyDfiZXyzHzKdHkjT_7kSStHat6OggMOkXY';
        var request = require('request');
        request.get({
            url: url,
            json: true,
            headers: {'User-Agent': 'request'}
            }, (err, res) => {
              if (err) {
                document.getElementById('result').innerHTML = 'inner err';
                console.log(err);
              } 
              else {
                var temp = '';
                for (var i = 0; i <3; i++) {
                  var lat2 = parseFloat(`${res.body.results[i].geometry.location.lat}`);
                  var lng2 = parseFloat(`${res.body.results[i].geometry.location.lng}`);
                  const earthRadius = 6371000; //meters
                  var dLat = (lat2-lat) * Math.PI / 180;
                  var dLng = (lng2-lng) * Math.PI / 180;
                  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                  Math.cos(lat* Math.PI / 180) * Math.cos(lat2* Math.PI / 180) *
                  Math.sin(dLng/2) * Math.sin(dLng/2);
                  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
                  var dist =  Math.round(2 *earthRadius * c);
                  var dir='';
                  if (dLng >0 && Math.abs(dLat/dLng)<0.3827)
                    dir = 'East';
                  else if(dLng <0 && Math.abs(dLat/dLng)<0.3827)
                    dir = 'West';
                  else if(dLat >0 && Math.abs(dLng/dLat)<0.3827)
                    dir = 'North';
                  else if(dLat <0 && Math.abs(dLng/dLat)<0.3827)
                    dir = 'South';
                  else if(dLat>0 && dLng>0)
                    dir = 'North East';
                  else if(dLat>0 && dLng<0)
                    dir = 'North West';
                  else if(dLat<0 && dLng>0)
                    dir = 'South East';
                  else
                    dir = 'South West';
                  if(res.body.results[i]!=null){
                  var name = `${res.body.results[i].name}`+": "+dist+' meters'+' at '+dir;
                  temp = temp+'   '+name+'.';
                  // this.tts.speak('Hello World');
                  document.getElementById('result').innerHTML = temp;

                  }
                  // else{
                  //   document.getElementById('result').innerHTML = 'none';
                  // }
                 }

                  
                  var msg = new SpeechSynthesisUtterance(temp);
                  window.speechSynthesis.speak(msg);

                 // document.getElementById('result').innerHTML = url;
                
              }
      });
      }
    }


    // HTTP Request
    request(luisRequest,
        function (err, response, body) {
            // HTTP Response
            if (err){
                console.log(err);
                document.getElementById('result').innerHTML ='error!';
            }

            var data = JSON.parse(body);
            if(`${data.query}`=='null' || HomePage.textResult.length<3){
              let noneAudio =new Audio();
              noneAudio.src = '../assets/audio/mock_none.mp3';
              noneAudio.play();
            }

            else{
                var resIntent = `${data.topScoringIntent.intent}`;
                // document.getElementById('result').innerHTML = ` Query: ${data.query}`+resIntent;
                 document.getElementById('result').innerHTML = resIntent;
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
                else if(resIntent == 'direction'){
                  var querystringNearby = require('querystring');
                  // endpoint URL
                  
                  // Set the LUIS_APP_ID environment variable 
                  // to df67dcdb-c37d-46af-88e1-8b97951ca1c2, which is the ID
                  // of a public sample application.    
                  var placeAppId = '760964ed-8eb2-4680-8d3d-f00a50cff515';

                  // Read LUIS key from environment file ".env"
                  // You can use the authoring key instead of the endpoint key. 
                // The authoring key allows 1000 endpoint queries a month.
                  var endpointKey = '88c2a8145a08422daf5e94ef519cf516';

                  // Create query string 
                  var placeQueryParams = {
                      "verbose":  true,
                      "q": ` Query: ${data.query}`,
                      "subscription-key": endpointKey
                  }

                  // append query string to endpoint URL
                  var luisRequest =
                      endpoint + placeAppId +
                      '?' + querystringNearby.stringify(placeQueryParams);

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
                              if(resIntent == 'bank'){
                                queryPlace('bank');
                                document.getElementById('result').innerHTML = 'bank';
                              }
                              else if(resIntent == 'hospital'){
                                queryPlace('hospital');
                                document.getElementById('result').innerHTML = 'hospital';
                              }
                              else if(resIntent == 'restaurant'){
                                queryPlace('restaurant');
                                document.getElementById('result').innerHTML = 'restaurant';
                              }
                              else if(resIntent == 'shop'){
                                queryPlace('store');
                                 document.getElementById('result').innerHTML = 'shop';
                              }
                              else{
                                document.getElementById('result').innerHTML = 'place none';
                              }
                             
                          }
                      });

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
  var speechRecognizer:any;

      if (this.platform.is('cordova')) {
      var finalTranscript = ''; 
      // SpeechRecognition.isRecognitionAvailable()
      //   .then((available: boolean) => console.log(available))
      
      if(HomePage.isRuning){
        document.getElementById('cortana').innerHTML = 'Stop';
      }
      else{
        HomePage.textResult = document.getElementById('result').innerHTML;
        document.getElementById('cortana').innerHTML = 'Cortana';
        this.speechRecognition.stopListening();
        // document.getElementById('result').innerHTML = HomePage.textResult;//test
        this.getLuisIntent();
      }

      // this.speechRecognition.isRecognitionAvailable()
      //   .then((available: boolean) => document.getElementById('result').innerHTML = 'available');

      // this.speechRecognition.hasPermission()
      //   .then((hasPermission: boolean) =>document.getElementById('result').innerHTML = 'hasPermission');

      this.speechRecognition.startListening()
        .subscribe(
        (matches: string[]) => finalTranscript=matches.join(),
        (onerror) => console.log('error:', onerror)
      );
      
        document.getElementById('result').innerHTML = finalTranscript;//test
  
      } 
      else{
        if(!('webkitSpeechRecognition' in window)){
          document.getElementById('result').innerHTML = 'Your browser is not supported. If google chrome, please upgrade!';
        }
        else{
            const {webkitSpeechRecognition} : IWindow = <IWindow>window;
           speechRecognizer = new webkitSpeechRecognition();
        }
      
    
      // var speechRecognizer = new SpeechRecognition(); // To Device
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
        speechRecognizer.stop();
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
    }



  }




  mock_myLocation(){
    let myLocationAudio =new Audio();
    myLocationAudio.src = '../assets/audio/mock_myLocation.mp3';
    myLocationAudio.play();  }

  mock_nearbyMarkers(){
    let nearbyMarkersAudio =new Audio();
    nearbyMarkersAudio.src = '../assets/audio/mock_nearbyMarkers.mp3';
    nearbyMarkersAudio.play();
  }
  mock_aroundMe(){
    var latLng;

    navigator.geolocation.getCurrentPosition(storePosition, handleLocationError, {timeout:30000, enableHighAccuracy:true});

    function handleLocationError(error) {
      switch (error.code) {
        case 3:
        document.getElementById('result').innerHTML = 'ERR: timeout';
          // ...deal with timeout
          break;
        case 2:
        document.getElementById('result').innerHTML = 'ERR: device cannot get data';
          // ...device can't get data
          break;
        case 1:
        document.getElementById('result').innerHTML = 'ERR: user denied';
          // ...user said no
      }
    }

    function storePosition(position) {
      const lng = position.coords.longitude;
      const lat = position.coords.latitude;

      latLng=`${ lat },${ lng }`;
      // document.getElementById('result').innerHTML = latLng;
      // var type = 'restaurant';
      var url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?'+'location='+
      latLng+
      // '&'+'type='+type+
      '&rankby=distance&key=AIzaSyDfiZXyzHzKdHkjT_7kSStHat6OggMOkXY';
      var request = require('request');
      request.get({
          url: url,
          json: true,
          headers: {'User-Agent': 'request'}
          }, (err, res) => {
            if (err) {
              document.getElementById('result').innerHTML = 'inner err';
              console.log(err);
            } 
            else {
              // var results = JSON.stringify(res);
              var temp = '';
                for (var i = 0; i <3; i++) {
                  var lat2 = parseFloat(`${res.body.results[i].geometry.location.lat}`);
                  var lng2 = parseFloat(`${res.body.results[i].geometry.location.lng}`);
                  const earthRadius = 6371000; //meters
                  var dLat = (lat2-lat) * Math.PI / 180;
                  var dLng = (lng2-lng) * Math.PI / 180;
                  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                  Math.cos(lat* Math.PI / 180) * Math.cos(lat2* Math.PI / 180) *
                  Math.sin(dLng/2) * Math.sin(dLng/2);
                  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
                  var dist =  Math.round(2 *earthRadius * c);
                  var dir='';
                  if (dLng >0 && Math.abs(dLat/dLng)<0.3827)
                    dir = 'East';
                  else if(dLng <0 && Math.abs(dLat/dLng)<0.3827)
                    dir = 'West';
                  else if(dLat >0 && Math.abs(dLng/dLat)<0.3827)
                    dir = 'North';
                  else if(dLat <0 && Math.abs(dLng/dLat)<0.3827)
                    dir = 'South';
                  else if(dLat>0 && dLng>0)
                    dir = 'North East';
                  else if(dLat>0 && dLng<0)
                    dir = 'North West';
                  else if(dLat<0 && dLng>0)
                    dir = 'South East';
                  else
                    dir = 'South West';
                  if(res.body.results[i]!=null){
                  var name = `${res.body.results[i].name}`+": "+dist+' meters'+' at '+dir;
                  temp = temp+'   '+name+'.';
                  // this.tts.speak('Hello World');
                  document.getElementById('result').innerHTML = temp;

                  }
                  // else{
                  //   document.getElementById('result').innerHTML = 'none';
                  // }
                 }
                  var msg = new SpeechSynthesisUtterance(temp);
                  window.speechSynthesis.speak(msg);
                  // this.tts.speak({
                  //      text: msg,
                  //      locale: 'en-GB',
                  //      rate: 1.7
                  //  }).then(function () {
                  //      alert('success');
                  //  }, function (reason) {
                  //      alert(reason);
                  //  });
              
            }
    });
    }
  }

  mock_aheadOfMe(){

///////
//././
/////
////////////////
////////////// /
 // // // //   /       mobile version use this three lines!!!!!
// // //  //
// /  /   //

     // this.tts.speak({
     //        text: 'hello, world!',
     //        locale: 'en-GB',
     //        rate: 1.7
     //    }).then(function () {
     //        alert('success');
     //    }, function (reason) {
     //        alert(reason);
     //    });

    let aheadOfMeAudio =new Audio();
    aheadOfMeAudio.src = '../assets/audio/mock_aheadOfMe.mp3';
    aheadOfMeAudio.play();
  }

helpaudio(){
    let aheadOfMeAudio =new Audio();
    aheadOfMeAudio.src = '../assets/audio/mock_help.mp3';
    aheadOfMeAudio.play();
  }

recommend(){
  var places = [
    'bank',
    'hospital',
    'store',
    'restaurant',
    'park',
    'school'
];
var randomNumber = Math.floor(Math.random()*places.length);
var recommendation = places[randomNumber];

    var latLng;

    navigator.geolocation.getCurrentPosition(storePosition, handleLocationError, {timeout:30000, enableHighAccuracy:true});

    function handleLocationError(error) {
      switch (error.code) {
        case 3:
        document.getElementById('result').innerHTML = 'ERR: timeout';
          // ...deal with timeout
          break;
        case 2:
        document.getElementById('result').innerHTML = 'ERR: device cannot get data';
          // ...device can't get data
          break;
        case 1:
        document.getElementById('result').innerHTML = 'ERR: user denied';
          // ...user said no
      }
    }

    function storePosition(position) {
      const lng = position.coords.longitude;
      const lat = position.coords.latitude;

      latLng=`${ lat },${ lng }`;
      // document.getElementById('result').innerHTML = latLng;
      // var type = 'restaurant';
      var url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?'+'location='+
        latLng+'&'+'type='+recommendation+
        '&rankby=distance&key=AIzaSyDfiZXyzHzKdHkjT_7kSStHat6OggMOkXY';
      var request = require('request');
      request.get({
          url: url,
          json: true,
          headers: {'User-Agent': 'request'}
          }, (err, res) => {
            if (err) {
              document.getElementById('result').innerHTML = 'inner err';
              console.log(err);
            } 
            else {
              // var results = JSON.stringify(res);
              var temp = '';
                for (var i = 0; i <3; i++) {
                  var lat2 = parseFloat(`${res.body.results[i].geometry.location.lat}`);
                  var lng2 = parseFloat(`${res.body.results[i].geometry.location.lng}`);
                  const earthRadius = 6371000; //meters
                  var dLat = (lat2-lat) * Math.PI / 180;
                  var dLng = (lng2-lng) * Math.PI / 180;
                  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                  Math.cos(lat* Math.PI / 180) * Math.cos(lat2* Math.PI / 180) *
                  Math.sin(dLng/2) * Math.sin(dLng/2);
                  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
                  var dist =  Math.round(2 *earthRadius * c);
                  var dir='';
                  if (dLng >0 && Math.abs(dLat/dLng)<0.3827)
                    dir = 'East';
                  else if(dLng <0 && Math.abs(dLat/dLng)<0.3827)
                    dir = 'West';
                  else if(dLat >0 && Math.abs(dLng/dLat)<0.3827)
                    dir = 'North';
                  else if(dLat <0 && Math.abs(dLng/dLat)<0.3827)
                    dir = 'South';
                  else if(dLat>0 && dLng>0)
                    dir = 'North East';
                  else if(dLat>0 && dLng<0)
                    dir = 'North West';
                  else if(dLat<0 && dLng>0)
                    dir = 'South East';
                  else
                    dir = 'South West';
                  if(res.body.results[i]!=null){
                  var name = `${res.body.results[i].name}`+": "+dist+' meters'+' at '+dir;
                  temp = temp+'   '+name+'.';
                  // this.tts.speak('Hello World');
                  document.getElementById('result').innerHTML = 'recommendations: '+ temp;

                  }
                  // else{
                  //   document.getElementById('result').innerHTML = 'none';
                  // }
                 }
                  var msg = new SpeechSynthesisUtterance(temp);
                  window.speechSynthesis.speak(msg);
                  // this.tts.speak({
                  //      text: msg,
                  //      locale: 'en-GB',
                  //      rate: 1.7
                  //  }).then(function () {
                  //      alert('success');
                  //  }, function (reason) {
                  //      alert(reason);
                  //  });
              
            }
    });
    }

}

}
