# Use a lightweight Node.js image with Node.js version 20 on Alpine Linux
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Update package list and install required packages
RUN apk update && \
    apk add --no-cache \
    g++ \
    python3 \
    py3-pip \
    openjdk11-jre \
    openjdk11 \
    bash \
    git

# Install npm dependencies
COPY package.json .
RUN npm install

# Copy the application code into the container
COPY . .

# Expose port 8080 for the backend server
EXPOSE 8080

# Set the default command to start the application
CMD ["node", "index.js"]
