const express 	 = require('express'),
	  bodyParser = require('body-parser');
	  
var {ObjectID} = require('mongodb');	  

const {mongoose} = require('./db/mongoose'),
	  {Todo}	 = require('./models/todo'),
	  {User}	 = require('./models/user');

var app = express();
const port = process.env.PORT || 3000;

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

app.get('/todos', (req, res) => {
	Todo.find().then((todos) => {
		res.send({todos});
	}, (e) => {
		res.status(400).send(e);
	});
});

app.get('/todos/:id', (req, res) => {
	var id = req.params.id;
	if(!ObjectID.isValid(id)){
		return res.status(404).send('ID not valid');
	}
	Todo.findById(id).then((todo) => {
		if(!todo){
			console.log('Could not find todo');
			return res.status(404).send();
		}
		res.send({todo})
	}).catch((e) => {
		res.status(404).send();
	});
});


app.listen(port, () => {
	console.log(`🔆 Server running on port ${port}`);
});

module.exports = {app};