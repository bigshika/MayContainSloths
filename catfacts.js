var request = require('request');

var catFacts = [];
var dogFacts = [
	'Command not recognised. You have a <year> subscription to Cat Facts and will receive fun <hourly> updates!',
	"INCORRECT. Your favourite animal is the Cat. You will continue to receive Cat Facts every <hour>. <reply 'Tyxt33358dggyf' to cancel>",
	'Thanks for messaging Cat Facts! Remember, every time you message, you will receive an instant Cat Fact.',
];

function getRandomDogFact() {
	if (Math.floor(Math.random() * 2) % 2 === 0) {
		return 'Command not recognised. ' + getRandomCatFact();
	}
	var index = Math.floor(dogFacts.length * Math.random());
 	return dogFacts[index];
}

function getRandomCatFact() {
	if (typeof catFacts === 'undefined') {
		return 'Thank you for signing up for Cat Facts. You will now receive fun daily facts about CATS! =^.^=';
	}
 	var index = Math.floor(catFacts.length * Math.random());
 	return catFacts[index];
}

exports.cacheCatFacts = () => {
	request('https://catfact.ninja/facts?limit=50', function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	    var data = JSON.parse(body);
	    catFacts = data.map(function(x) {
			return x.fact;
		});
		console.log('Thank you for signing up for Cat Facts. You will now receive fun daily facts about CATS!');
	  }
	});
}

exports.getCatFactBotObject = () => {
	return {
			'text': getRandomCatFact(),
	  		'icon_emoji': ':grumpy_cat:',
	  		'username': 'CatBot',
  	};		 
}

exports.getDogFactBotObject = () => {
	return {
			'text': getRandomDogFact(),
	  		'icon_emoji': ':grumpy_cat:',
	  		'username': 'CatBot',
  	};		 
}