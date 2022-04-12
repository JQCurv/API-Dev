const express = require('express');
const app = express();
const PORT = 8080;

//apply middleware - tells espress to parse the JSON before the data hits the function that handles the request
//now each request will go through this middle ware and convert it's body to JSON
app.use( express.json() )

app.listen(
    PORT,
    () => console.log(`it's alive on http://localhost:${PORT}`)
)

//When a client or URL reqs this API, the function will handle the request
//req - incoming data
//res - data to send back to the client 
app.get('/tshirt', (req, res) => {
    res.status(200).send({
        tshirt: 'Blue',
        size: 'large'
    })
});

//id is a dynamic URL paramater
//could be millions of tshirts on this API, dynamic URL let's us handle all of them
//post request means user is trying to create new data on the server
app.post('/tshirt/:id', (req, res) => {
    //value of tshirt ID is available on the request paramaters object
    const { id } = req.params;
    //need the tshirt logo, but this is on the request body
    const { logo } = req.body;

    //check to make sure we have a logo
    if (!logo) {
        res.status(418).send({ message: 'We need a logo!' })
    }

    res.send({
        tshirt: `Tshirt with your ${logo} and ID of ${id} `, 
    })
});