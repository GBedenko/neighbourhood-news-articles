'use strict'

const articlesController = jest.genMockFromModule('../articles-controller')

// Mock adding a new article response
articlesController.add = async(articleObject) => {

	if(Object.keys(articleObject).length == 0) {
		return false
	} else {
		return true
	}
}

// Mock retrieving one article
articlesController.getById = async(articleID) => {

	const mockedInvalidID = 6666

	if(articleID == mockedInvalidID) {
		return {}
	} else {
		return {'_id': 1234, heading: 'Test Heading'}
	}
}

// Mock retrieving all articles
articlesController.getAll = async(queryObject) => {

	if(Object.keys(queryObject).length == 0) {
		return [{'_id': 1234, 'heading': 'Test Heading'}]
	} else {
		return [{'_id': 2345, 'heading': 'Queried Heading'}]
	}
}

// Mock updating a article response
articlesController.update = async(articleID, newArticleDetailsObject) => {

	if(Object.keys(newArticleDetailsObject).length == 0) {
		return false
	} else {
		return true
	}
}

// Mock deleting a article response
articlesController.delete = async(articleID) => {

	const mockedInvalidID = 6666

	if(articleID == mockedInvalidID) {
		return false
	} else {
		return true
	}
}

module.exports = articlesController
