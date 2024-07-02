FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Ensure the port number matches the one used by Azure App Service
EXPOSE 8080

# Command to run the application
CMD [ "npm", "start" ]
