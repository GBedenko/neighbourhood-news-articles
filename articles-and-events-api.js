#!/usr/bin/env node

'use strict'

console.log("Booting Up Articles and Events API Server...")

// Import koa packages
const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')

// Setup koa packages
const app = new Koa()
app.use(bodyParser())
const router = new Router()

// Import package used to assign status codes for responses easily
const status = require('http-status-codes')

// Port used for this microservice
const port = 8081

// Import modules for communicating with articles and events backend
const articlesController = require('./modules/articles-controller')
const eventsController = require('./modules/events-controller')

// Module to email admin when article/event created
const notifyAdministrator = require('./modules/notify-administrator')

// Allow connections only from localhost, inform client requests the content type is json
app.use( async(ctx, next) => {
	ctx.set('Access-Control-Allow-Origin', 'localhost')
	ctx.set('content-type', 'application/json')
	await next()
})

// GET Requests for all Articles
router.get('/api/v1.0/articles', async ctx => {

	// Allow only get requests to this endpoint function
	ctx.set('Allow', 'GET')
		
	// Request the articles object from the controller
	const articles = await articlesController.getAll(ctx.request.body)

	// Assign the status code to 200 and response body object as all the articles
	ctx.status = status.OK
	ctx.body = articles
})

// GET Request for one Article
router.get('/api/v1.0/articles/:article_id', async ctx => {

	// Allow only get requests to this endpoint function
	ctx.set('Allow', 'GET')
	
	// Request one article object from the controller using the provided id
	const article = await articlesController.getById(ctx.params.article_id)

	// Assign the status code to 200 and response body object as the found article
	ctx.status = status.OK
	ctx.body = article
})

// POST Request for a new Article
router.post('/api/v1.0/articles', async ctx => {

	// Allow only post requests to this endpoint function
	ctx.set('Allow', 'POST')
	
	// Send the new article object to the controller using the client request body
	const addArticleResponse = await articlesController.add(ctx.request.body)

	// Calls the function to email the admin, doesn't worry about recieving a response
	notifyAdministrator.emailAdministrator()

	// Assign the status code to 201 and response body object as a boolean to confirm the article was added
	ctx.status = status.CREATED
	ctx.body = {status: 'success', articleAddedSuccessfully: addArticleResponse}
})

// PUT Request to update an existing Article
router.put('/api/v1.0/articles/:article_id', async ctx => {
	
	// Allow only put requests to this endpoint function
	ctx.set('Allow', 'PUT')

	// Send the updated article object to the controller using the client request body for the provided article id
	const updateArticleResponse = await articlesController.update(ctx.params.article_id, ctx.request.body)

	// Assign the status code to 201 and response body object as a boolean to confirm the article was updated
	ctx.status = status.CREATED
	ctx.body = {status: 'success', articleUpdatedSuccessfully: updateArticleResponse}
})

// DELETE Request to remove an existing Article
router.del('/api/v1.0/articles/:article_id', async ctx => {
	
	// Allow only delete requests to this endpoint function
	ctx.set('Allow', 'DELETE')
		
	// Request the provided article id's object to be deleted by the controller
	const deleteArticleResponse = await articlesController.delete(ctx.params.article_id)

	// Assign the status code to 200 and response body object as a boolean to confirm the article was deleted
	ctx.status = status.OK
	ctx.body = {status: 'success', articleDeletedSuccessfully: deleteArticleResponse}
})

// GET Requests for all Events
router.get('/api/v1.0/events', async ctx => {

	// Allow only get requests to this endpoint function
	ctx.set('Allow', 'GET')
		
	// Request the events object from the controller
	const events = await eventsController.getAll(ctx.request.body)

	// Assign the status code to 200 and response body object as all the events
	ctx.status = status.OK
	ctx.body = events
})

// GET Request for one Event
router.get('/api/v1.0/events/:event_id', async ctx => {

	// Allow only get requests to this endpoint function
	ctx.set('Allow', 'GET')
	
	// Request one event object from the controller using the provided id
	const event = await eventsController.getById(ctx.params.event_id)

	// Assign the status code to 200 and response body object as the found event
	ctx.status = status.OK
	ctx.body = event
})

// POST Request for a new Event
router.post('/api/v1.0/events', async ctx => {

	// Allow only post requests to this endpoint function
	ctx.set('Allow', 'POST')
	
	// Send the new event object to the controller using the client request body
	const addEventResponse = await eventsController.add(ctx.request.body)

	// Calls the function to email the admin, doesn't worry about recieving a response
	notifyAdministrator.emailAdministrator()

	// Assign the status code to 201 and response body object as a boolean to confirm the event was added
	ctx.status = status.CREATED
	ctx.body = {status: 'success', eventAddedSuccessfully: addEventResponse}
})

// PUT Request to update an existing Event
router.put('/api/v1.0/events/:event_id', async ctx => {

	// Allow only put requests to this endpoint function
	ctx.set('Allow', 'PUT')

	// Send the updated event object to the controller using the client request body for the provided event id
	const updateEventResponse = await eventsController.update(ctx.params.event_id, ctx.request.body)

	// Assign the status code to 201 and response body object as a boolean to confirm the event was updated
	ctx.status = status.CREATED
	ctx.body = {status: 'success', eventUpdatedSuccessfully: updateEventResponse}
})

// DELETE Request to remove an existing Event
router.del('/api/v1.0/events/:event_id', async ctx => {
	
	// Allow only delete requests to this endpoint function
	ctx.set('Allow', 'DELETE')
		
	// Request the provided event id's object to be deleted by the controller
	const deleteEventResponse = await eventsController.delete(ctx.params.event_id)

	// Assign the status code to 200 and response body object as a boolean to confirm the event was deleted
	ctx.status = status.OK
	ctx.body = {status: 'success', eventDeletedSuccessfully: deleteEventResponse}
})

// Assign all routes/endpoints to the Koa server
app.use(router.routes())
app.use(router.allowedMethods())

// Run the server, show helpful message to know which port it is running on
const server = app.listen(port, () => console.log(`Server listening on port ${port}`))

// Export the endpoints module so that it can be tested
module.exports = server
