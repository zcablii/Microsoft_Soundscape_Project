webpackJsonp([0],{

/***/ 192:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 192;

/***/ }),

/***/ 233:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 233;

/***/ }),

/***/ 276:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(111);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

// import { TextToSpeech } from '@ionic-native/text-to-speech';

// import { Geolocation } from '@ionic-native/geolocation';
__webpack_require__(416).config();
var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, platform) {
        this.navCtrl = navCtrl;
        this.platform = platform;
        HomePage_1.isRuning = false;
        HomePage_1.textResult = '';
    }
    HomePage_1 = HomePage;
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
    HomePage.prototype.getLuisIntent = function () {
        var request = __webpack_require__(157);
        var querystring = __webpack_require__(60);
        // endpoint URL
        var endpoint = 'https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/';
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
            "verbose": true,
            "q": HomePage_1.textResult,
            "subscription-key": endpointKey
        };
        // append query string to endpoint URL
        var luisRequest = endpoint + luisAppId +
            '?' + querystring.stringify(queryParams);
        function queryPlace(queryString) {
            var latLng;
            navigator.geolocation.getCurrentPosition(storePosition, handleLocationError, { timeout: 30000, enableHighAccuracy: true });
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
                }
            }
            function storePosition(position) {
                var lng = position.coords.longitude;
                var lat = position.coords.latitude;
                latLng = lat + "," + lng;
                // document.getElementById('result').innerHTML = latLng;
                var type = queryString;
                var url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?' + 'location=' +
                    latLng + '&' + 'type=' + type +
                    '&rankby=distance&key=AIzaSyDfiZXyzHzKdHkjT_7kSStHat6OggMOkXY';
                var request = __webpack_require__(157);
                request.get({
                    url: url,
                    json: true,
                    headers: { 'User-Agent': 'request' }
                }, function (err, res) {
                    if (err) {
                        document.getElementById('result').innerHTML = 'inner err';
                        console.log(err);
                    }
                    else {
                        // var results = JSON.stringify(res);
                        var temp = '';
                        for (var i = 0; i < 5; i++) {
                            var lat2 = parseFloat("" + res.body.results[i].geometry.location.lat);
                            var lng2 = parseFloat("" + res.body.results[i].geometry.location.lng);
                            var earthRadius = 6371000; //meters
                            var dLat = (lat2 - lat) * Math.PI / 180;
                            var dLng = (lng2 - lng) * Math.PI / 180;
                            var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                                Math.cos(lat * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                                    Math.sin(dLng / 2) * Math.sin(dLng / 2);
                            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                            var dist = Math.round(2 * earthRadius * c);
                            var dir = '';
                            if (dLng > 0 && Math.abs(dLat / dLng) < 0.3827)
                                dir = 'East';
                            else if (dLng < 0 && Math.abs(dLat / dLng) < 0.3827)
                                dir = 'West';
                            else if (dLat > 0 && Math.abs(dLng / dLat) < 0.3827)
                                dir = 'North';
                            else if (dLat < 0 && Math.abs(dLng / dLat) < 0.3827)
                                dir = 'South';
                            else if (dLat > 0 && dLng > 0)
                                dir = 'North East';
                            else if (dLat > 0 && dLng < 0)
                                dir = 'North West';
                            else if (dLat < 0 && dLng > 0)
                                dir = 'South East';
                            else
                                dir = 'South West';
                            if (res.body.results[i] != null) {
                                var name = "" + res.body.results[i].name + ": " + dist + ' meters' + ' at ' + dir;
                                temp = temp + '   ' + name + '.';
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
        request(luisRequest, function (err, response, body) {
            // HTTP Response
            if (err) {
                console.log(err);
                document.getElementById('result').innerHTML = 'error!';
            }
            var data = JSON.parse(body);
            if ("" + data.query == 'null') {
                var noneAudio = new Audio();
                noneAudio.src = '../assets/audio/mock_none.mp3';
                noneAudio.play();
            }
            else {
                var resIntent = "" + data.topScoringIntent.intent;
                // document.getElementById('result').innerHTML = ` Query: ${data.query}`+resIntent;
                document.getElementById('result').innerHTML = resIntent;
                if (resIntent == 'MyLocation') {
                    var myLocationAudio = new Audio();
                    myLocationAudio.src = '../assets/audio/mock_myLocation.mp3';
                    myLocationAudio.play();
                }
                else if (resIntent == 'AroundMe') {
                    var aroundMeAudio = new Audio();
                    aroundMeAudio.src = '../assets/audio/mock_aroundMe.mp3';
                    aroundMeAudio.play();
                }
                else if (resIntent == 'NearbyMarkers') {
                    var nearbyMarkersAudio = new Audio();
                    nearbyMarkersAudio.src = '../assets/audio/mock_nearbyMarkers.mp3';
                    nearbyMarkersAudio.play();
                }
                else if (resIntent == 'AheadOfMe') {
                    var aheadOfMeAudio = new Audio();
                    aheadOfMeAudio.src = '../assets/audio/mock_aheadOfMe.mp3';
                    aheadOfMeAudio.play();
                }
                else if (resIntent == 'Help') {
                    var helpAudio = new Audio();
                    helpAudio.src = '../assets/audio/mock_help.mp3';
                    helpAudio.play();
                }
                else if (resIntent == 'direction') {
                    var querystringNearby = __webpack_require__(60);
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
                        "verbose": true,
                        "q": " Query: " + data.query,
                        "subscription-key": endpointKey
                    };
                    // append query string to endpoint URL
                    var luisRequest = endpoint + placeAppId +
                        '?' + querystringNearby.stringify(placeQueryParams);
                    // HTTP Request
                    request(luisRequest, function (err, response, body) {
                        // HTTP Response
                        if (err) {
                            console.log(err);
                            document.getElementById('result').innerHTML = 'error!';
                        }
                        var data = JSON.parse(body);
                        if ("" + data.query == 'null') {
                            var noneAudio = new Audio();
                            noneAudio.src = '../assets/audio/mock_none.mp3';
                            noneAudio.play();
                        }
                        else {
                            var resIntent = "" + data.topScoringIntent.intent;
                            // document.getElementById('result').innerHTML = ` Query: ${data.query}`+resIntent;
                            // document.getElementById('result').innerHTML = resIntent;
                            if (resIntent == 'bank') {
                                queryPlace('bank');
                                document.getElementById('result').innerHTML = 'bank';
                            }
                            else if (resIntent == 'hospital') {
                                queryPlace('hospital');
                                document.getElementById('result').innerHTML = 'hospital';
                            }
                            else if (resIntent == 'restaurant') {
                                queryPlace('restaurant');
                                document.getElementById('result').innerHTML = 'restaurant';
                            }
                            else if (resIntent == 'shop') {
                                queryPlace('restaurant');
                                document.getElementById('result').innerHTML = 'shop';
                            }
                            else {
                                document.getElementById('result').innerHTML = 'place none';
                            }
                        }
                    });
                }
                else {
                    var noneAudio = new Audio();
                    noneAudio.src = '../assets/audio/mock_none.mp3';
                    noneAudio.play();
                }
            }
        });
    };
    HomePage.prototype.startConverting = function () {
        HomePage_1.isRuning = !HomePage_1.isRuning;
        var speechRecognizer;
        var webkitSpeechRecognition = window.webkitSpeechRecognition;
        if (this.platform.is('cordova')) {
            speechRecognizer = new webkitSpeechRecognition.SpeechRecognition();
        }
        else {
            if (!('webkitSpeechRecognition' in window)) {
                document.getElementById('result').innerHTML = 'Your browser is not supported. If google chrome, please upgrade!';
            }
            else {
                speechRecognizer = new webkitSpeechRecognition();
            }
        }
        // var speechRecognizer = new SpeechRecognition(); // To Device
        speechRecognizer.continuous = true;
        speechRecognizer.interimResults = true;
        speechRecognizer.lang = 'en-IN';
        speechRecognizer.start();
        if (HomePage_1.isRuning) {
            document.getElementById('cortana').innerHTML = 'Stop';
        }
        else {
            HomePage_1.textResult = document.getElementById('result').innerHTML;
            document.getElementById('cortana').innerHTML = 'Cortana';
            speechRecognizer.stop();
            // document.getElementById('result').innerHTML = HomePage.textResult;//test
            this.getLuisIntent();
        }
        var finalTranscripts = '';
        speechRecognizer.onresult = function (event) {
            var interimTranscripts = '';
            for (var i = event.resultIndex; i < event.results.length; i++) {
                if (!HomePage_1.isRuning) {
                    break;
                }
                var transcript = event.results[i][0].transcript;
                transcript.replace("\n", "<br>");
                if (event.results[i].isFinal) {
                    finalTranscripts += transcript;
                }
                else {
                    interimTranscripts += transcript;
                }
            }
            document.getElementById('result').innerHTML = finalTranscripts + interimTranscripts;
        };
        speechRecognizer.onerror = function (event) {
        };
    };
    HomePage.prototype.mock_myLocation = function () {
        var myLocationAudio = new Audio();
        myLocationAudio.src = '../assets/audio/mock_myLocation.mp3';
        myLocationAudio.play();
        var modal = document.getElementById('LocationModal');
        modal.style.display = "block";
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        };
    };
    HomePage.prototype.mock_nearbyMarkers = function () {
        var nearbyMarkersAudio = new Audio();
        nearbyMarkersAudio.src = '../assets/audio/mock_nearbyMarkers.mp3';
        nearbyMarkersAudio.play();
        var modal = document.getElementById('MarkersModal');
        modal.style.display = "block";
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        };
    };
    HomePage.prototype.mock_aroundMe = function () {
        var modal = document.getElementById('AheadOfMeModal');
        modal.style.display = "block";
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        };
        var latLng;
        navigator.geolocation.getCurrentPosition(storePosition, handleLocationError, { timeout: 30000, enableHighAccuracy: true });
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
            }
        }
        function storePosition(position) {
            var lng = position.coords.longitude;
            var lat = position.coords.latitude;
            latLng = lat + "," + lng;
            // document.getElementById('result').innerHTML = latLng;
            // var type = 'restaurant';
            var url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?' + 'location=' +
                latLng +
                // '&'+'type='+type+
                '&rankby=distance&key=AIzaSyDfiZXyzHzKdHkjT_7kSStHat6OggMOkXY';
            var request = __webpack_require__(157);
            request.get({
                url: url,
                json: true,
                headers: { 'User-Agent': 'request' }
            }, function (err, res) {
                if (err) {
                    document.getElementById('result').innerHTML = 'err';
                    console.log(err);
                }
                else {
                    // var results = JSON.stringify(res);
                    var temp = '';
                    for (var i = 0; i < 5; i++) {
                        var lat2 = parseFloat("" + res.body.results[i].geometry.location.lat);
                        var lng2 = parseFloat("" + res.body.results[i].geometry.location.lng);
                        var earthRadius = 6371000; //meters
                        var dLat = (lat2 - lat) * Math.PI / 180;
                        var dLng = (lng2 - lng) * Math.PI / 180;
                        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                            Math.cos(lat * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                                Math.sin(dLng / 2) * Math.sin(dLng / 2);
                        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                        var dist = Math.round(2 * earthRadius * c);
                        var dir = '';
                        if (dLng > 0 && Math.abs(dLat / dLng) < 0.3827)
                            dir = 'East';
                        else if (dLng < 0 && Math.abs(dLat / dLng) < 0.3827)
                            dir = 'West';
                        else if (dLat > 0 && Math.abs(dLng / dLat) < 0.3827)
                            dir = 'North';
                        else if (dLat < 0 && Math.abs(dLng / dLat) < 0.3827)
                            dir = 'South';
                        else if (dLat > 0 && dLng > 0)
                            dir = 'North East';
                        else if (dLat > 0 && dLng < 0)
                            dir = 'North West';
                        else if (dLat < 0 && dLng > 0)
                            dir = 'South East';
                        else
                            dir = 'South West';
                        if (res.body.results[i] != null) {
                            var name = "" + res.body.results[i].name + ": " + dist + ' meters' + ' at ' + dir;
                            temp = temp + '   ' + name + '.';
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
    };
    HomePage.prototype.mock_aheadOfMe = function () {
        var aheadOfMeAudio = new Audio();
        aheadOfMeAudio.src = '../assets/audio/mock_aheadOfMe.mp3';
        aheadOfMeAudio.play();
        var modal = document.getElementById('AheadOfMeModal');
        modal.style.display = "block";
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        };
    };
    HomePage = HomePage_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/Users/bird/Desktop/ionic_Project/try/src/pages/home/home.html"*/'<ion-header>\n  <ion-navbar color="primary">\n  \n    <div menuToggle  item-right>\n      <button ion-button (click)="mute()" ><ion-icon name="md-volume-off"></ion-icon></button>\n    </div>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n\n\n<!-- <button ion-button block large color="secondary"> -->\n<button  class="button3 ripple buttonc">Set a beacon</button>\n<div class="spacer" data-componentid="spacer3" style="height: 15px;"></div>\n<div class="row icon-row">\n<div class="col text-center">\n  <button id="menu-button10" class="buttonbasic button1 ripple resize" (click)= "mock_myLocation()">\n  <ion-icon name="md-locate" class="iconsize"></ion-icon>\n  </button>\n  <div id="LocationModal" class="modal">\n    <div class="modal-content">\n      <p>My Location</p>\n      </div>\n  </div>\n</div>\n\n<div class="col text-center">\n  <button id="menu-button13" class="buttonbasic button1 ripple resize" (click)= "mock_nearbyMarkers()">\n  <ion-icon name="ios-pin" class="iconsize"></ion-icon>\n  </button>\n  <div id="MarkersModal" class="modal">\n    <div class="modal-content">\n      <p>Nearby Markers</p>\n      </div>\n    </div>\n  </div>\n</div>\n<div class="row icon-row">\n<div class="col text-center">\n  <button  id="cortana" class="buttonbasic button1 buttonc ripple resize" (click) = "startConverting()">Cortana</button>\n  </div>\n  </div>\n<div class="row icon-row">\n<div class="col text-center">\n  <button id="menu-button9" class="buttonbasic button1 ripple resize" (click)= "mock_aroundMe()">\n  <ion-icon name="md-move" class="iconsize"></ion-icon>\n  </button>\n  <div id="AroundMeModal" class="modal">\n    <div class="modal-content">\n      <p>Around Me</p>\n      </div>\n    </div>\n  </div>\n<div class="col text-center">\n  <button class="buttonbasic button1 ripple resize" (click)= "mock_aheadOfMe()">\n  <ion-icon name="md-wifi" class="iconsize"></ion-icon>\n  </button>\n  <div id="AheadOfMeModal" class="modal">\n    <div class="modal-content">\n      <p>Ahead Of Me</p>\n      </div>\n    </div>\n  </div>\n  </div>\n  <div class="spacer" data-componentid="spacer3" style="height: 20px;"></div>\n  <footer>\n   <button class="button3 ripple buttonc">History</button>\n  </footer>\n  <ion-card>\n  <div class="list card" id="result" data-componentid="card21">\n        <!--<p id = "result" style="margin-top:0px;color:#000000;">I\'m listenning...</p> -->\n      </div>\n  </ion-card>\n\n  <!-- <div class="list card" id="menu-card21" data-componentid="card21">\n        <p style="margin-top:0px;color:#000000;">I\'m listenning...</p>\n      </div> -->\n\n\n  <!-- <ion-toolbar color="secondary" position="bottom">\n    <ion-row align-items-center>\n    <ion-col col-3 ><button ion-item color="secondary"><ion-icon name="ios-pin"></ion-icon></button></ion-col>\n    <ion-col col-3>Nearby Markers</ion-col>\n    <ion-col col-3>Around Me</ion-col>\n    <ion-col col-3>Ahead Of Me</ion-col>\n  </ion-row>\n  </ion-toolbar> -->\n    <!-- <ion-icon name="home">Cortana</ion-icon></button> -->\n<!-- <ion-grid>\n  <ion-row>\n    <ion-col col-3>My Location</ion-col>\n    <ion-col col-3>Nearby Markers</ion-col>\n    <ion-col col-3>Around Me</ion-col>\n    <ion-col col-3>Ahead Of Me</ion-col>\n  </ion-row>\n</ion-grid> -->\n</ion-content>\n'/*ion-inline-end:"/Users/bird/Desktop/ionic_Project/try/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Platform */]])
    ], HomePage);
    return HomePage;
    var HomePage_1;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 341:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(342);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(364);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 364:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_text_to_speech__ = __webpack_require__(407);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__(415);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_home_home__ = __webpack_require__(276);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_status_bar__ = __webpack_require__(274);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_splash_screen__ = __webpack_require__(275);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






// import { TabsPage } from '../pages/tabs/tabs';


var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */], {}, {
                    links: []
                }),
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_text_to_speech__["a" /* TextToSpeech */],
                __WEBPACK_IMPORTED_MODULE_6__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_7__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 415:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(274);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(275);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(276);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





// import { TabsPage } from '../pages/tabs/tabs';
var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        this.initializeApp();
        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Manage Markers', component: __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */] },
            { title: 'Manage Callouts', component: __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */] },
            { title: 'Help & Tutorials', component: __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */] },
            { title: 'Setting', component: __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */] },
            { title: 'Send Feedback', component: __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */] }
        ];
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
    };
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/bird/Desktop/ionic_Project/try/src/app/app.html"*/'<ion-menu [content]="content">\n  <ion-header>\n    <ion-toolbar color="primary">\n      <button ion-button menuToggle ><ion-icon name="ios-arrow-back"></ion-icon></button>\n    </ion-toolbar>\n  </ion-header>\n\n  <ion-content >\n    <ion-list color="primary">\n      <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">\n        {{p.title}}\n      </button>\n    </ion-list>\n  </ion-content>\n\n</ion-menu>\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>'/*ion-inline-end:"/Users/bird/Desktop/ionic_Project/try/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 430:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 432:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 464:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 465:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 534:
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

},[341]);
//# sourceMappingURL=main.js.map