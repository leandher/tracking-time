## Time Tracking

An application used to control the working hours for a company's employees, built with React, Firebase, JavaScript, and CSS.


## Installation and Setup Instructions

Clone down this repository. You will need `node` and `npm` installed globally on your machine.  

Installation:

`npm install`  
`yarn`

To Start Server:

`npm start`  
`yarn start`  

To Visit App:

`localhost:3000`  

To build:
`npm run build`
`yarn build`

To deploy: 
`firebase deploy`

## Live demo

https://time-tracking-798b8.web.app

## Reflection
One of the main challenges I ran into was Authentication. This lead me to spend a few time on a research spike into OAuth using Firebase. I created a Context using React Context Api to handle with auth process and keep user information.

At the end of the day, the technologies implemented in this project are React, React-Router-Dom, MomentJS, React Spinners, React Toastify, Firebase for auth and database, and a significant amount of VanillaJS, JSX, and CSS. I chose to use the `create-react-app` boilerplate to minimize initial setup, but I have to eject to configure MomentJs.