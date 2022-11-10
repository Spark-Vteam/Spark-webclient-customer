# Pull official base image
# FROM node:13.12.0-alpine
FROM node:16.17.0-bullseye-slim

# Set working directory
WORKDIR /webclient-customer

# Add `/app/node_modules/.bin` to $PATH
ENV PATH /webclient-customer/node_modules/.bin:$PATH

# Install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent

# Add app
COPY . ./

# Expose port
EXPOSE 3000

# Start app
CMD ["npm", "start"]