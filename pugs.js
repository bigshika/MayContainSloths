var request = require('request');
var badTumblr = require('./tumblrBlacklist.js');

var pugs = [];
var numberOfPugs = 50;

exports.puggerUp = () => {
	cachePugs();
}

function cachePugs() {
	request('http://pugme.herokuapp.com/bomb?count=' + numberOfPugs, function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	    var data = JSON.parse(body);
	    var pugsSoFar = pugs.length;
	    for (var i = 0; i < numberOfPugs; i++) {
	    	var url = data['pugs'][i];
	    	var server = Number(badTumblr.getTumblrNumberRegex().exec(url)[1]);
	    	if ((server === 0 || badTumblr.getBadTumblrs().indexOf(server) === -1) && pugs.indexOf(url) === - 1) {
	    		pugs[pugsSoFar] = url;
	    		pugsSoFar++;
	    	}
	    }

	    if (pugsSoFar < 20) {
	    	cachePugs();
	    }
		console.log('ERMAGERD ' + pugsSoFar + ' PUGS');
	  }
	});	
}

function getRandomPug() {
	if (pugs.length === 0) { 
		return 'https://twitter.com/CUTEST_ANlMALS/status/846170584253976576';
	}
 	var index = Math.floor(pugs.length * Math.random());
 	return pugs[index];
}

exports.blacklist = (url) => {
	var index = pugs.indexOf(url);
	if (index > -1) {
	    var pug = pugs.splice(index, 1);
	    console.log('Pug number ' + index + ' removed');
	}
}

exports.getPugObject = () => {
	return {
			'text': getRandomPug(),
	  		'icon_emoji': ':pug:',
	  		'username': 'PugBot',
	  		'unfurl_links': true
  	};
}