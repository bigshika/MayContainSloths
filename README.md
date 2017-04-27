# MayContainSloths
Does what it says on the tin. Post cats, dogs, sloths, Taylor Swift, catfacts, pugs etc. to Slack.

### To run the bot

Get a Bot token from Slack:
http://my.slack.com/services/new/bot

cd to the MayContainSloths directory

Run your bot from the command line:
```
npm start
```

### To run the bot in a Docker container

Get a Bot token from Slack:
http://my.slack.com/services/new/bot

cd to the MayContainSloths directory

Run your bot from the command line:
```
docker build -t <namegoeshere>/<botnamegoeshere> .
docker run -p 49160:8080 -d <namegoeshere>/<botnamegoeshere>
```