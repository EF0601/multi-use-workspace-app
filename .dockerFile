FROM node:20

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Run the build process
RUN npm run make

# Default command
CMD [ "npm", "run", "make" ]
