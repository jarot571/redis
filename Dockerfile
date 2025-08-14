# Use Node 10-alpine to match your production environment
FROM node:10.19.0-alpine

# Set working directory
WORKDIR /app

# Install build tools in case some dependencies need compilation
RUN apk add --no-cache build-base python

# Copy package files first (to leverage caching)
COPY package*.json ./

# Install only production dependencies
RUN npm install --production

# Copy the rest of the app
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["node", "app.js"]
