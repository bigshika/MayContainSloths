FROM node:boron

# create app directory 
RUN mkdir -p /usr/src/app 
WORKDIR /usr/src/app 

#install dependencies
COPY package.json /usr/src/app/  
RUN npm install 

#install code
COPY . /usr/src/app/ 

ENV NODE_ENV=development SLACK_TOKEN=tokenhere TWITTER_KEY=twitterkeyhere TWITTER_SECRET=twittersecrethere CAT_TOKEN=cattokenhere

EXPOSE 8080

#set startup commands
CMD ["npm", "start"]