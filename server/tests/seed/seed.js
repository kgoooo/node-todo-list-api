const {ObjectID} = require('mongodb'),
	  jwt		 = require('jsonwebtoken'),
	  {Todo}	 = require('./../../models/todo'),
	  {User}	 = require('./../../models/user');
	
const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const users = [{
	_id: userOneId,
	email: 'test@aol.com',
	password: 'testpassword1!',
	tokens: [{
		access: 'auth',
		token: jwt.sign({_id: userOneId, access: 'auth'}, 'pineapple').toString()
	}]
}, {
	_id: userTwoId,
	email: 'testtwo@aol.com',
	password: 'testpassword2!'
}];

const todos = [{
	_id: new ObjectID(),
	text: 'First todo'
}, {
	_id: new ObjectID(),	
	text: 'Second todo',
	completed: true,
	completedAt: 666
}];

const populateTodos = (done) => {
	Todo.remove({}).then(() => {
		return Todo.insertMany(todos);
	}).then(() => done());
};

const populateUsers = (done) => {
	User.remove({}).then(() => {
		var userOne = new User(users[0]).save();
		var userTwo = new User(users[1]).save();

		return Promise.all([userOne, userTwo]);
	}).then (() => done());
};

module.exports = {
	todos, 
	populateTodos, 
	users, 
	populateUsers
};