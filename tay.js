var Twitter = require('twitter-node-client').Twitter;

var tays = [];
var beys = [];
var kanyes = [
  "Jay is Kweli's favorite rapper, 50 is Eminem's favorite rapper, and I'm my favorite rapper.",
  "I'm like a vessel, and God has chosen me to be the voice and the connector.",
  "My music isn't just music -- it's medicine.",
  "Don't ask me what I think the best song of last year was, because my opinion is the same as most of America's. It was 'Gold Digger.'",
  "\"Everything I'm not made me everything I am.\" In my humble opinion, that's a prophetic statement. Gandhi would have said something like that.",
  "Come on now! How could you be me and want to be someone else?",
  "When I think of competition it's like I try to create against the past. I think about Michelangelo and Picasso. You know, the pyramids.",
  "I am so credible and so influential and so relevant that I will change things.",
  "I'm the No. 1 living and breathing rock star.",
  "When someone comes up and says something like, 'I am a god,' everybody says 'Who does he think he is?' I just told you who I thought I was. A god. I just told you. That's who I think I am.",
  "For me to say I wasn't a genius, I would just be lying to you and to myself.",
  "I feel like a little bit, like, I'm the Braveheart of creativity.",
  "I am Warhol! I am the number one most impactful artist of our generation. I am Shakespeare in the flesh. Walt Disney, Nike, Google.",
  "Visiting my mind is like visiting the Hermes factory.",
  "I'm doing pretty good as far as geniuses go ... I'm like a machine. I'm a robot.",
  "I'm going down as a legend, whether or not you like me or not. I am the new Jim Morrison. I am the new Kurt Cobain.",
  "The Bible had 20, 30, 40, 50 characters in it. You don't think that I would be one of the characters of today's modern Bible?",
  "My greatest pain in life is that I will never be able to see myself perform live.",
  "You can't look at a glass half full or empty if it's overflowing.",
  "I have, like, nuclear power, like a superhero, like Cyclops when he puts his glasses on.",
  "Yeah. I'm rich and I'm famous, but I try not to be extra with it.",
  "A lot of people were wondering what I was going to do if I didn't win anything. I guess we'll never know.",
  "I'm a creative genius and there's no other way to word it.",
  "You love hip hop, you love my art... I am your favorite artist but you watch me barely breathe and still play my album in your house ...",
  "I know I can make the world a better place... I have done the impossible ... I retook the throne of rap... I beat the fashion game...",
  "All you dudes in San Fran play rap music in your homes but never help the real artists... you’d rather open up one school in Africa like you really helped the country... if you want to help... help me...",
  "We're living the future so the present is our past."
];

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

function getRandomKanye() {
	var index = Math.floor(kanyes.length * Math.random());
 	return kanyes[index];    
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

exports.getNormalYeezyBotObject = () => {
    return {
        'text': getRandomKanye(),
        'icon_emoji': ':kanye:',
        'username': 'KayneBot',        
    };
}

exports.getInterruptingKanye = () => {
    return {
        'text':'Yo Imma let you finish but Beyonce had one of the best tweets of all time: ' +  getRandomBey(),
        'icon_emoji': ':kanye:',
        'username': 'KayneBot',        
    };
}