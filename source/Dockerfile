
FROM node:22-alpine3.21

# Set working directory
WORKDIR /app

# Install dependencies for better development experience
RUN apk add --no-cache git

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

# Change ownership of the app directory
RUN chown -R nodejs:nodejs /app
USER nodejs

# Expose the port your app runs on
EXPOSE 3000

# Command for development with hot reload
CMD ["npm", "run", "dev"]
