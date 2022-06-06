# Fastidiouscity

This project is a reboot of my Master's thesis project "Fastidiouscity". It is build in React, while using GPT-3 as backend tool.

## Requirements to run this repository locally

In order to run this repository, you need to have a GPT3 api key available. \
If you do, create in the root folder of the project a file called ".env" and write the following line:

### `REACT_APP_GPT3_API_KEY = "your-api-key";`

Then follow the React instructions indicated in the next paragraph.

## How to run

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## How to add sections

Analysis sections are coded in the folder "AnalysisSections". \
Each section is a class implementing two methods: "compute" and "draw".

"Compute" is launched from the main application when the user clicks on "Analyze". This function doesn't need to return anything, it can simply modify the inner state of the class. If the computation requires some backend waiting time, it should be async and only finish when everything is ready.

"Draw" is launched from the main application after all of the sections have completed their computations (sections are launched in parallel). This function should return a React component with parameters defined by the class itself.

Classes can access the backend utility function getGPT3Response(prompt, params) to communicate with GPT-3 using the following import:

### `import { getGPT3Response } from "../BackEnd/BackEnd";`
