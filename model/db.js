mongo = require('mongoose');

mongo.connect('mongodb://localhost/yourDb', function (err) {
    if (!err) console.log('Connect Mongodb successfully!')
    else throw err;
});

var schema = mongo.Schema;
var id = schema.ObjectId;

var taskModel = new schema({
    task: String
});

taskModel.methods.add = function (taskItem, callback){
    this.task = taskItem.task;
    this.save(callback);
}

var taskDoc = mongo.model('task', taskModel);

module.exports = taskDoc;