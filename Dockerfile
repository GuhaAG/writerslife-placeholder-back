FROM alpine:3.4

# Update & install required packages
RUN apk add --update nodejs bash git

# Install app dependencies
COPY package.json /www/package.json
RUN cd /www; npm install

# Copy app source
COPY . /www

# Set work directory to /www
WORKDIR /www

# set your port
ENV PORT 8081

# expose the port to outside world
EXPOSE  8081

# start command as per package.json
CMD ["npm", "start"]
