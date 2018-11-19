'use strict'

const databaseURL = "mongodb://localhost:27017/articles_and_events_database"
const eventsCollection = "events"

const database = require('./articles-and-events-db')

// Function to add a new event
exports.add = async(eventObject) => {

    const addEvent = database.addResourceToCollection(databaseURL, eventsCollection, eventObject)
                        .then((result) => result)
                        .catch((err) => console.log(err))

    const addEventResponse = await addEvent

    return addEventResponse
}

// Function to retrieve one event
exports.getById = async(eventId) => {

    const getEvent = database.getResourceFromCollection(databaseURL, eventsCollection, eventId)
                        .then((event) => event)
                        .catch((err) => console.log(err))

    const event = await getEvent

    return event
}

// Function to retrieve all events
exports.getAll = async() => {

    const getEvents = database.getAllFromCollection(databaseURL, eventsCollection)
                        .then((events) => events) // Obtains the result from the Promise object
                        .catch((err) => console.log(err)) // If the result was an error then handle the error

    const events = getEvents

    return events
}

// Function to retrieve all articles
exports.getByQuery = async(queryObject) => {

    // Declare a function which will call the controller for all articles
    // Returns a Promise object with either a resolve or reject value
    const events = database.findResourceFromCollection(databaseURL, eventsCollection, queryObject)
                    .then((results) => results) // Obtains the result from the Promise object
    
    // Calls the results function, waits for response before continuing
    const eventsResponse = await events

    return eventsResponse
}

// Function to update a event
exports.update = async(eventID, newEventDetailsObject) => {

    const updateEvent = database.updateResource(databaseURL, eventsCollection, eventID, newEventDetailsObject)
                            .then((article) => article)
                            .catch((err) => console.log(err))

    const updateEventResponse = await updateEvent

    return updateEventResponse
}

// Function to delete a event
exports.delete = async(eventID) => {

    const deleteEvent = database.deleteResource(databaseURL, eventsCollection, eventID)

    const deleteEventResponse = await deleteEvent

    return deleteEventResponse
}
