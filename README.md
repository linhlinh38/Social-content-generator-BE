# Social-content-generator-BE

## Tech Stack

- Javascript
- NodeJS
- Express
- Firebase
- Twilio

## Testing API

- Postman Document API: https://documenter.getpostman.com/view/28051444/2sA3Qwbpj9

## Src Structure

```bash
    src
    ├── configs
        ├──env.config.js
        ├──firebase.config.js
    ├── controllers
        ├──accessCode.controller.js
        ├──content.controller.js
    ├── routes
        ├──accessCode.route.js
        ├──content.controller.js
        ├──index.route.js
    ├── services
        ├──accessCode.service.js
        ├──content.service.js
    ├── server.js

```

## Before Start:

- You need to config your firebase and twilio account before using this src.
- Create your .env file to config credentials for firebase, twilio and google API (can use .env.example for more information).
- In firebase.config.js file, replace your own direction to the firebase credential json file.
- In case of have any config error, please contact me for support information.

## Getting started

#### Setup

- `npm install`

#### Run source

- `npm start` to start
- Or `npm run dev` (If using nodemon)

## Author

- Nguyen Gia Linh
