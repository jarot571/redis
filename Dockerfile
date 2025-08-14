# Use Node 10-alpine to match your production
FROM node:10.19.0-alpine

# Set working directory
WORKDIR /app

# Install build tools for native dependencies
RUN apk add --no-cache build-base python

# Copy package.json first to leverage caching
COPY package*.json ./

# Install only production dependencies
RUN npm install --production

# Copy the rest of the app
COPY . .

# Expose port the app runs on
EXPOSE 3000

# Start the app
CMD ["node", "app.js"]
