exports.getBadTumblrs = () => { 
	return [ 29, 30, 27, 26, 65, 28, 67 ];
}

exports.getTumblrNumberRegex = () => {
	return /http:\/\/(\d\d).media.tumblr.com\//;
}

// Test servers here: https://www.reddit.com/domain/67.media.tumblr.com/