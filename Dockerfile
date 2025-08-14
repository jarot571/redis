# Use a Node.js 20-alpine base image for a small, efficient container.
FROM node:20-alpine

# Set the working directory inside the container.
WORKDIR /app

# Copy only package files first to leverage Docker layer caching.
COPY package*.json ./

# Install project dependencies.
RUN npm ci --omit=dev

# Copy the rest of the project files.
COPY . .

# Expose the port the app listens on.
EXPOSE 3000

# Default command to run the application.
CMD ["node", "app.js"]
