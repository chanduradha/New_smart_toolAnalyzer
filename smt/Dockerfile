# # Use an official Node.js image as the base image
# FROM node:16-alpine

# # Set the working directory in the container (same as 'pavi' folder)
# WORKDIR /new_finalSmart_tool/pavi

# # Copy package.json and package-lock.json to install dependencies
# COPY package*.json ./

# # Install the dependencies
# RUN npm install

# # Copy the rest of the application code to the container
# COPY . .

# # Expose the port your app will run on (React default is 3000)
# EXPOSE 3003

# Use an official Node.js image as the base image
FROM node:16-alpine

# Set the working directory inside the container
WORKDIR /smt

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Set the environment variable to specify the port React should use
ENV PORT 9678

# Expose the port that your app will run on (React will use this port)
EXPOSE $PORT

# Start the React application using 'npm start'
CMD ["npm", "start"]


#to run the docker container use below code in terminal
# docker run -p 9678:9678 -e PORT=9678 my-react-app
