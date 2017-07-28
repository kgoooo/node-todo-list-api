const express 	 = require('express'),
	  bodyParser = require('body-parser');

const {mongoose} = require('./db/mongoose'),
	  {Todo}	 = require('./models/todo'),
	  {User}	 = require('./models/user');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
	var todo = new Todo({
		text: req.body.text
	});
	todo.save().then((doc) => {
		res.send(doc);
	}, (e) => {
		res.status(400).send(e);
	});
});








app.listen(3000, () => {
	console.log('🔆 Server running on port 3000');
});