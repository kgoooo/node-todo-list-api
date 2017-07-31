const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://kgo-todo-api-usr:12345@ds127983.mlab.com:27983/kgo-todo-api', {
	useMongoClient: true
});

module.exports = {mongoose};