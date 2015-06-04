var express = require('express');
var router = express.Router();

var taskDoc = require('../model/db');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/task', function (req, res) {
    //res.render('index', { title: 'Todo index view' });
    taskDoc.find({}, function (err, docs) {
        res.render('index', {
            title: 'Todo index view',
            docs: docs
        });
    });
});

router.get('/task/new', function (req, res) {
    res.render('new', { title: 'New Task' });
});

router.post('/task', function (req, res) {
    //var item = new taskDoc(req.body.task);
    var item = new taskDoc();

    item.add({task: req.body.item},function (err) {
        if (!err) res.redirect('/task');
        else res.redirect('/task/new');
    });
});

router.get('/task/:id/edit', function (req, res) {
    taskDoc.findById(req.params.id, function (err, doc) {
        res.render('edit', {
            title: 'Edit Task View',
            task: doc
        });
    });

});

router.post('/task/:id', function (req, res) {
    taskDoc.findById(req.params.id, function (err, doc) {
        doc.task = req.body.taskName;

        doc.save(function (err) {
            if (!err) res.redirect('/task');
            else {
                //error handling
            }
        });
    });

});

router.delete('/task/:id', function (req, res) {
    taskDoc.findById(req.params.id, function (err, doc) {
        if (!doc)
            return next(new NotFound('Document not found'));

        doc.remove(function () {
            res.redirect('/task');
        });

    });
});

module.exports = router;
