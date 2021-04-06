const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const fileUpload = require('express-fileupload');
const app = express();
const http = require('http').Server(app);
dotenv.config();

// const hostname = 'localhost';
// const port = 3000; 

app.use(cookieSession({
    name: 'session',
    keys: ['keyboard cat'],
    // Cookie Options
    maxAge: 72 * 60 * 60 * 1000 // 72 hours
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // parse form data client
app.use(cookieParser());

// configure express to use public folder
app.use('/app-property', express.static(path.join(__dirname, 'public')));
app.use('/app-helper', express.static(path.join(__dirname, 'helpers')));
app.use(fileUpload());

app.use(cors({ origin: true, credentials: true }));

// Routes for the app Start
// include all created routes
const RoutesCustom = require('./routes');
// use custom routes in app
new RoutesCustom(app);
// Routes for the app End

http.listen(process.env.PORT, process.env.HOSTNAME, () => {
    console.log(`Server running on port: http://${process.env.HOSTNAME}:${process.env.PORT}`);
    //console.log(`Server running on port: http://${config.HOST}:${config.PORT}`);
});