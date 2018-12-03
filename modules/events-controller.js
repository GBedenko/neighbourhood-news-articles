'use strict'

const databaseURL = 'mongodb://localhost:27017/articles_and_events_database'
const eventsCollection = 'events'

const database = require('./articles-and-events-db')

// Module to email admin when article/event created
const notifyAdministrator = require('./notify-administrator')

// Function to add a new event
exports.add = async(eventObject) => {

	const addEvent = database.addResourceToCollection(databaseURL, eventsCollection, eventObject)
		.then((result) => result)

	const addEventResponse = await addEvent

	// Calls the function to email the admin, doesn't worry about recieving a response
	notifyAdministrator.emailAdministrator()

	return addEventResponse
}

// Function to retrieve one event
exports.getById = async(eventId) => {

	const getEvent = database.getResourceFromCollection(databaseURL, eventsCollection, eventId)
		.then((event) => event)

	const event = await getEvent

	return event
}

// Function to retrieve all events
exports.getAll = async(queryObject) => {

	let eventsResponse = {}

	// Used if the client's request had a sort value
	let sortCriteria = {}

	if(queryObject.sort == undefined) {

		// Declare a function which will call the controller for all events
		// Returns a Promise object with either a resolve or reject value
		const events = database.getAllFromCollection(databaseURL, eventsCollection, queryObject, sortCriteria)
			.then((results) => results) // Obtains the result from the Promise object

		// Calls the results function, waits for response before continuing
		eventsResponse = await events

	} else {

		if(queryObject.sort == 'highest_rated') {

			// Mongodb sort object to sort by likes descending (highest to lowest)
			sortCriteria = {likes: -1}

			// Delete the sort value as it will now be sent to db in a seperate object
			delete queryObject.sort

			// Send the normal query and sort object as well
			const events = database.getAllFromCollection(databaseURL, eventsCollection, queryObject, sortCriteria)
				.then((results) => results)

			// Calls the results function, waits for response before continuing
			eventsResponse = await events

		} else {

			// Mongodb sort object to sort by likes ascending order (lowest to highest)
			sortCriteria = {likes: 1}

			// Delete the sort value as it will now be sent to db in a seperate object
			delete queryObject.sort

			// Send the normal query and sort object as well
			const events = database.getAllFromCollection(databaseURL, eventsCollection, queryObject, sortCriteria)
				.then((results) => results)

			// Calls the results function, waits for response before continuing
			eventsResponse = await events

		}
	}

	// Return the list of events
	return eventsResponse
}

// Function to update a event
exports.update = async(eventID, newEventDetailsObject) => {

	const updateEvent = database.updateResource(databaseURL, eventsCollection, eventID, newEventDetailsObject)
		.then((event) => event)

	const updateEventResponse = await updateEvent

	return updateEventResponse
}

// Function to delete a event
exports.delete = async(eventID) => {

	const deleteEvent = database.deleteResource(databaseURL, eventsCollection, eventID)

	const deleteEventResponse = await deleteEvent

	return deleteEventResponse
}
