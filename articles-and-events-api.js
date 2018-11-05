'use strict'

console.log("Server Booting Up...")

// Using express as my web server, create instance and set attributes
const express = require('express')
const app = express()
app.use(express.json())

// Port this server will run on
const port = 8080;

// Module which contains the business logic for articles
const articles_controller = require('./modules/articles-controller')

// Home root currently redirects to /articles
app.get('/', (req, res) => {
	res.redirect('/articles')
})

// GET Request to retrieve all articles
app.get('/articles', (req, res) => {

	// Call controller to retrieve all articles
	// Once completed, callback function sends the result as a json string
	articles_controller.getAll(null, (articles) => {
		res.status(200).json(articles)
	})
})

// GET Request to retrieve one article
app.get('/articles/:article_id', (req, res) => {

	// Call controller to retrieve one article
	// Once completed, callback function sends the result as a json string
	articles_controller.getById(req.params.article_id, (article) => {
		res.status(200).json(article)
	})
})

// POST Request to create a new article
app.post('/articles', (req, res) => {

	// Call controller to create a new article from the provided request
	// Once completed, run the callback which sends the client a message and status code confirming the article was created
	articles_controller.add(req.body, () => {
		res.status(201).send("New article created\n")
	})
})

// PUT Request to update a article
app.put('/articles/:article_id', (req, res) => {

	// Call controller to update an article at the provided id
	// Once completed, run the callback which sends the client a message and status code confirming the article was updated
	articles_controller.update(req.params.article_id, req.body, () => {
		res.status(200).send("article with id: " + req.params.article_id + " has been updated\n")
	})
})

// DELETE Request to delete one article
app.delete('/articles/:article_id', (req, res) => {

	// Call controller to delete an article corresponding to the HTML request's article id
	// Once completed, return back to client a message and status code confirming the article was deleted
	articles_controller.delete(req.params.article_id, () => {
		res.status(200).send("article with id: " + req.params.article_id + " has been deleted\n")
	})
})

// GET Request to retrieve all events
app.get('/events', (req, res) => {

	// Call controller to retrieve all events
})

// GET Request to retrieve one event
app.get('/events/:event_id', (req, res) => {

	// Call controller to retrieve one event
})

// POST Request to create a new event
app.post('/events', (req, res) => {

	// Call controller to create a new event from the provided request
})

// PUT Request to update an event
app.put('/events/:event_id', (req, res) => {

	// Call controller to update an event at the provided id
})

// DELETE Request to delete one event
app.delete('/events/:event_id', (req, res) => {

	// Call controller to delete an event corresponding to the HTML request's event id
})

// Runs the server on provided port
app.listen(port, () => console.log(`Server listening on port ${port}`));
