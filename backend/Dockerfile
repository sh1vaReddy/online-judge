# Use the official Node.js base image as the foundation
FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json for installation
COPY package*.json ./

# Install dependencies
RUN npm install 

# Copy the rest of the application code to the container
COPY . .

# Expose the port your app runs on (typically 3000)
EXPOSE 3000

# Define the command to run the application
CMD ["npm", "start"]
