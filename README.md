# Getting Started with Create Donority App

Before you begin, ensure that you have Node.js installed on your device. If you haven't installed Node.js yet, you can download the installer for your operating system from the official Node.js website: [Node.js Downloads](https://nodejs.org/en/download/).

## Installation

To set up the Donority app, follow these steps:

1. Clone this repository to your local machine.
2. Navigate to the project directory in your terminal or command prompt.

Then, run the following command to install the necessary dependencies:

```
npm install
```

This command will install all the required packages listed in the `package.json` file.

## Setting Up the Fake Server

Donority app utilizes a fake server for development purposes. To start the fake server, run the following command:

```
npx json-server data.json
```

This command will start the fake server using the data provided in the `data.json` file.

## Running the App

Once the dependencies are installed and the fake server is up and running, you can start the Donority app. Use the following command:

```
npm start
```

This command will launch the app in the development mode. You can view the app in your browser by navigating to [http://localhost:3000](http://localhost:3000).

The page will automatically reload if you make any changes to the source code. Additionally, any lint errors will be displayed in the console for you to address.

That's it! You're now ready to use the Donority app. If you encounter any issues during setup or while using the app, feel free to reach out for assistance. Happy donating!
