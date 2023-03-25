var express = require('express');
var router = express.Router();
var Task = require('../controllers/task')
var User = require('../controllers/user')

router.get('/markdone/:taskID', function(req, res, next) {
	Task.getTask(req.params.taskID)
		.then(task => {
			task.state = "done"
			Task.editTask(task)
				.then(answer => {
					res.redirect("/")
				})
				.catch(error => {
					res.render("error", {error:error, message:"Error deleting task from database"})
				})
		})
		.catch(error => {
			res.render("error", {error:error, message:"Error deleting task from database"})
		})
});

router.get('/edit/:taskID', function(req, res, next) {
	User.list()
		.then(users => {
			Task.list()
				.then(tasks => {
					var d = new Date().toISOString().substring(0,16)
					var t = tasks.find(t => t.id == req.params.taskID)
					res.render("index", {tasks:tasks, t:t, users:users, date:d})
				})
				.catch(error => {
					res.render("error", {error:error, message:"Error obtaining task list"})
				})
		})
		.catch(error => {
			res.render("error", {error:error, message:"Error obtaining user list"})
		})
});

/* GET home page. */
router.get('/', function(req, res, next) {
	User.list()
		.then(users => {
			Task.list()
				.then(tasks => {
					var d = new Date().toISOString().substring(0,16)
					res.render("index", {tasks:tasks, t:null, users:users, date:d})
				})
				.catch(error => {
					res.render("error", {error:error, message:"Error obtaining task list"})
				})
		})
		.catch(error => {
			res.render("error", {error:error, message:"Error obtaining user list"})
		})
});



router.post('/', function(req, res, next) {
	if (req.body.username)
	{
		User.addUser(req.body)
			.then(user => {
				res.redirect("/")
			})
			.catch(error => {
				res.render("error", {error:error, message:"Error adding user to database"})
			})
	}
	else
	{
		req.body.state = "due"
		Task.addTask(req.body)
			.then(task => {
				res.redirect("/")
			})
			.catch(error => {
				res.render("error", {error:error, message:"Error adding task to database"})
			})
	}
})

router.post('/edit/:taskID', function(req, res, next) {
	req.body.state = "due"
	Task.editTask(req.body)
		.then(task => {
			res.redirect("/")
		})
		.catch(error => {
			res.render("error", {error:error, message:"Error editing task"})
		})
})

module.exports = router;
