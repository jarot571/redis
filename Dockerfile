# Use a Node.js 20-alpine base image for a small, efficient container.
FROM node:14.19.0-alpine

# Set the working directory inside the container.
WORKDIR /app

# Copy the package.json and package-lock.json to install dependencies.
COPY package*.json ./

# Install project dependencies.
RUN npm install

# Copy the entire project into the container.
COPY . .

# Expose the port the app listens on.
EXPOSE 3000

# Command to run the application.
CMD [ "node", "app.js" ]
