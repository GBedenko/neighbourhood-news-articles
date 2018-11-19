'use strict'

console.log("Booting Up Articles and Events API Server...")

// Using express as my web server, create instance and set attributes
const express = require('express')
const app = express()
app.use(express.json())

// Port this server will run on
const port = 8081;

// Module which contains the business logic for articles
const articlesController = require('./modules/articles-controller')
const eventsController = require('./modules/events-controller')

// Home root currently redirects to /articles
app.get('/api/v1.0/', (req, res) => {
	res.redirect('/api/v1.0/articles')
})

// GET Request to retrieve all articles
app.get('/api/v1.0/articles', async(req, res) => {

	// Call controller to retrieve all articles
	// Waits for response from controller before continuing (async/await)
	const articles = await articlesController.getByQuery(req.body)

	res.status(200).send(articles)
})

// GET Request to retrieve one article
app.get('/api/v1.0/articles/:article_id', async(req, res) => {

	// Call controller to retrieve one article
	const article = await articlesController.getById(req.params.article_id)

	res.status(200).json(article)	
})

// POST Request to create a new article
app.post('/api/v1.0/articles', async(req, res) => {

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
app.put('/api/v1.0/articles/:article_id', async(req, res) => {
	
	console.log(req.body)
	delete req.body._id

	// Call controller to update an article at the provided id
	const articleUpdateResponse = await articlesController.update(req.params.article_id, req.body)

	if(articleUpdateResponse) {
		res.status(200).send("article with id: " + req.params.article_id + " has been updated\n")
	} else {
		res.status(400).send("There was an error updating your article\n")
	}	
})

// DELETE Request to delete one article
app.delete('/api/v1.0/articles/:article_id', async(req, res) => {

	// Call controller to delete an article corresponding to the HTML request's article id
	const articleDeleteResponse = await articlesController.delete(req.params.article_id)

	if(articleDeleteResponse) {
		res.status(200).send("article with id: " + req.params.article_id + " has been deleted\n")
	} else {
		res.status(400).send("There was an error deleting your article\n")
	}
})

// GET Request to retrieve all events
app.get('/api/v1.0/events', async(req, res) => {

	// Call controller to retrieve all events
	// Waits for response from controller before continuing (async/await)
	const events = await eventsController.getByQuery(req.body)

	res.status(200).send(events)
})

// GET Request to retrieve one event
app.get('/api/v1.0/events/:event_id', async(req, res) => {

	// Call controller to retrieve one event
	const event = await eventsController.getById(req.params.event_id)

	res.status(200).json(event)
})

// POST Request to create a new event
app.post('/api/v1.0/events', async(req, res) => {

	// Call controller to create a new event from the provided request
	// Once completed, run the callback which sends the client a message and status code confirming the event was created
	const eventCreateResponse = await eventsController.add(req.body)

	if(eventCreateResponse) {
		res.status(200).send("Event added succesfully\n")
	} else {
		res.status(400).send("There was an error posting your event\n")
	}
})

// PUT Request to update an event
app.put('/api/v1.0/events/:event_id', async(req, res) => {

	// Call controller to update an event at the provided id
	const eventUpdateResponse = await eventsController.update(req.params.event_id, req.body)

	if(eventUpdateResponse) {
		res.status(200).send("Event with id: " + req.params.event_id + " has been updated\n")
	} else {
		res.status(400).send("There was an error updating your event\n")
	}
})

// DELETE Request to delete one event
app.delete('/api/v1.0/events/:event_id', async(req, res) => {

	// Call controller to delete an event corresponding to the HTML request's event id
	const eventDeleteResponse = await eventsController.delete(req.params.event_id)

	if(eventDeleteResponse) {
		res.status(200).send("Event with id: " + req.params.event_id + " has been deleted\n")
	} else {
		res.status(400).send("There was an error deleting your event\n")
	}
})

// GET Request to retrieve all events
app.get('/api/v1.0/articles_and_events', async(req, res) => {

	// Call controller to retrieve all articles and all events
	const articles = await articlesController.getAll()
	const events = await eventsController.getAll()

	const articlesAndEvents = articles.concat(events);
	res.status(200).send(articlesAndEvents)
})

// Runs the server on provided port
app.listen(port, () => console.log(`Server listening on port ${port}`));
