var Twitter = require('twitter-node-client').Twitter;

var config = {
        "consumerKey": process.env.TWITTER_KEY,
        "consumerSecret": process.env.TWITTER_SECRET
};

var dogs = [];

exports.whoLetTheDogsOut = () => {
	var twitter = new Twitter(config);
    twitter.getUserTimeline({
    	screen_name: 'dog_rates', 
    	count: '200', 
    	trim_user: 'true', 
    	include_rts: 'false', 
    	exclude_replies: 'true'
    }, null, function (data) {
    	data = JSON.parse(data);
    	data.forEach(function (x) {
    		if (x.entities.hasOwnProperty('media') && x.possibly_sensitive === false && x.retweet_count > 1000) {
    			dogs.push(x.entities.media[0].expanded_url); 
    		}
    		return;
    	});
    });
}
	
function getRandomDog() {
 	var index = Math.floor(dogs.length * Math.random());
 	return dogs[index];
}

exports.getDogBotObject = () => {
	return {
			'text': getRandomDog(),
	  		'icon_emoji': ':suchwow:',
	  		'username': 'DogBot',
	  		'unfurl_links': true	  		
  	};
}