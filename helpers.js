
var awwsWhiteList = ['aww'];
var ponyWhiteList = ['aww'];
var tayWhiteList = ['aww'];

var helpText = 	"The following commands are available:" +
	'\n`.dog` - Replies with an adorable dog\n`.cat` - Links a super fluffy kitty\n`.sloth` - Gives you a cute picture of a sloth\n`.pony` - Replies with an awesome pony picture' + 
	'\n`.tay` - Updates you on the status of multi-Grammy award winning artist Taylor Swift' + '\n`.kanye` - Inspires you with a quote from the greatest rapper of all time' + 
	'\n`.pug` - Aww look at its squashed up little face' + '\n`.doge` - Such wow many picture' + 
	'\n`.aww` - Sends you a picture of a random fuzzy creature\n`.catfact` - Gives you fun daily facts about your favourite animal\n`.dogfact` - Incorrect, your favourite animal is the cat';

module.exports = {
	isWhiteListed: function(channel, listName) {
		switch(listName) {
			case 'awws':
				return isWhiteListed(channel, awwsWhiteList);
			case 'pony':
				return isWhiteListed(channel, ponyWhiteList);
			case 'tay':
				return isWhiteListed(channel, tayWhiteList);
			default:
				return isWhiteListed(channel, awwsWhiteList.concat(tayWhiteList, ponyWhiteList));
		}
	},
	makeResponseObject: makeResponseObject,
	helpText: helpText
}

function isWhiteListed(channel, whiteList) {
	return whiteList.indexOf(channel) >= 0;
}

function removeCommand(string) {
	return string.replace(/^\.\w+\b\s*/, '');
}

function makeResponseObject(text, channel) {
	return {
		  	'text': text,
		  	'icon_emoji': ':heart_eyes_cat:',
		  	'username': 'AwwBot',
		  	'channel': channel,
		  	'unfurl_links': true
	};
}