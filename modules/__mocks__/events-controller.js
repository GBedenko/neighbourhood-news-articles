'use strict'

const eventsController = jest.genMockFromModule('../events-controller')

// Mock adding a new event response
eventsController.add = async(eventObject) => {

	if(Object.keys(eventObject).length == 0) {
		return false
	} else {
		return true
	}
}

// Mock retrieving one event
eventsController.getById = async(eventID) => {

	const mockedInvalidID = 6666

	if(eventID == mockedInvalidID) {
		return {}
	} else {
		return {'_id': 1234, title: 'Test Title'}
	}
}

// Mock retrieving all events
eventsController.getAll = async(queryObject) => {

	if(Object.keys(queryObject).length == 0) {
		return [{'_id': 1234, 'title': 'Test Title'}]
	} else {
		return [{'_id': 2345, 'title': 'Queried Title'}]
	}
}

// Mock updating a event response
eventsController.update = async(eventID, newEventDetailsObject) => {

	if(Object.keys(newEventDetailsObject).length == 0) {
		return false
	} else {
		return true
	}
}

// Mock deleting a event response
eventsController.delete = async(eventID) => {

	const mockedInvalidID = 6666

	if(eventID == mockedInvalidID) {
		return false
	} else {
		return true
	}
}

module.exports = eventsController
