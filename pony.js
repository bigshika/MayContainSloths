var ponyMoji = [
	'applejack',
	'applejackheart',
	'applejackrun',
	'blaze',
	'bigmac',
	'cadance',
	'cloudkicker',	
	'drwhooves',
	'fluttershy',
	'fluttershyfly',
	'iepony',
	'pinkiepie',
	'ponycop',
	'princesscadance',
	'princesscelestia',
	'princessluna',
	'rainbow-cat',
	'rainbowdash',
	'rainbowdash-fly',
	'rainbowdash-swag',
	'rainbowdash2',
	'rainbowdash3',
	'rainbowdash4',
	'rainbowdash5',
	'rainbowdash6',
	'rarity',
	'recursion',
	'sassaflash',
	'spitfire',
	'sunnydaze',
	'sunnydazeskates',
	'swanky_hank',
	'twilight-sparkle',
	'shining_armour',
	'clap_ponies',
	'clap_applejack',
	'clap_bigmacintosh',
	'clap_binky',
	'clap_blaze',
	'clap_cloudkicker',
	'clap_drwhooves',
	'clap_fluttershy',
	'clap_pinkiepie',
	'clap_princesscadance',
	'clap_rainbowdash',
	'clap_rarity',
	'clap_sassaflash',
	'clap_shiningarmour',
	'clap_spitfire',
	'clap_swankyhank',
	'clap_sunnydaze',
	'clap_twilightsparkle',
	'clap_twilightarmour'
];

var ponies = 162;

function getRandomPonyEmoji() {
	return ponyMoji[Math.floor(ponyMoji.length * Math.random())];
}

exports.getRandomPonyEmojis = () => {
	var ponies = [];
	var count = Math.floor(10 * Math.random());
	for (var i = 0; i < count; i++) {
		ponies.push(getRandomPonyEmoji());
	}
	return ponies;
}

function getRandomPony() {
 	var index = Math.floor(ponies * Math.random()) + 1;
 	return 'http://ponyfac.es/' + index + '/full';
}

exports.getPonyBotObject = () => {
	return {
		'icon_emoji': ':unicorn_face:',
		'username': 'PonyBot',
		'text': getRandomPony()
	};
}