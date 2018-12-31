import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'

})
export class HomePage {
static isRuning: any;
static textResult: any;

  constructor(public navCtrl: NavController) {
    HomePage.isRuning = false;
    HomePage.textResult = '';
  }
  
  startConverting () {
  HomePage.isRuning=!HomePage.isRuning;

    if('webkitSpeechRecognition' in window){
      var speechRecognizer = new webkitSpeechRecognition();
      speechRecognizer.continuous = true;
      speechRecognizer.interimResults = true;
      speechRecognizer.lang = 'en-IN';
      speechRecognizer.start();

      if(HomePage.isRuning){
        document.getElementById('cortana').innerHTML = 'Stop';
      }
      else{
        document.getElementById('cortana').innerHTML = 'Cortana';
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
         document.getElementById('result').innerHTML = finalTranscripts + '<span style="color:#999">' + interimTranscripts + '</span>';
      };
      speechRecognizer.onerror = function (event) {
      };
    }else{
       document.getElementById('result').innerHTML = 'Your browser is not supported. If google chrome, please upgrade!';
    }
  }

  getConvertedString(){
    HomePage.textResult = document.getElementById("result").textContent;
    document.getElementById('result').innerHTML ='adasd '+HomePage.textResult+"dfsdf";
  }

  mock_myLocation(){
    var bleep =new Audio();
    bleep.src = '../assets/audio/mock_myLocation.mp3';
    bleep.play();
  }

  mock_nearbyMarkers(){
    var bleep =new Audio();
    bleep.src = '../assets/audio/mock_nearbyMarkers.mp3';
    bleep.play();
  }

  mock_aroundMe(){
    var bleep =new Audio();
    bleep.src = '../assets/audio/mock_aroundMe.mp3';
    bleep.play();
  }

  mock_aheadOfMe(){
    var bleep =new Audio();
    bleep.src = '../assets/audio/mock_aheadOfMe.mp3';
    bleep.play();
  }
}
