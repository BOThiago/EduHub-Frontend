# syntax=docker/dockerfile:1

# Use Node.js 20 as the base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy application code
COPY . .

# Expose port for Vite
EXPOSE 5173

# Command to run Vite server
CMD ["npm", "run", "dev"]
