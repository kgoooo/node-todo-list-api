const express 	 = require('express'),
	  bodyParser = require('body-parser'),
	  _			 = require('lodash');
	  
var {ObjectID} 	 = require('mongodb');	  

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
		res.send({todo});
	}).catch((e) => {
		res.status(404).send();
	});
});

app.delete('/todos/:id', (req, res) => {
	var id = req.params.id;
	if(!ObjectID.isValid(id)){
		return res.status(404).send();
	}

	Todo.findByIdAndRemove(id).then((todo) => {
		if(!todo){
			return res.status(400).send('Couldnt find todo. Not deleted.');
		}
		
		res.send({todo});
	}).catch((e) => {
		res.status(400).send();
	});
});

app.patch('/todos/:id', (req, res) => {
	var id = req.params.id;
	var body = _.pick(req.body, ['text', 'completed']);
	if(!ObjectID.isValid(id)){
		return res.status(404).send();
	}

	if(_.isBoolean(body.completed) && body.completed) {
		body.completedAt = new Date().getTime();
	} else {
		body.completed = false;
		body.completedAt = null;
	}

	Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
		if(!todo){
			return res.status(404).send();
		}
		res.send({todo});
	}).catch((e) => {
		res.status(400).send()
	})
});

app.listen(port, () => {
	console.log(`🔆 Server running on port ${port}`);
});

module.exports = {app};