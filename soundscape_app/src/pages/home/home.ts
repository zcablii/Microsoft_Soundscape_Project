import { Component } from '@angular/core';
import {NavController, Platform} from 'ionic-angular';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
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

constructor(public navCtrl: NavController, public platform: Platform, public tts: TextToSpeech,private speechRecognition: SpeechRecognition, private sqlite: SQLite,private sqliteObject: SQLiteObject) {

    HomePage.isRuning = false;
    HomePage.textResult = '';

    // this.sqlite.create({
    //   name: 'soundscape.db',
    //   location: 'default'
    // })
    //   .then((db: SQLiteObject) => {


    //     db.executeSql('CREATE TABLE recom (ID INTEGER PRIMARY KEY AUTOINCREMENT, query varchar(255), intent varchar(25), time date);', [])
    //       .then(() => console.log('Executed SQL'))
    //       .catch(e => console.log(e));


    //   })
    //   .catch(e => console.log(e));
      }
 
  public mock_nearbyMarkers(){
    var spk = "nearby markers: there's no nearby markers.";
    var msg = new SpeechSynthesisUtterance(spk);
    window.speechSynthesis.speak(msg);
  }
  public mock_aroundMe(){
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

public mock_aheadOfMe(){
  var latLng;
    navigator.geolocation.getCurrentPosition(storePosition, handleLocationError, {timeout:30000, enableHighAccuracy:true});

    function handleLocationError(error) {
      switch (error.code) {
        case 3:
        console.log('ERR: timeout');
          // ...deal with timeout
          break;
        case 2:
        console.log('ERR: device cannot get data');
          // ...device can't get data
          break;
        case 1:
        console.log('ERR: user denied');
          // ...user said no
      }
    }

    function storePosition(position) {
      const lng = position.coords.longitude;
      const lat = position.coords.latitude;

      latLng=`${ lat },${ lng }`;
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
                  if(res.body.results[i]!=null){
                  var name = `${res.body.results[i].name}`+": "+dist+' meters'+' ahead ';
                  temp = temp+'   '+name+'.';
                  // this.tts.speak('Hello World');

                  }
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

public helpaudio(){
    var spk = "please click voice assistant button and then say what you want to do. For example, you can say: what is around of me? Or where is nearby hospital? After you finish speaking, please click the stop button again. And then, you will hear the responds from the application.";
    var msg = new SpeechSynthesisUtterance(spk);
    window.speechSynthesis.speak(msg);
  }

public recommend(){
  var recommendation;
 var db =null;
 document.addEventListener('deviceready', function() {
    db = this.sqliteObject.openDatabase({
      name: 'my.db',
      location: 'default',
    });
  });

  db.executeSql('SELECT intents FROM recom GROUP BY intents HAVING time >date(timedate(), -7 day)+ORDER BY  COUNT(intents)  DESC',[], function(rs) {
    recommendation=rs.rows.item(0);
  }, function(error) {
    console.log('SELECT SQL statement ERROR: ' + error.message);
  });

    var latLng;

    navigator.geolocation.getCurrentPosition(storePosition, handleLocationError, {timeout:10000, enableHighAccuracy:true});

    function handleLocationError(error) {
      switch (error.code) {
        case 3:
        console.log('ERR: timeout');
          // ...deal with timeout
          break;
        case 2:
        console.log('ERR: device cannot get data');
          // ...device can't get data
          break;
        case 1:
        console.log('ERR: user denied');
          // ...user said no
      }
    }

    function storePosition(position) {
      var request = require('request');
      const lng = position.coords.longitude;
      const lat = position.coords.latitude;
      latLng=`${ lat },${ lng }`;
      var url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?'+'location='+
        latLng+'&'+'type='+recommendation+
        '&rankby=distance&key=AIzaSyDfiZXyzHzKdHkjT_7kSStHat6OggMOkXY';
        request.withCredentials = true;
        request.get({
            url: url,
            json: true,
            headers: {'User-Agent': 'request'}
            }, (err, res) => {
              if (err) {
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

                  }
                 }
                  // var msg = new SpeechSynthesisUtterance(temp);
                  // window.speechSynthesis.speak(msg);
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
 public getLuisIntent() {
   var db = null;
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
        console.log('ERR: timeout');
          // ...deal with timeout
          break;
        case 2:
        console.log('ERR: device cannot get data');
          // ...device can't get data
          break;
        case 1:
        console.log('ERR: user denied');
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

                  }
                 }

                  
                  var msg = new SpeechSynthesisUtterance(temp);
                  window.speechSynthesis.speak(msg);
                
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
            }

            var data = JSON.parse(body);
            if(`${data.query}`=='null' || HomePage.textResult.length<3){
              let noneAudio =new Audio();
              noneAudio.src = '../assets/audio/mock_none.mp3';
              noneAudio.play();
            }

            else{
                var resIntent = `${data.topScoringIntent.intent}`;              
                document.addEventListener('deviceready', function() {
                  db = this.sqliteObject.openDatabase({
                    name: 'my.db',
                    location: 'default',
                  });
                });
                db.transaction(function(tx) {
                  tx.executeSql('INSERT INTO recom VALUES (query,intent,time)', [HomePage.textResult, resIntent,'datetime()']);
                }, function(error) {
                  console.log('Transaction ERROR: ' + error.message);
                }, function() {
                  console.log('Populated database OK');
                });
                if(resIntent == 'MyLocation'){
                  this.mock_aroundMe();
                }
                else if(resIntent == 'AroundMe'){
                  this.mock_aroundMe();
                }
                else if(resIntent == 'NearbyMarkers'){                
                  var spk = "nearby markers: there's no nearby markers.";
                  var msg = new SpeechSynthesisUtterance(spk);
                  window.speechSynthesis.speak(msg);
                }
                else if(resIntent == 'AheadOfMe'){
                  this.mock_aheadOfMe();
                }
                else if(resIntent == 'Help'){
                  var spk = "please click voice assistant button and then say what you want to do. For example, you can say: what is around of me? Or where is nearby hospital? After you finish speaking, please click the stop button again. And then, you will hear the responds from the application.";
                  var msg = new SpeechSynthesisUtterance(spk);
                  window.speechSynthesis.speak(msg);
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
                          }

                          var data = JSON.parse(body);
                          if(`${data.query}`=='null'){
                            let noneAudio =new Audio();
                            noneAudio.src = '../assets/audio/mock_none.mp3';
                            noneAudio.play();
                          }

                          else{
                              var resIntent = `${data.topScoringIntent.intent}`;
                              if(resIntent == 'bank'){
                                queryPlace('bank');
                              }
                              else if(resIntent == 'hospital'){
                                queryPlace('hospital');
                              }
                              else if(resIntent == 'restaurant'){
                                queryPlace('restaurant');
                              }
                              else if(resIntent == 'shop'){
                                queryPlace('store');
                              }
                              else{
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
        document.getElementById('cortana').innerHTML = 'Cortana';
        this.speechRecognition.stopListening();
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
      
        HomePage.textResult = finalTranscript;//test
  
      } 
      else{
        if(!('webkitSpeechRecognition' in window)){
          console.log('Your browser is not supported. If google chrome, please upgrade!');
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
        document.getElementById('cortana').innerHTML = 'Cortana';
        speechRecognizer.stop();
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
         HomePage.textResult = finalTranscripts + interimTranscripts ;
      };
      speechRecognizer.onerror = function (event) {
      }; 
    }
}


  // mock_myLocation(){
  //   let myLocationAudio =new Audio();
  //   myLocationAudio.src = '../assets/audio/mock_myLocation.mp3';
  //   myLocationAudio.play();  }
}




