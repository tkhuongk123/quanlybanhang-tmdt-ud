const path = require('path')
const port = 8000
const express = require('express')
const cors = require('cors')
const routes = require('./src/routes')
const db = require('./src/config/db')
const app = express()


// Connect DB
db.connect();


// cors data
app.use(cors());

// Express middleware
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

// Route init
routes(app);

// Public thư mục uploads/images
app.use("/public", express.static(path.join(__dirname, "public")));

// app listen port
app.listen(port, () => {
    console.log(`\nApp is listening port localhost:${port}`)
})
