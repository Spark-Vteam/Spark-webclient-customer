[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/Spark-Vteam/Spark-webclient-customer/badges/quality-score.png?b=main)](https://scrutinizer-ci.com/g/Spark-Vteam/Spark-webclient-customer/?branch=main) [![Build Status](https://scrutinizer-ci.com/g/Spark-Vteam/Spark-webclient-customer/badges/build.png?b=main)](https://scrutinizer-ci.com/g/Spark-Vteam/Spark-webclient-customer/build-status/main)

# Spark webclient

Welcome to the Spark webclient! This is a sub module of the Spark project. It contains code for the customer web client. Follow instructions below to start up the client only. To start up all backend and frontend applications for Spark, follow the the README instructions in [the main Spark repo](https://github.com/Spark-Vteam/Spark-Project) instead.

## Getting Started

To get started, clone the repository and install the dependencies:

- `git clone https://github.com/Spark-Vteam/Spark-webclient-customer.git`  
- `cd Spark-webclient-customer`  
- `npm install` 


Next, start the development server by running:

`npm start`

This will start the development server at http://localhost:3000.

## Deployment

To build the app for production, run:

`npm run build`

This will create a production-ready build in the build directory. You can serve the static files in the build directory using any static file server.

## Technologies Used
- React
- JavaScript
- HTML
- CSS

## Docker

To start your React app in a Docker container, you will first need to build the Docker image using the Dockerfile in the root directory of your project. You can do this by running the following command in the root directory of your project:

`docker build -t webclient-customer:1.0 .`

This will build a Docker image with the tag webclient-customer:1.0.

Next, you can use the docker-compose.yml file to start the Docker container for your app. Run the following command to start the container:

`docker-compose up`

This will start the Docker container and bind it to port 3000 on your host machine. You can then access the app at http://localhost:3000.

If you want to run the container in the background, you can use the -d flag:

`docker-compose up -d`

To stop the container, you can use the following command:

`docker-compose stop`

And to remove the container, you can use the following command:

`docker-compose down`
