var request = require('request');

var shibes = [];
var numberOfDoges = 50;

exports.manyDoge = () => {
	cacheShibes();
}

function cacheShibes() {
	request('http://shibe.online/api/shibes?count=' + numberOfDoges + '&urls=true&httpsUrls=true', function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	    var data = JSON.parse(body);
	    var dogesSoFar = shibes.length;
	    for (var i = 0; i < numberOfDoges; i++) {
	    	var url = data[i];
	    	if (shibes.indexOf(url) === - 1) {
	    		shibes[dogesSoFar] = url;
	    		dogesSoFar++;
	    	}
	    }
	    if (cacheShibes < 20) {
	    	cacheShibes();
	    }
		console.log(dogesSoFar + ' Shibes! Many doge such wow');
	  }
	});	
}

function getRandomDoge() {
	if (shibes.length === 0) { 
		return 'http://comicsandmemes.com/wp-content/uploads/2013/12/shebe-doge-pokemon.png';
	}
 	var index = Math.floor(shibes.length * Math.random());
 	return shibes[index];
}

exports.blacklist = (url) => {
	var index = shibes.indexOf(url);
	if (index > -1) {
	    var shibes = shibes.splice(index, 1);
	    console.log('Shibe number ' + index + ' removed');
	}
}

exports.getDogeObject = () => {
	return {
			'text': getRandomDoge(),
	  		'icon_emoji': ':suchwow:',
	  		'username': 'DogeBot',
	  		'unfurl_links': true
  	};
}