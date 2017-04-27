
var awwsWhiteList = ['watch-sana-level-up'];
var ponyWhiteList = ['watch-sana-level-up'];
var tayWhiteList = ['watch-sana-level-up'];

var helpText = 	"The following todo list commands are available:" +
	'\n`.todo {task}` - Adds {task} to your plot mission list\n`.list` - Replies with a link to your list or will initialise a new list\n`.side {task}` - Adds a side quest' + 
	'\n`.bee {url}` - Adds a pollination to your plot missions list\n`.read {url}` - Adds a reading list item to your side quests list\n`.til {learning}` - Adds a learning to the TIL list' +
	'\n`.catch {emoji}` - Catches a task Pokémon' +
	'\nThe following commands will post a channel response if used in #awws, otherwise the response will be in a DM:' +
	'\n`.dog` - Replies with an adorable dog\n`.cat` - Links a super fluffy kitty\n`.sloth` - Gives you a cute picture of a sloth\n`.pony` - Replies with an awesome pony picture' + 
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
		  	'icon_emoji': ':pokeball:',
		  	'username': 'PokéBot',
		  	'channel': channel,
		  	'unfurl_links': true
	};
}