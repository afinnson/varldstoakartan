# TUG-map
A map for "Toaletter utan gränser" to show the locations of the toilets that they have made possible.

# Created by
Anton Finnson, November 2020

# To run locally
Before the first run, use the command `npm install`.

Use `npm start` to run locally on port 2623 if on Windows, and
`npm start_linux` if on linux or mac (I think this should work, only tested on Windows)

# Production build
The project was built assuming it is hosted at `/`.
You can control this with the homepage field in your `package.json`.

The build folder is ready to be deployed.
You may serve it with a static server:
  `npm install -g serve`
  `serve -s build`

Find out more about deployment here:
  [https://cra.link/deployment](https://cra.link/deployment)