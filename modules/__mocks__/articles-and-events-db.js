'use strict'

const articlesAndEventsDB = jest.genMockFromModule('../articles-and-events-db')

// Mock adding one resource to provided collection
articlesAndEventsDB.addResourceToCollection = (databaseURL, collectionName, newResource) => new Promise((resolve, reject) => {

	if(databaseURL == 'mongodb://localhost:27017/articles_and_events_database' && (collectionName == 'articles' || collectionName == 'events')) {

		if(Object.keys(newResource).length == 0) {
			reject(new Error('Trying to add an empty object'))
		} else {
			resolve(true)
		}
	} else {
		reject(new Error('Incorrect database details passed'))
	}
})

// Mock retrieve all resources from a given collection
articlesAndEventsDB.getAllFromCollection = (databaseURL, collectionName, resourceObject, sortObject) => new Promise((resolve, reject) => {

	if(databaseURL == 'mongodb://localhost:27017/articles_and_events_database' && (collectionName == 'articles' || collectionName == 'events')) {
		resolve([{'_id': 1234 , 'name': 'Test Resource'}])
	} else {
		reject(new Error('Incorrect database details passed'))
	}
})

// Mock retrieve a specific resource from a collection
articlesAndEventsDB.getResourceFromCollection = (databaseURL, collectionName, resourceID) => new Promise((resolve, reject) => {

	const mockedInvalidID = 6666

	if(databaseURL == 'mongodb://localhost:27017/articles_and_events_database' && (collectionName == 'articles' || collectionName == 'events')) {

		if(resourceID == mockedInvalidID) {
			reject(new Error('Trying to request an object that doesnt exist'))
		} else {
			resolve({'_id': 1234, 'name': 'Test Resource'})
		}

	} else {
		reject(new Error('Incorrect database details passed'))
	}

})

// Mock update a resource with the provided ID and new values object
articlesAndEventsDB.updateResource = (databaseURL, collectionName, resourceID, newValuesObject) => new Promise((resolve, reject) => {

	const mockedInvalidID = 6666

	if(databaseURL == 'mongodb://localhost:27017/articles_and_events_database' && (collectionName == 'articles' || collectionName == 'events')) {

		if(Object.keys(newValuesObject).length == 0) {
			reject(new Error('Trying to update an object with an empty object'))

		} else if(resourceID == mockedInvalidID) {
			reject(new Error('Trying to request an object that doesnt exist'))

		} else {
			resolve(true)
		}

	} else {
		reject(new Error('Incorrect database details passed'))
	}
})

// Mock delete a resource by its given ID
articlesAndEventsDB.deleteResource = (databaseURL, collectionName, resourceID) => new Promise((resolve, reject) => {

	const mockedInvalidID = 6666

	if(databaseURL == 'mongodb://localhost:27017/articles_and_events_database' && (collectionName == 'articles' || collectionName == 'events')) {

		if(resourceID == mockedInvalidID) {
			reject(new Error('Trying to request an object that doesnt exist'))
		} else {
			resolve(true)
		}

	} else {
		reject(new Error('Incorrect database details passed'))
	}
})

module.exports = articlesAndEventsDB
