
var express = require('express');
var path = require('path');
var app = module.exports = express();

app.configure(function () {
    app.use(express.static(path.join(__dirname, 'public')));
});

var port = process.env.PORT || 3000;
app.listen(3000);