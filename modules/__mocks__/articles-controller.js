'use strict'

const articlesController = jest.genMockFromModule('../articles-controller')

// Mock adding a new article response
articlesController.add = async(articleObject) => {

	const response = true

	return response
}

// Mock retrieving one article
articlesController.getById = async(articleID) => {

	const response = {'_id': 1234, heading: 'Test Heading'}

	return response
}

// Mock retrieving all articles
articlesController.getAll = async(queryObject) => {

	const response = [{'_id': 1234, 'heading': 'Test Heading'}]

	return response
}

// Mock updating a article response
articlesController.update = async(articleID, newArticleDetailsObject) => {

	const response = true

	return response
}

// Mock deleting a article response
articlesController.delete = async(articleID) => {

	const response = true

	return response
}

module.exports = articlesController
