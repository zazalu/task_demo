/**
 * Created by gaoge on 12/2/15.
 */
var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var flash = require('connect-flash');

var app = express();

var routes = require('./routes/index');
var tasks = require('./routes/tasks');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 }
}));
app.use(methodOverride('_method'));
app.use(flash());

app.use('/', routes);
app.use('/tasks', tasks);

function validatePresenceOf (value) {
    return value && value.length;
}

mongoose.connect('mongodb://localhost/todo_development');

var Schema = mongoose.Schema;
//var ObjectID = Schema.ObjectId;

var TaskSchema = new Schema({
    task : {
        type: String,
        validate: [validatePresenceOf, 'a task is required']
    }
});

var Task = mongoose.model('Task', TaskSchema);

module.exports = {
    app: app,
    Task: Task
};

app.listen(3000, 'localhost');
