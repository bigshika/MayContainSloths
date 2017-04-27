var sloths = [
	'http://giphy.com/gifs/sloth-NcSksWOl9OHyU',
	'http://giphy.com/gifs/sloth-time-small-FjwNXz2pLmYow',
	'http://media.mnn.com/assets/images/2015/02/sloth.jpg',
	'https://i.ytimg.com/vi/0Mz_LhuSNAw/maxresdefault.jpg',
	'http://67.media.tumblr.com/4ee2f6019871c8270126da2868ab8fff/tumblr_nynv7as6U01qjgyvoo1_400.gif',
	'http://weknowyourdreamz.com/images/sloth/sloth-01.jpg',
	'https://twitter.com/Strange_Animals/status/731918360091463680',
	'https://twitter.com/meganjwhelan/status/760349550519332865',
	'https://twitter.com/fatgirlphd/status/845012618452652038'
];

function getRandomSloth() {
 	var index = Math.floor(sloths.length * Math.random());
 	return sloths[index];
}

exports.getSlothBotObject = () => {
	return {
			'text': getRandomSloth(),
	  		'icon_emoji': ':sloth:',
	  		'username': 'SlothBot',
  	};
}