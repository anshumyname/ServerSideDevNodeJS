const express = require('express');
const http = require('http');
// var bodyParser = require('body-parser');
const hostname = 'localhost';
const port = 3000;

const app = express();
const morgan = require('morgan');
app.use(morgan('dev'));
// app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json());

app.all( './dishes', (req, res,next) => {
   res.statusCode = 200;
   res.setHeader('Content-Type','text/plain');
   next();
})

app.get('/dishes', (req, res,next) => {
   res.end('Will send all the dishes to you!');
})

app.post('/dishes', (req, res, next) => {
  // console.log(req);
   res.end('Will ad the dish : ' + req.body.name + 'with details: ' + req.body.description)
})

app.put('/dishes', (req, res, next) => {
  res.statusCode  = 403;
  res.end('PuT operation not operation on /dishes')
})

app.delete('/dishes', (req, res, next) => {
  res.end('Deleting all the dishes!! ')
})


app.get('/dishes/:dishId', (req, res,next) => {
  res.end('Will send all the dishes to you!' + req.params.dishId+ ' to you');
})

app.post('/dishes/:dishId', (req, res, next) => {
  res.statusCode  = 403;
  res.end('POST operation not operation on /dishes ' + req.params.dishId);
})

app.put('/dishes/:dishId', (req, res, next) => {
 res.write('Updating the dish : ' + req.params.dishId);
 res.end('will update the dish' + req.body.name + 'with detail ' + req.body.description);
})

app.delete('/dishes/:dishId', (req, res, next) => {
 res.end('Deleting '+ req.params.dishId+'the dishes!! ')
})


app.use(express.static(__dirname + '/public'));
app.use((req, res, next) => {
  console.log(req.headers);
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end('<html><body><h1>This is an Express Server</h1></body></html>');

});

const server = http.createServer(app);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});