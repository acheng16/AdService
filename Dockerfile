FROM node:boron

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install
RUN npm install -g mocha
RUN npm install request --save

# Bundle app source
COPY . /usr/src/app

EXPOSE 80
CMD [ "npm", "start" ]
