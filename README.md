# MayContainSloths
Does what it says on the tin. Post cats, dogs, sloths, Taylor Swift, catfacts, pugs etc. to Slack.

### To run the bot

cd to the MayContainSloths directory

Run your bot from the command line:
```
SLACK_TOKEN=tokenhere TWITTER_KEY=twitterkeyhere TWITTER_SECRET=twittersecrethere CAT_TOKEN=cattokenhere ADMIN_SLACKNAME=admin.mcadminface npm start
```

### To run the bot in a Docker container

cd to the MayContainSloths directory

Run your bot from the command line:
```
docker build -t <namegoeshere>/<botnamegoeshere> .
docker run -p 49160:8080 -d <namegoeshere>/<botnamegoeshere>
```

### Config

You can set all tokens in the Dockerfile, where it says:
```
ENV NODE_ENV=development SLACK_TOKEN=tokenhere TWITTER_KEY=twitterkeyhere TWITTER_SECRET=twittersecrethere CAT_TOKEN=cattokenhere ADMIN_SLACKNAME=taylor.swift
```
Slack token can be obtained from http://my.slack.com/services/new/bot
Twitter key and secret can be obtained by creating a new app at https://apps.twitter.com/
Cat API key can be requested from http://thecatapi.com/

Admin user can be your slack handle - it will let that user remove cats and pugs with the :no_good::skin-tone-2: emoji reaction.
