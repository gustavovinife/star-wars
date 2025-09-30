# Use Node.js version specified in .nvmrc
FROM node:22.14.0-alpine

# Set working directory
WORKDIR /app

# Copy package files first for better caching
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci --only=production=false

# Copy the rest of the application
COPY . .

# Expose the port that Vite dev server runs on
EXPOSE 5173

# Start the development server
# Using --host 0.0.0.0 to allow external connections
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]
