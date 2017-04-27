var http = require('http');
var badTumblr = require('./tumblrBlacklist.js');
var parseString = require('xml2js').parseString;

var cats = [];
var catLookup = {};
var numberOfCats = 50;

exports.nekoAtsume = () => {
	cacheKitties();
}

function cacheKitties() {
	http.get('http://thecatapi.com/api/images/get?format=xml&results_per_page=' + numberOfCats + '&' + 'api_key=' + process.env.CAT_TOKEN, (res) => {
	  	res.setEncoding('utf8');
	  	var data = '';
	  	res.on("data", function(chunk) {
	  		data = data + chunk;
	  	});
	  	res.on('end', function() {
	    	parseString(data, function (err, result) {
	    		var catsThusFar = 0;
	    		for (var i = 0; i < numberOfCats; i++) {
	    			var cat = {
	    				url: result.response.data[0].images[0].image[i].url[0],
	    				id: result.response.data[0].images[0].image[i].id[0]
	    			};
	    			var server = Number(badTumblr.getTumblrNumberRegex().exec(cat.url)[1]);
			    	if (server === 0 || badTumblr.getBadTumblrs().indexOf(server) === -1) {
		    			cats[catsThusFar] = cat;
						catLookup[cat.url] = cat;
						catsThusFar++
					}
	    		}
			    if (catsThusFar < 1) {
			    	cacheKitties();
			    }
	    		console.log('There are ' + catsThusFar + ' cats hooray!');
			});
        });
	});	
}

function getRandomCat() {
	if (cats.length === 0) { 
		return 'https://twitter.com/punchesbears/status/750217551200694272';
	}
 	var index = Math.floor(cats.length * Math.random());
 	return cats[index].url;
}

exports.getCatBotObject = () => {
	var cat = getRandomCat();
	return {
			'text': cat,
	  		'icon_emoji': ':grumpy_cat:',
	  		'username': 'CatBot',
  	};		 
}

exports.MakeCatbotTalk = (text) => {
	var cat = getRandomCat();
	return {
			'text': text,
	  		'icon_emoji': ':grumpy_cat:',
	  		'username': 'CatBot',
  	};		 
}

exports.blacklist = (url) => {
	blacklistCat(url);
}

function blacklistCat(url) {
	var index = cats.indexOf(catLookup[url]);
	if (index > -1) {
	    var cat = cats.splice(index, 1);
	    console.log('Cat number ' + index + ' removed');
	    http.get('http://thecatapi.com/api/images/report?' + 'api_key=' + process.env.CatApiToken + '&image_id=' + cat[0].id);
	}
}

exports.fave = (url, user) => {
	var cat = catLookup[url];
	if (cat === undefined) return;
    console.log('Cat id ' + cat.id + ' faved');
    http.get('http://thecatapi.com/api/images/favourite?' + 'api_key=' + process.env.CatApiToken + '&image_id=' + cat.id + '&sub_id=' + user);
}