var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var addRow = require('./spreadsheet.js').addRow;
var getRows = require('./spreadsheet.js').getRows;

var port = 3000; 

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json())

app.get('/users', (req, res) => {
    getRows((err, data) => {
        if(err){
            res.status(404).send(err);
            return;
        }
        res.status(200).send(data);
    })
})
app.post('/users', (req, res) => {
    addRow(req.body.first, req.body.last, req.body.phone, (err, data) => {
        if(err){
            res.status(404).send(err);
            return;
        }
        res.status(200).send(data);
    })
    
})

app.listen(port, () => {console.log('listening at 3000')});
