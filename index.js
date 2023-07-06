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


// Require employee routes
const employeeRoutes = require('./src/routes/employee.routes')
const productRoutes = require('./src/routes/product.routes')
// using as middleware
server.use('/api/v1/employees', employeeRoutes)
server.use('/api/v1/products', productRoutes)

//server.use(express.static(path.join(__dirname,'src/dbimages')));

function handleErrors(err, req, res, next) {
    console.log(err);

 
    res.status(500).send('An internal server error occurred');
};


server.listen(PORT, err => {
    if (err) throw err;
    console.log(`> Ready on ${PORT}`);
});

