'use strict'

const databaseURL = 'mongodb://localhost:27017/articles_and_events_database'
const articlesCollection = 'articles'

const database = require('./articles-and-events-db')

// Module to email admin when article/event created
const notifyAdministrator = require('./notify-administrator')

// Function to add a new article
exports.add = async(articleObject) => {

	const addArticle = database.addResourceToCollection(databaseURL, articlesCollection, articleObject)
		.then((result) => result)

	const addArticleResponse = await addArticle

	// Calls the function to email the admin, doesn't worry about recieving a response
	notifyAdministrator.emailAdministrator()

	return addArticleResponse
}

// Function to retrieve one article
exports.getById = async(articleId) => {

	const getArticle = database.getResourceFromCollection(databaseURL, articlesCollection, articleId)
		.then((article) => article)

	const article = await getArticle

	return article
}

// Function to retrieve all articles
exports.getAll = async(queryObject) => {

	let articlesResponse = {}

	// Used if the client's request had a sort value
	let sortCriteria = {}

	if(queryObject.sort == undefined) {

		// Declare a function which will call the controller for all articles
		// Returns a Promise object with either a resolve or reject value
		const articles = database.getAllFromCollection(databaseURL, articlesCollection, queryObject, sortCriteria)
			.then((results) => results) // Obtains the result from the Promise object

		// Calls the results function, waits for response before continuing
		articlesResponse = await articles

	} else {

		if(queryObject.sort == 'highest_rated') {

			// Mongodb sort object to sort by likes descending (highest to lowest)
			sortCriteria = {likes: -1}

			// Delete the sort value as it will now be sent to db in a seperate object
			delete queryObject.sort

			// Send the normal query and sort object as well
			const articles = database.getAllFromCollection(databaseURL, articlesCollection, queryObject, sortCriteria)
				.then((results) => results)

			// Calls the results function, waits for response before continuing
			articlesResponse = await articles

		} else {

			// Mongodb sort object to sort by likes ascending order (lowest to highest)
			sortCriteria = {likes: 1}

			// Delete the sort value as it will now be sent to db in a seperate object
			delete queryObject.sort

			// Send the normal query and sort object as well
			const articles = database.getAllFromCollection(databaseURL, articlesCollection, queryObject, sortCriteria)
				.then((results) => results)

			// Calls the results function, waits for response before continuing
			articlesResponse = await articles

		}
	}

	// Return the list of articles
	return articlesResponse
}

// Function to update a article
exports.update = async(articleID, newArticleDetailsObject) => {

	const updateArticle = database.updateResource(databaseURL, articlesCollection, articleID, newArticleDetailsObject)
		.then((article) => article)

	const updateArticleResponse = await updateArticle

	return updateArticleResponse
}

// Function to delete a article
exports.delete = async(articleID) => {

	const deleteArticle = database.deleteResource(databaseURL, articlesCollection, articleID)
		.then((article) => article)

	const deleteArticleResponse = await deleteArticle

	return deleteArticleResponse
}
