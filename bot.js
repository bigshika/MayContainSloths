var Botkit = require('botkit');
var emojireplace = require('./emojireplace.js');
var dogs = require('./dogs.js');
var pony = require('./pony.js');
var sloth = require('./sloth.js');
var cat = require('./cat.js');
var catFacts = require('./catfacts.js');
var tay = require('./tay.js');
var pugs = require('./pugs.js');
var helpers = require('./helpers.js');


var usersById = {};
var channelLookup = {};

var me = process.env.ADMIN_SLACKNAME;

var controller = Botkit.slackbot({
	debug: false,
});

var bot = controller.spawn({
    token: process.env.SLACK_TOKEN
}).startRTM(function(err, bot, payload) {
    payload.users.forEach(function (x) { return usersById[x.id] = x; });
    // Cache the available channels and groups. These should be treated as the same, but have different api calls, so caching the api calls too.
    var myChannels = payload.channels.filter(function (x) { return x.is_member; });
    myChannels.forEach(function (x) { return x.api = {
        info: bot.api.channels.info,
    }; });
    payload.groups.forEach(function (x) { return x.api = {
        info: bot.api.groups.info,
    }; });
    myChannels = myChannels.concat(payload.groups);
    for (var i = 0, len = myChannels.length; i < len; i++) {
    	channelLookup[myChannels[i].id] = myChannels[i];
	}
});

// Caching
catFacts.cacheCatFacts();
cat.nekoAtsume();
tay.getBae();
tay.getBee();
dogs.whoLetTheDogsOut();
pugs.puggerUp();

controller.hears(["^\\.help\\b","^\\.pokedex\\b"],["direct_message","direct_mention","mention", "ambient"],function(bot,message) {
  	bot.reply(message, helpers.makeResponseObject(helpers.helpText));
}); 

controller.hears(['^\\.dog\\b'],["direct_message","direct_mention", "mention", "ambient"], function(bot,message) {
	botResponse(message, ['suchwow'], 'awws', dogs.getDogBotObject());
});

controller.hears(['^\\.pony\\b'],["direct_message","direct_mention", "mention", "ambient"], function(bot,message) {
	botResponse(message, pony.getRandomPonyEmojis(), 'pony', pony.getPonyBotObject());
});

controller.hears(['^\\.sloth\\b'],["direct_message","direct_mention", "mention", "ambient"],function(bot,message) {
	botResponse(message, ['zzz'], 'awws', sloth.getSlothBotObject());
});

controller.hears(['^\\.cat\\b'],["direct_message","direct_mention", "mention", "ambient"],function(bot,message) {
	botResponse(message, ['ceilingcat'], 'awws', cat.getCatBotObject());
});

controller.hears(['^\\.pug\\b'],["direct_message","direct_mention", "mention", "ambient"],function(bot,message) {
	botResponse(message, ['pug'], 'awws', pugs.getPugObject());
});

controller.hears(['^\\.aww\\b'],["direct_message","direct_mention", "mention", "ambient"],function(bot,message) {
	var responseObj;
	var random = Math.floor(Math.random() * 5);
	switch (random) {
		case 0:
			responseObj = cat.getCatBotObject();
			break;
		case 1:
			responseObj = sloth.getSlothBotObject();
			break;
		case 2:
			responseObj = dogs.getDogBotObject();
			break;
		case 3:
			responseObj = pugs.getPugObject();
			break;				
	}
	botResponse(message, ['feet'], 'awws', responseObj);
});

controller.hears(['^\\.catfact\\b', '^\\.catfacts\\b',],["direct_message","direct_mention", "mention", "ambient"],function(bot,message) {
	botResponse(message, ['cat2'], 'awws', catFacts.getCatFactBotObject());
});

controller.hears(['^\\.dogfact\\b', '^\\.dogfacts\\b', '^\\Tyxt33358dggyf\\b'],["direct_message","direct_mention", "mention", "ambient"],function(bot,message) {
	botResponse(message, ['no'], 'awws', catFacts.getDogFactBotObject());
});

controller.hears(['^\\.tay\\b', '^\\.taytay\\b'],["direct_message","direct_mention", "mention", "ambient"],function(bot,message) {
	botResponse(message, ['microphone'], 'tay', tay.getTaytayBotObject());
});

controller.hears(['^\\.kanye\\b'],["direct_message","direct_mention", "mention", "ambient"],function(bot,message) {
	addReaction(message, 'microphone');
    if (helpers.isWhiteListed(getChannelName(message.channel), 'tay')) {
		bot.reply(message, tay.getTruncatedTaytayBotObject(), function() {
			bot.reply(message, tay.getYeezyBotObject());
		});
  	} else {
  		directReply(message, tay.getTruncatedTaytayBotObject(), function() {
  			directReply(message, tay.getYeezyBotObject());
  		});
	}
});

controller.hears(['\\hello\\b','\\hi\\b'],["direct_message","direct_mention","mention"],function(bot,message) {
	addReaction(message, 'thumbsup');	
  	bot.reply(message,'Hi!');
});

controller.on('reaction_added', function(bot, message) {
	if (helpers.isWhiteListed(getChannelName(message.item.channel), 'all') && (emojireplace.isPositiveEmoji(message.reaction) || emojireplace.isBlacklistEmoji(message.reaction))) {
		bot.api.reactions.list({user: message.user}, function(err, res) {
			console.log(message.reaction + ' in ' + getChannelName(message.item.channel) + ' ' + message.item.channel);
			var post = res.items.filter(function(element, index, array) {
    			return element.type === 'message' && element.message.ts === message.item.ts
    		});
    		if (post[0] === undefined) return;

    		var messageObject = post[0].message;
    		var isFromCatbot = messageObject.username === 'CatBot';
    		var isFromPugbot = messageObject.username === 'PugBot';

			if ((isFromCatbot || isFromPugbot) && messageObject.subtype === 'bot_message') {
				if (emojireplace.isPositiveEmoji(message.reaction) && isFromCatbot) {
					cat.fave(fixUrls(messageObject.text), message.user);
				} else if (message.reaction === helpers.blacklistEmoji && getUserName(message.user) === me) {
					bot.api.chat.delete(message.item);
					if (isFromCatbot) {
						cat.blacklist(fixUrls(messageObject.text));						
					} else if (isFromPugbot) {
						pugs.blacklist(fixUrls(messageObject.text));
					}
				}
			}
		});
	}
});

function botResponse(message, reactions, whitelist, conversationObject) {
	reactions.forEach(function(emoji) {
		addReaction(message, emoji);	
	});

    if (helpers.isWhiteListed(getChannelName(message.channel), whitelist)) {
	  	bot.reply(message, conversationObject);    	
	} else {
	  	directReply(message, conversationObject); 	
	}
}

function fixUrls(string) {
	return string.replace('<', '').replace('>', '');
}

function directReply(message, responseObj, callback) {
  	bot.api.im.open({'user': message.user}, function(err, response) {
  		responseObj.channel = response.channel.id;
  		bot.say(responseObj, function(err, response) {
  			if (typeof callback === 'function') {
  				callback();
  			}
  		});
  	});
}

function addReaction(message, emoji) {
	bot.api.reactions.add({
        timestamp: message.ts,
        channel: message.channel,
        name: emoji,
    });
}

function getUserName(userId) {
	return usersById[userId].name;	
}

function getUserLink(userId) {
	return '<@' + getUserName(userId) + '>';
}

function getChannelName(channelId) {
	if (typeof channelId === 'undefined' || channelId.startsWith('D')) {return ''}
	if (typeof channelLookup[channelId] === 'undefined') {return ''} // I shouldn't need this, need to fix by handling invites properly
	return channelLookup[channelId].name;
}