var Twitter = require('twitter-node-client').Twitter;

var tays = [];
var beys = [];

var config = {
        "consumerKey": process.env.TWITTER_KEY,
        "consumerSecret": process.env.TWITTER_SECRET
};

function getRandomTaytay() {
	if (typeof tays === 'undefined') {
		getBae();
		return '>>>The API\'s just gonna shake, shake, shake, shake, shake\nShake it off, Shake it off'
	}
	var index = Math.floor(tays.length * Math.random());
 	return tays[index];
}

function getRandomBey() {
    if (typeof beys === 'undefined') {
        getBee();
        return '>>>If you like it then you shoulda hit the API limit'
    }
    var index = Math.floor(beys.length * Math.random());
    return 'https://twitter.com/beyonce/status/' + beys[index];
}

function getTruncatedTaytay() {
    var tay = getRandomTaytay();
    return getRandomTaytay().substring(0, tay.length * 0.5 * Math.random()) + '-';    
}

exports.getBae = () => {
	var twitter = new Twitter(config);
    twitter.getUserTimeline({
    	screen_name: 'taylorswift13', 
    	count: '200', 
    	trim_user: 'true', 
    	include_rts: 'false', 
    	exclude_replies: 'true'
    }, null, function (data) {
    	data = JSON.parse(data);
    	data.forEach(function (x) {
    		if (x.entities.hasOwnProperty('media') && x.possibly_sensitive === false) {
    			tays.push(x.entities.media[0].expanded_url); 
    		}
    		return;
    	});
    });
}

exports.getBee = () => {
    var twitter = new Twitter(config);
    twitter.getUserTimeline({
        screen_name: 'beyonce', 
        count: '200', 
        trim_user: 'true', 
        include_rts: 'false', 
        exclude_replies: 'true'
    }, null, function (data) {
        data = JSON.parse(data);
        data.forEach(function (x) {
            if (x.possibly_sensitive === false) {
                beys.push(x.id_str); 
            }
            return;
        });
    });
}

exports.getTaytayBotObject = () => {
	return {
			'text': getRandomTaytay(),
	  		'icon_emoji': ':taytay:',
	  		'username': 'TayBot',
  	};		 
}

exports.getTruncatedTaytayBotObject = () => {
    return {
            'text': getTruncatedTaytay(),
            'icon_emoji': ':taytay:',
            'username': 'TayBot',
    };       
}

exports.getYeezyBotObject = () => {
    return {
        'text': 'Yo Imma let you finish but Beyonce had one of the best tweets of all time: ' +  getRandomBey(),
        'icon_emoji': ':kanye:',
        'username': 'KayneBot',        
    };
}