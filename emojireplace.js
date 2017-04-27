var emoji = [
	":turtle:", ":bug:", ":monkey:", ":hatched_chick:", ":mouse:", ":snake:", ":hamster:", ":cat:", ":dog:", ":rabbit:", ":wolf:", ":frog:", ":tiger:", ":koala:", 
	":bear:", ":pig:", ":cow:", ":boar:", ":horse:", ":sheep:", ":elephant:", ":panda_face:", ":penguin:", ":bird:", ":ant:", ":beetle:", ":snail:", ":octopus:", 
	":tropical_fish:", ":whale:", ":dolphin:", ":water_buffalo:", ":goat:", ":dog2:", ":dragon_face:", ":blowfish:", ":crocodile:", ":dromedary_camel:", ":leopard:", 
	":poodle:", ":octocat:", ":unicorn_face:"
 ]
var customEmoji = [
	":pikachu:", ":bulbasaur:", ":charmander:", ":squirtle:", ":snorlax:", ":fox:", ":badger:", ":turkey:", ":alien:", ":unicorn:", ":angry_unicorn:", ":bigreddog:", 
	":chewie:", ":deer:", ":dino:", ":doge:", ":dontdeletemematt:", ":duck:", ":grumpy_cat:", ":meerkat:", ":moth:", ":nyan:", ":ostrich:", ":owl:", ":portal_cube:", 
	":realparrot:", ":shark:", ":spitfire:"
];

var plantEmoji = [
	":cherry_blossom:", ":tulip:", ":four_leaf_clover:", ":rose:", ":sunflower:", ":hibiscus:", ":maple_leaf:", ":leaves:", ":fallen_leaf:", ":herb:", ":mushroom:",
	":cactus:", ":palm_tree:", ":evergreen_tree:", ":deciduous_tree:", ":seedling:", ":blossom:", ":ear_of_rice:", ":bamboo:", ":christmas_tree:"
];

var lootTable = [
	":gem:", ":beer:", ":bacon:", ":alembic:", ":battle_axe:", ":money_with_wings:", ":sparkles:", ":star:", ":star2:", ":bouquet:", ":fireworks:", ":gift:", ":bell:", 
	":crystal_ball:", ":mortar_board:", ":school_satchel:", ":key:", ":moneybag:", ":ring:", ":black_joker:", ":book:", ":trumpet:", ":saxophone:", ":high_heel:", 
	":ribbon:", ":crown:", ":tophat:", ":briefcase:", ":sake:", ":cocktail:", ":tropical_drink:", ":wine_glass:", ":pizza:", ":hamburger:", ":poultry_leg:", ":ramen:", 
	":dango:", ":doughnut:", ":custard:", ":icecream:", ":ice_cream:", ":shaved_ice:", ":cake:", ":cookie:", ":chocolate_bar:", ":candy:", ":lollipop:", ":honey_pot:", 
	":apple:", ":cherries:", ":peach:", ":strawberry:", ":watermelon:", ":grapes:", ":japanese_castle:", ":stars:", ":european_castle:", ":carousel_horse:", ":fountain:", 
	":rainbow:"
];

var debugList = [
	":eggplant:", ":peach:", ":hibiscus:"
];

var positiveReactions = [
	'+1', 'heart', 'heart_eyes_cat', 'smiley_cat', 'joy', 'joy_cat', 'lol', 'heart_eyes' 
];

exports.lootEmoji = () => getRandomEmoji(lootTable);
exports.todoEmoji = () => getRandomEmoji(emoji.concat(customEmoji));
exports.pollinationEmoji = () => getRandomEmoji(plantEmoji);

function getRandomEmoji(emojiList) {
 	return emojiList[Math.floor((emojiList.length - 1) * Math.random())];
}

exports.isPositiveEmoji = (reaction) => {
	return positiveReactions.indexOf(reaction) > 0
}

exports.isBlacklistEmoji = (reaction) => {
	return 	reaction === 'no_good::skin-tone-2';

}