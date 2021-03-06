FROM node:boron

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/


# Bundle app source
COPY . /usr/src/app

# NPM installs and Run Test
RUN npm install
RUN npm install -g mocha
RUN npm install request --save
RUN npm test

EXPOSE 80
CMD [ "npm", "start" ]
