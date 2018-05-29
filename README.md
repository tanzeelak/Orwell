# Orwell

## Overview
A narrative illustrating the lack of security on social media. Orwell's story is based on the concept of eyes watching you.

## Built With
- [Node.js](https://nodejs.org/en/): JavaScript run-time environment that executes JavaScript server-side code.
- [Blender](https://www.blender.org/): Blender is a professional, free and open-source 3D computer graphics software toolset used for creating 3D printed models. 
- [Three.js](https://threejs.org/): JavaScript library and Application Programming Interface used to create and display animated 3D computer graphics in a web browser.
- [Tracking.js](https://trackingjs.com/): Library for computer vision algorithms and techniques.
  - [Here for the readme](https://github.com/eduardolundgren/tracking.js/blob/master/README.md)

## Setting up the environment
- Clone this repository.
  - `git clone git@github.com:tanzeelak/Orwell.git`
- Install yarn, a reliable package manager for code. 
  - `brew install yarn`
  - Read more about Yarn commands [here](https://yarnpkg.com/lang/en/docs/cli/global/).
- Install nodemon, a monitor for changes in source code and automatically restarts when change is detected. 
  - `yarn global add nodemon`
- Install all packages, listed in the package.json.
  - `yarn install`

## Run the server locally
- Run nodemon and check server `localhost:5000`. Nodemon watches for any changes in the .js files and updates the server correspondingly.
  - `nodemon`
  - To restart the server without exiting nodemon
    - `rs`
- Run the sass watcher. Sass watches the .scss files for changes and outputs the css version into the .css files.
  - `sass watch .`
