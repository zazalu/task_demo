/**
 * Created by gaoge on 12/3/15.
 */
var express = require('express');
var router = express.Router();

// based on '/tasks'
router.get('/', function (req, res) {
    var Task = require('../app').Task;
    Task.find({}, function (err, docs) {
        res.render('tasks/index', {
            title: 'Todos index view',
            docs: docs,
            message: req.flash('info')
        });
    });
});

router.post('/', function (req, res) {
    var Task = require('../app').Task;
    var task = new Task(req.body.task);
    task.save(function (err) {
        if (!err) {
            req.flash('info', 'Task created');
            res.redirect('/tasks');
        } else {
            req.flash('info', 'error');
            res.redirect('tasks/');
        }
    });
});

router.get('/new', function (req, res) {
    res.render('tasks/new', { title: 'New Task'});
});

router.get('/:id/edit', function (req, res) {
    var Task = require('../app').Task;
    Task.findById(req.params.id, function (err, doc) {
        if (err) {
            res.send('can\'t edit this task');
        }
        res.render('tasks/edit', {
            title: 'Edit Task View',
            task: doc
        });
    });
});

router.put('/:id', function (req, res) {
    var Task = require('../app').Task;
    Task.findById(req.params.id, function (err, doc) {
        if (!req.body.task) {
            console.log('fail');
        }
        if (!doc.task) {
            console.log(req.params);
        }
        doc.task = req.body.task.task;
        doc.save(function (err) {
            if (!err) {
                res.redirect('/tasks');
            } else {
                console.log('error happened');
                // error handling
            }
        });
    });
});

router.delete('/:id', function (req, res) {
    var Task = require('../app').Task;
    Task.findById(req.params.id, function (err, doc) {
        if (!doc) {
            return next(new NotFound('Document not found'));
        }
        doc.remove(function () {
            res.redirect('/tasks');
        });
    });
});

module.exports = router;
