# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application source code to the container
COPY . .

# Expose the port the app will run on
EXPOSE 3000

# Set environment variables (optional: provide defaults, they can be overridden)
ENV PORT=3000
ENV MONGO_URI=mongodb://localhost:27017/crud
ENV SECRET_ACCESS_TOKEN=your_secret_key

# Start the application
CMD ["npm", "start"]
