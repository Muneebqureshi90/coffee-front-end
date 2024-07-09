# Use Node.js LTS as base image
FROM node:14.17.6-alpine

# Set working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json /app

# Install dependencies
RUN npm install

# Copy the rest of the application files to the container
COPY . /app

# Expose port 3000
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
