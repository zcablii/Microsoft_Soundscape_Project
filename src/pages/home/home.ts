import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
// import { Geolocation } from '@ionic-native/geolocation';
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




// document.getElementById('result').innerHTML = latLng;

  // var options = {
  //   enableHighAccuracy: true,
  //   timeout: 5000,
  //   maximumAge: 0
  // };
  // function success(pos) {
  //   var crd = pos.coords;

  //   console.log('Your current position is:');
  //   console.log(`Latitude : ${crd.latitude}`);
  //   console.log(`Longitude: ${crd.longitude}`);
  //   console.log(`More or less ${crd.accuracy} meters.`);
  //   // document.getElementById('result').innerHTML =`Latitude : ${crd.latitude}`;
  // }
  // function error(err) {
  //   console.warn(`ERROR(${err.code}): ${err.message}`);
  // }
  // navigator.geolocation.getCurrentPosition(success, error, options);


//   var type = 'restaurant';
//   var url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?'+'location='+
//   '51.5257593'+','+'-0.1333523'+'&'+'type='+type+
//   '&rankby=distance&key=AIzaSyDfiZXyzHzKdHkjT_7kSStHat6OggMOkXY';
//   var request = require('request');
//   request.get({
//       url: url,
//       json: true,
//       headers: {'User-Agent': 'request'}
//       }, (err, res) => {
//         if (err) {
//           console.log(err);
//         }
//         else {
//           // var results = JSON.stringify(res);
//           var temp = '';
//           for (var i = 0; i <5; i++) {

//             var name = `${res.body.results[i].name}`+''+`${res.body.results[i].geometry.location.lat}`+''+`${res.body.results[i].geometry.location.lng}`;
//             temp = temp+'   '+name;
//             // document.getElementById('result').innerHTML = temp;
//            }

//         }
// });



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
          document.getElementById('result').innerHTML = 'ERR: User denied';
            // ...user said no
        }
      }

      function storePosition(position) {
        const lng = position.coords.longitude;
        const lat = position.coords.latitude;

        latLng=`${ lat },${ lng }`;
        // document.getElementById('result').innerHTML = latLng;
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
                // var results = JSON.stringify(res);
                var temp = '';
                for (var i = 0; i <5; i++) {
                  if(res.body.results[i]!=null){
                  var name = `${res.body.results[i].name}`+''+`${res.body.results[i].geometry.location.lat}`+''+`${res.body.results[i].geometry.location.lng}`;
                  temp = temp+'   '+name;
                  document.getElementById('result').innerHTML = temp;

                  }
                  // else{
                  //   document.getElementById('result').innerHTML = 'none';
                  // }
                 }
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
            if(`${data.query}`=='null'){
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
                                queryPlace('restaurant');
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

    if('webkitSpeechRecognition' in window){
      const {webkitSpeechRecognition} : IWindow = <IWindow>window;
      const speechRecognizer = new webkitSpeechRecognition();
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



  isPlayed: boolean = false;
  mock_myLocation(){
    this.isPlayed = true;
    let myLocationAudio =new Audio();
    myLocationAudio.src = '../assets/audio/mock_myLocation.mp3';
    myLocationAudio.play();
    var modal = document.getElementById('LocationModal');
    modal.style.display = "block";
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
  }

  mock_nearbyMarkers(){
    let nearbyMarkersAudio =new Audio();
    nearbyMarkersAudio.src = '../assets/audio/mock_nearbyMarkers.mp3';
    nearbyMarkersAudio.play();
    var modal = document.getElementById('MarkersModal');
    modal.style.display = "block";
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
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
              document.getElementById('result').innerHTML = 'err';
              console.log(err);
            }
            else {
              // var results = JSON.stringify(res);
              var temp = '';
              for (var i = 0; i <5; i++) {
                if(res.body.results[i]!=null){
                var name = `${res.body.results[i].name}`+''+`${res.body.results[i].geometry.location.lat}`+''+`${res.body.results[i].geometry.location.lng}`;
                temp = temp+'   '+name;
                document.getElementById('result').innerHTML = temp;

                }
                // else{
                //   document.getElementById('result').innerHTML = 'none';
                // }
               }
               // document.getElementById('result').innerHTML = url;

            }
    });
    }
    var modal = document.getElementById('AroundMeModal');
    modal.style.display = "block";
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
  }

  mock_aheadOfMe(){
    let aheadOfMeAudio =new Audio();
    aheadOfMeAudio.src = '../assets/audio/mock_aheadOfMe.mp3';
    aheadOfMeAudio.play();
    var modal = document.getElementById('AheadOfMeModal');
    modal.style.display = "block";
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
  }

  helpaudio(){
    let aheadOfMeAudio =new Audio();
    aheadOfMeAudio.src = '../assets/audio/mock_help.mp3';
    aheadOfMeAudio.play();
  }
  bleep:Audio;
  mute(){
    if  (this.isPlayed == true){
      stop();
    }
  }

}
