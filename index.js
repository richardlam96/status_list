var express = require('express'),
		bodyParser = require('body-parser');

app = express();
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


var entryRoutes = require('./routes/entries');
app.use('/api/entries', entryRoutes);


app.get('/', function(req, res) {
	res.sendFile('index.html');
});

app.listen(process.env.PORT || 3000, process.env.IP || 'localhost', function() {
	console.log('Job Search Log started.');
});
