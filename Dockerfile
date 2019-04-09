FROM node:slim

# Create app directory
RUN mkdir -p /usr/src/project4011

WORKDIR /usr/src/project4011

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . /usr/src/project4011

# Port number of your VM in which docker is running
EXPOSE 3000

CMD [ "npm", "start" ]