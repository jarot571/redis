# Use a Node.js 20-alpine base image for a small, efficient container.
FROM node:10.19.0-alpine

# Set working directory
WORKDIR /app

# Copy package files first to leverage caching
COPY package*.json ./

# Install dependencies
RUN npm ci --omit=dev

# Copy the rest of the app
COPY . .

# Expose port
EXPOSE 3000

# Start the app
CMD ["node", "app.js"]
