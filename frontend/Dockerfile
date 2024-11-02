# Use a specific node version
FROM node:20

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if available) and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Expose port 5173 (el puerto por defecto para Vite)
EXPOSE 5173

# Define the command to run the app
CMD ["npm", "run", "dev"]
