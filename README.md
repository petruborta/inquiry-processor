## INQUIRY PROCESSOR

Small and simple full-stack web application for processing inquiries.

## Table of contents

-   [Technologies](#technologies)
-   [Setup](#setup)
-   [Features](#features)
-   [Status](#status)
-   [Inspiration](#inspiration)
-   [Contact](#contact)

## Technologies

-   [HTML](https://www.w3schools.com/html/)
-   [CSS](https://www.w3schools.com/css/)
-   [JavaScript](https://www.w3schools.com/js/)
-   [React](https://reactjs.org/)
-   [Redux](https://redux.js.org/)
-   [Node.js](https://nodejs.org/en/)
-   [Express](https://expressjs.com/)
-   [Babel](https://babeljs.io/)
-   [Webpack](https://webpack.js.org/)

## Setup

-   Clone this repository to your local machine

    `$ git clone https://github.com/petruborta/inquiry-processor`

-   [Follow this guide](https://developers.google.com/recaptcha/intro) from Google on how to use reCAPTCHA
-   Go to [Google Recaptcha Admin](https://www.google.com/recaptcha/admin/create) to get a reCAPTCHA site key.
-   For development purposes (not production) use `127.0.0.1` as your site
-   In project's main folder create a `.env` file with the following content and replace `YOUR_SECRET_KEY` with the secret key received after setting up reCAPTCHA for your site

```env
RECAPTCHA_SERVER_KEY=YOUR_SECRET_KEY
PORT=4242
```

-   Run these two commands in separate terminals

```shell
npm run webpack
npm run dev
```

-   In browser type `127.0.0.1:4242` to see the application live (reCAPTCHA won't work `localhost:4242`)

## Features

-   Inquiry form with validation of input data and anti-spam measure (reCAPTCHA)
-   Collection and storage of inquiries
-   Page for viewing, reading and managing inquiries (REST API for CRUD operations)
    -   inquiries ordered by date in descending order
    -   mark inquiry as read, unread, starred, unstarred or simply delete
    -   select multiple inquiries and mark as read, unread or delete them all at once
    -   view inquiry details in a separate window
    -   filter inquiries by categories:
        -   read
        -   unread
        -   starred
        -   unstarred
-   Responsive and minimalistic design

## Status

Project is: _finished_ - all requirements of the project (based on test/problem description) are met, but there are more features that can be added and optimization to be made.

## Inspiration

This project is solution to a technical test.

## Contact

Created by [@petruborta](https://petruborta.com/) - feel free to contact me!
