# Use the official Node.js image as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Copy the entire app directory to the working directory
COPY . .

# Install dependencies
RUN npm ci

ENV NODE_ENV production

# Creates a "dist" folder with the production build
RUN npm run build

# Running `npm ci` removes the existing node_modules directory.
# Passing in --only=production ensures that only the production dependencies are installed.
# This ensures that the node_modules directory is as optimized as possible.
RUN npm ci --omit=dev && npm cache clean --force

# Switch to root user to access secret file
# USER root
# Switch back to non-root user
USER node

# Expose the port that the Nest.js app is running on
EXPOSE 3000

# Start the Nest.js app
CMD ["npm", "run", "start:prod"]
