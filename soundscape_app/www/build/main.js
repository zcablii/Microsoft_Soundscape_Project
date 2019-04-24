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

/***/ 235:
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
webpackEmptyAsyncContext.id = 235;

/***/ }),

/***/ 279:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_text_to_speech__ = __webpack_require__(275);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_speech_recognition__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_sqlite__ = __webpack_require__(276);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





__webpack_require__(418).config();
var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, platform, tts, speechRecognition, sqlite) {
        this.navCtrl = navCtrl;
        this.platform = platform;
        this.tts = tts;
        this.speechRecognition = speechRecognition;
        this.sqlite = sqlite;
        HomePage_1.isRuning = false;
        HomePage_1.textResult = '';
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
    HomePage_1 = HomePage;
    HomePage.prototype.mock_nearbyMarkers = function () {
        var spk = "nearby markers: there's no nearby markers.";
        var msg = new SpeechSynthesisUtterance(spk);
        window.speechSynthesis.speak(msg);
    };
    HomePage.prototype.mock_aroundMe = function () {
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
            var request = __webpack_require__(73);
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
                    for (var i = 0; i < 3; i++) {
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
    };
    HomePage.prototype.mock_aheadOfMe = function () {
        var latLng;
        navigator.geolocation.getCurrentPosition(storePosition, handleLocationError, { timeout: 30000, enableHighAccuracy: true });
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
            }
        }
        function storePosition(position) {
            var lng = position.coords.longitude;
            var lat = position.coords.latitude;
            latLng = lat + "," + lng;
            var url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?' + 'location=' +
                latLng +
                // '&'+'type='+type+
                '&rankby=distance&key=AIzaSyDfiZXyzHzKdHkjT_7kSStHat6OggMOkXY';
            var request = __webpack_require__(73);
            request.get({
                url: url,
                json: true,
                headers: { 'User-Agent': 'request' }
            }, function (err, res) {
                if (err) {
                    console.log(err);
                }
                else {
                    // var results = JSON.stringify(res);
                    var temp = '';
                    for (var i = 0; i < 3; i++) {
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
                        if (res.body.results[i] != null) {
                            var name = "" + res.body.results[i].name + ": " + dist + ' meters' + ' ahead ';
                            temp = temp + '   ' + name + '.';
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
    };
    HomePage.prototype.helpaudio = function () {
        var spk = "please click voice assistant button and then say what you want to do. For example, you can say: what is around of me? Or where is nearby hospital? After you finish speaking, please click the stop button again. And then, you will hear the responds from the application.";
        var msg = new SpeechSynthesisUtterance(spk);
        window.speechSynthesis.speak(msg);
    };
    HomePage.prototype.recommend = function () {
        var recommendation;
        var db = null;
        document.addEventListener('deviceready', function () {
            db = window.sqlitePlugin.openDatabase({
                name: 'my.db',
                location: 'default',
            });
        });
        db.executeSql('SELECT intents FROM recom GROUP BY intents HAVING time >date(timedate(), -7 day)+ORDER BY  COUNT(intents)  DESC', [], function (rs) {
            recommendation = rs.rows.item(0);
        }, function (error) {
            console.log('SELECT SQL statement ERROR: ' + error.message);
        });
        var latLng;
        navigator.geolocation.getCurrentPosition(storePosition, handleLocationError, { timeout: 10000, enableHighAccuracy: true });
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
            }
        }
        function storePosition(position) {
            var request = __webpack_require__(73);
            var lng = position.coords.longitude;
            var lat = position.coords.latitude;
            latLng = lat + "," + lng;
            var url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?' + 'location=' +
                latLng + '&' + 'type=' + recommendation +
                '&rankby=distance&key=AIzaSyDfiZXyzHzKdHkjT_7kSStHat6OggMOkXY';
            request.withCredentials = true;
            request.get({
                url: url,
                json: true,
                headers: { 'User-Agent': 'request' }
            }, function (err, res) {
                if (err) {
                    console.log(err);
                }
                else {
                    var temp = '';
                    for (var i = 0; i < 3; i++) {
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
    };
    HomePage.prototype.getLuisIntent = function () {
        var db = null;
        var request = __webpack_require__(73);
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
            navigator.geolocation.getCurrentPosition(storePosition, handleLocationError, { timeout: 10000, enableHighAccuracy: true });
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
                }
            }
            function storePosition(position) {
                var lng = position.coords.longitude;
                var lat = position.coords.latitude;
                latLng = lat + "," + lng;
                var type = queryString;
                var url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?' + 'location=' +
                    latLng + '&' + 'type=' + type +
                    '&rankby=distance&key=AIzaSyDfiZXyzHzKdHkjT_7kSStHat6OggMOkXY';
                var request = __webpack_require__(73);
                request.get({
                    url: url,
                    json: true,
                    headers: { 'User-Agent': 'request' }
                }, function (err, res) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        var temp = '';
                        for (var i = 0; i < 3; i++) {
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
                            }
                        }
                        var msg = new SpeechSynthesisUtterance(temp);
                        window.speechSynthesis.speak(msg);
                    }
                });
            }
        }
        // HTTP Request
        request(luisRequest, function (err, response, body) {
            // HTTP Response
            if (err) {
                console.log(err);
            }
            var data = JSON.parse(body);
            if ("" + data.query == 'null' || HomePage_1.textResult.length < 3) {
                var noneAudio = new Audio();
                noneAudio.src = '../assets/audio/mock_none.mp3';
                noneAudio.play();
            }
            else {
                var resIntent = "" + data.topScoringIntent.intent;
                document.addEventListener('deviceready', function () {
                    db = window.sqlitePlugin.openDatabase({
                        name: 'my.db',
                        location: 'default',
                    });
                });
                db.transaction(function (tx) {
                    tx.executeSql('INSERT INTO recom VALUES (query,intent,time)', [HomePage_1.textResult, resIntent, 'datetime()']);
                }, function (error) {
                    console.log('Transaction ERROR: ' + error.message);
                }, function () {
                    console.log('Populated database OK');
                });
                if (resIntent == 'MyLocation') {
                    this.mock_aroundMe();
                }
                else if (resIntent == 'AroundMe') {
                    this.mock_aroundMe();
                }
                else if (resIntent == 'NearbyMarkers') {
                    var spk = "nearby markers: there's no nearby markers.";
                    var msg = new SpeechSynthesisUtterance(spk);
                    window.speechSynthesis.speak(msg);
                }
                else if (resIntent == 'AheadOfMe') {
                    this.mock_aheadOfMe();
                }
                else if (resIntent == 'Help') {
                    var spk = "please click voice assistant button and then say what you want to do. For example, you can say: what is around of me? Or where is nearby hospital? After you finish speaking, please click the stop button again. And then, you will hear the responds from the application.";
                    var msg = new SpeechSynthesisUtterance(spk);
                    window.speechSynthesis.speak(msg);
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
                        }
                        var data = JSON.parse(body);
                        if ("" + data.query == 'null') {
                            var noneAudio = new Audio();
                            noneAudio.src = '../assets/audio/mock_none.mp3';
                            noneAudio.play();
                        }
                        else {
                            var resIntent = "" + data.topScoringIntent.intent;
                            if (resIntent == 'bank') {
                                queryPlace('bank');
                            }
                            else if (resIntent == 'hospital') {
                                queryPlace('hospital');
                            }
                            else if (resIntent == 'restaurant') {
                                queryPlace('restaurant');
                            }
                            else if (resIntent == 'shop') {
                                queryPlace('store');
                            }
                            else {
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
        if (this.platform.is('cordova')) {
            var finalTranscript = '';
            // SpeechRecognition.isRecognitionAvailable()
            //   .then((available: boolean) => console.log(available))
            if (HomePage_1.isRuning) {
                document.getElementById('cortana').innerHTML = 'Stop';
            }
            else {
                document.getElementById('cortana').innerHTML = 'Cortana';
                this.speechRecognition.stopListening();
                this.getLuisIntent();
            }
            // this.speechRecognition.isRecognitionAvailable()
            //   .then((available: boolean) => document.getElementById('result').innerHTML = 'available');
            // this.speechRecognition.hasPermission()
            //   .then((hasPermission: boolean) =>document.getElementById('result').innerHTML = 'hasPermission');
            this.speechRecognition.startListening()
                .subscribe(function (matches) { return finalTranscript = matches.join(); }, function (onerror) { return console.log('error:', onerror); });
            HomePage_1.textResult = finalTranscript; //test
        }
        else {
            if (!('webkitSpeechRecognition' in window)) {
                console.log('Your browser is not supported. If google chrome, please upgrade!');
            }
            else {
                var webkitSpeechRecognition = window.webkitSpeechRecognition;
                speechRecognizer = new webkitSpeechRecognition();
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
                document.getElementById('cortana').innerHTML = 'Cortana';
                speechRecognizer.stop();
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
                HomePage_1.textResult = finalTranscripts + interimTranscripts;
            };
            speechRecognizer.onerror = function (event) {
            };
        }
    };
    HomePage = HomePage_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/Users/bird/Desktop/ionic_Project/dbtry/src/pages/home/home.html"*/'<ion-header >\n  <ion-navbar color="primary">\n    <ion-title>Soundscape Simulator</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n\n<!-- <button ion-button block large color="secondary"> -->\n<div class="spacer" data-componentid="spacer3" style="height: 50px;" (click)="helpaudio()"></div>\n\n<div class="row icon-row">\n<div class="col text-center">\n<button class="button4 ripple buttonc" (click)="helpaudio()">Instructions</button>\n</div>\n<div class="col text-center">\n<button class="button5 ripple buttonc" (click)= "recommend()">Recommendation</button>\n</div>\n</div>\n<div class="spacer" data-componentid="spacer3" style="height: 15px;" (click)="helpaudio()"></div>\n<div class="row icon-row">\n<div class="col text-center">\n  <button onclick id="menu-button10" class="buttonbasic button1 ripple resize fontsize1" (click)= "mock_myLocation()">My Location\n  <ion-icon name="md-locate" class="iconsize"></ion-icon>\n  </button>\n</div>\n<div class="col text-center">\n  <button id="menu-button13" class="buttonbasic button1 ripple resize fontsize2" (click)= "mock_nearbyMarkers()">Nearby Markers\n  <ion-icon name="ios-pin" class="iconsize"></ion-icon>\n  </button>\n  <div id="MarkersModal" class="modal">\n    </div>\n  </div>\n</div>\n<div class="row icon-row">\n<div class="col text-center">\n  <button id="menu-button9" class="buttonbasic button1 ripple resize fontsize1" (click)= "mock_aroundMe()">Around Me\n  <ion-icon name="md-move" class="iconsize"></ion-icon>\n  </button>\n</div>\n<div class="col text-center">\n  <button class="buttonbasic button1 ripple resize fontsize1" (click)= "mock_aheadOfMe()">Ahead Of Me\n  <ion-icon name="md-wifi" class="iconsize"></ion-icon>\n  </button>\n  <div id="AheadOfMeModal" class="modal">\n  </div>\n  </div>\n</div>\n  <div class="spacer" data-componentid="spacer3" style="height: 20px;"></div>\n  <footer>\n  <button  id="cortana" class="button3 ripple buttonc" (click) = "startConverting()">Voice Assistant</button>\n  </footer>\n\n\n  <!-- <div class="list card" id="menu-card21" data-componentid="card21">\n        <p style="margin-top:0px;color:#000000;">I\'m listenning...</p>\n      </div> -->\n\n\n  <!-- <ion-toolbar color="secondary" position="bottom">\n    <ion-row align-items-center>\n    <ion-col col-3 ><button ion-item color="secondary"><ion-icon name="ios-pin"></ion-icon></button></ion-col>\n    <ion-col col-3>Nearby Markers</ion-col>\n    <ion-col col-3>Around Me</ion-col>\n    <ion-col col-3>Ahead Of Me</ion-col>\n  </ion-row>\n  </ion-toolbar> -->\n  	<!-- <ion-icon name="home">Cortana</ion-icon></button> -->\n<!-- <ion-grid>\n  <ion-row>\n    <ion-col col-3>My Location</ion-col>\n    <ion-col col-3>Nearby Markers</ion-col>\n    <ion-col col-3>Around Me</ion-col>\n    <ion-col col-3>Ahead Of Me</ion-col>\n  </ion-row>\n</ion-grid> -->\n</ion-content>\n'/*ion-inline-end:"/Users/bird/Desktop/ionic_Project/dbtry/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Platform */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Platform */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__ionic_native_text_to_speech__["a" /* TextToSpeech */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__ionic_native_text_to_speech__["a" /* TextToSpeech */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__ionic_native_speech_recognition__["a" /* SpeechRecognition */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__ionic_native_speech_recognition__["a" /* SpeechRecognition */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_4__ionic_native_sqlite__["a" /* SQLite */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__ionic_native_sqlite__["a" /* SQLite */]) === "function" && _e || Object])
    ], HomePage);
    return HomePage;
    var HomePage_1, _a, _b, _c, _d, _e;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 344:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(345);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(367);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 367:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_speech_recognition__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_text_to_speech__ = __webpack_require__(275);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_sqlite__ = __webpack_require__(276);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_component__ = __webpack_require__(417);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_home_home__ = __webpack_require__(279);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_status_bar__ = __webpack_require__(277);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_splash_screen__ = __webpack_require__(278);
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
                __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_7__pages_home_home__["a" /* HomePage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["c" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */], {}, {
                    links: []
                }),
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["a" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_7__pages_home_home__["a" /* HomePage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_8__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_9__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_text_to_speech__["a" /* TextToSpeech */],
                __WEBPACK_IMPORTED_MODULE_2__ionic_native_speech_recognition__["a" /* SpeechRecognition */],
                __WEBPACK_IMPORTED_MODULE_5__ionic_native_sqlite__["a" /* SQLite */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["b" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 417:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(277);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(278);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(279);
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
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/bird/Desktop/ionic_Project/dbtry/src/app/app.html"*/'<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>'/*ion-inline-end:"/Users/bird/Desktop/ionic_Project/dbtry/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 432:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 434:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 466:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 467:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 536:
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

},[344]);
//# sourceMappingURL=main.js.map