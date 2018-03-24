const express = require('express');
var path = require('path');

var app = express();

const port = process.env.PORT || 3000;
console.log(path.join(__dirname, 'public/index'));
app.use(express.static(path.join(__dirname, 'public/index')));


// app.get('/',function (req, res) {
//     res.sendFile(__dirname, 'public/index.html');
//     console.log(__dirname, 'public/index.html');
// });


app.listen(port,function () {
    console.log('Server started at port ' +port);
});
