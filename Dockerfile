# ---------- Stage 1: Build ----------
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and lock file first (better caching)
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy rest of the source code
COPY . .

# Build the project (e.g., React or Next.js)
RUN npm run build

# Expose port 80
EXPOSE 5173

# Start Nginx server
CMD ["npm", "start"]
