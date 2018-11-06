'use strict'

console.log("Server Booting Up...")

// Using express as my web server, create instance and set attributes
const express = require('express')
const app = express()
app.use(express.json())

// Port this server will run on
const port = 8080;

// Module which contains the business logic for articles
const articlesController = require('./modules/articles-controller')

// Home root currently redirects to /articles
app.get('/', (req, res) => {
	res.redirect('/articles')
})

// GET Request to retrieve all articles
app.get('/articles', async(req, res) => {

	// Call controller to retrieve all articles
	// Waits for response from controller before continuing (async/await)
	const articles = await articlesController.getAll()

	res.status(200).send(articles)
})

// GET Request to retrieve one article
app.get('/articles/:article_id', (req, res) => {

	// Call controller to retrieve one article
	// Once completed, callback function sends the result as a json string
	articlesController.getById(req.params.article_id, (article) => {
		res.status(200).json(article)
	})
})

// POST Request to create a new article
app.post('/articles', async(req, res) => {

	// Call controller to create a new article from the provided request
	// Once completed, run the callback which sends the client a message and status code confirming the article was created
	const response = await articlesController.add(req.body)
	
	if(response) {
		res.status(200).send("Article added succesfully\n")
	} else {
		res.status(400).send("There was an error posting your article\n")
	}
})

// PUT Request to update a article
app.put('/articles/:article_id', (req, res) => {

	// Call controller to update an article at the provided id
	// Once completed, run the callback which sends the client a message and status code confirming the article was updated
	articlesController.update(req.params.article_id, req.body, () => {
		res.status(200).send("article with id: " + req.params.article_id + " has been updated\n")
	})
})

// DELETE Request to delete one article
app.delete('/articles/:article_id', (req, res) => {

	// Call controller to delete an article corresponding to the HTML request's article id
	// Once completed, return back to client a message and status code confirming the article was deleted
	articlesController.delete(req.params.article_id, () => {
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
