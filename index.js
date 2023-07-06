const express = require('express');
const server = express();
const bodyParser = require("body-parser");
const cors = require('cors');
const path = require("path");



const PORT = process.env.PORT || 4000;

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

server.use(cors({
    origin: '*'
}));


server.get('/', async (req, res) => {

    res.send("funciona");/**/
});

server.use(express.static(path.join(__dirname,'src/dbimages')));

// Require employee routes
const userRoutes = require('./src/routes/user.routes')
const movieRoutes = require('./src/routes/movie.routes')
// using as middleware
server.use('/api/v1/users', userRoutes)
server.use('/api/v1/movies', movieRoutes)


function handleErrors(err, req, res, next) {
    console.log(err);

 
    res.status(500).send('An internal server error occurred');
};


server.listen(PORT, err => {
    if (err) throw err;
    console.log(`> Ready on ${PORT}`);
});

