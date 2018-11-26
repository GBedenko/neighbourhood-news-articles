'use strict'

const databaseURL = "mongodb://localhost:27017/articles_and_events_database"
const eventsCollection = "events"

const database = require('./articles-and-events-db')

// Function to add a new event
exports.add = async(eventObject) => {

    const addEvent = database.addResourceToCollection(databaseURL, eventsCollection, eventObject)
                        .then((result) => result)

    const addEventResponse = await addEvent

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
exports.getAll = async() => {

    const getEvents = database.getAllFromCollection(databaseURL, eventsCollection)
                        .then((events) => events) // Obtains the result from the Promise object

    const events = getEvents

    return events
}

// Function to update a event
exports.update = async(eventID, newEventDetailsObject) => {

    const updateEvent = database.updateResource(databaseURL, eventsCollection, eventID, newEventDetailsObject)
                            .then((article) => article)

    const updateEventResponse = await updateEvent

    return updateEventResponse
}

// Function to delete a event
exports.delete = async(eventID) => {

    const deleteEvent = database.deleteResource(databaseURL, eventsCollection, eventID)

    const deleteEventResponse = await deleteEvent

    return deleteEventResponse
}
