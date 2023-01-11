[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/Spark-Vteam/Spark-webclient-customer/badges/quality-score.png?b=main)](https://scrutinizer-ci.com/g/Spark-Vteam/Spark-webclient-customer/?branch=main) [![Build Status](https://scrutinizer-ci.com/g/Spark-Vteam/Spark-webclient-customer/badges/build.png?b=main)](https://scrutinizer-ci.com/g/Spark-Vteam/Spark-webclient-customer/build-status/main)

[![.github/workflows/main.yml](https://github.com/Spark-Vteam/Spark-webclient-customer/actions/workflows/main.yml/badge.svg)](https://github.com/Spark-Vteam/Spark-webclient-customer/actions/workflows/main.yml)

# Spark webclient

Welcome to the Spark webclient! This is a sub module of the Spark project and allows users to easily rent and manage their bike rentals through the customer web client. Follow instructions below to start up the client only. To start up all backend and frontend applications for Spark, follow the the README instructions in [the main Spark repo](https://github.com/Spark-Vteam/Spark-Project) instead.

## Features
- Register for an account through OAuth GitHub
- Log in through GitHub or a username
- View overview for account
- View rental history for specific rentals
- Add or change payment methods
- Add credit or balance to your account
- Pay bills for individual rentals or on a monthly basis, depending on your chosen payment method

## Getting Started

To get started, clone the repository and install the dependencies:

- `git clone https://github.com/Spark-Vteam/Spark-webclient-customer.git`  
- `cd Spark-webclient-customer`  
- `npm install` 


Next, start the development server by running:

`npm start`

This will start the development server at http://localhost:3000.

Next, register for an account through OAuth GitHub or log in through GitHub or a username to tart renting bikes and managing your rentals through the client.

### Set up your own OAuth application for GitHub
1. Go to the GitHub Developer settings by clicking on settings in your profile dropdown and Developer settings.
2. In the Developer settings, navigate to the OAuth Applications section.
3. Click on the Register a new application button.
4. Fill in the form with the details of your application, including the name, homepage URL, and callback URL. The callback URL is the URL where GitHub should redirect the user after they have authorized your application.
5. Click the Register application button.
6. GitHub will generate a client ID and client secret for your application. Make sure to keep these secure, as they will be used to authenticate your application when making requests to the GitHub API. 
7. Create one .env file in the root of folder Spark-webclient-customer and add your client ID: REACT_APP_CLIENT_ID=*YOUR_CLIENT_ID*. Note that you must add your client secret in your .env file on server side.
8. Your application is now registered, and you can implement the OAuth flow for your users, by redirecting them to the GitHub authorization page, and then handling the authorization callback from GitHub.

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
