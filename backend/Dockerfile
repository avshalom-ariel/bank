
# Use an official Node.js runtime as a parent image
FROM node:20.18.1

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies inside the container
RUN npm install

# Copy the rest of the application code into the container
COPY . .

# Expose the port your application will run on (default Node.js port is 3000)
EXPOSE 3003

# Command to run the application
CMD ["npm", "start"]
