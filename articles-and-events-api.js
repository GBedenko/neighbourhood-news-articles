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
})

// GET Request to retrieve one article
app.get('/articles/:article_id', (req, res) => {

	// Call controller to retrieve one article
})

// POST Request to create a new article
app.post('/articles', (req, res) => {

	// Call controller to create a new article from the provided request
})

// PUT Request to update a article
app.put('/articles/:article_id', (req, res) => {

	// Call controller to update an article at the provided id
})

// DELETE Request to delete one article
app.delete('/articles/:article_id', (req, res) => {

	// Call controller to delete an article corresponding to the HTML request's article id
})

// Runs the server on provided port
app.listen(port, () => console.log(`Server listening on port ${port}`));
