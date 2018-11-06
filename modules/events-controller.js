const database_url = "mongodb://localhost:27017/events_and_events_database"
const events_collection = "events"

const database = require('./articles-and-events-db')

// Function to add a new event
exports.add = async(eventObject) => {

    let addEvent = database.addResourceToCollection(database_url, events_collection, eventObject)
                        .then((result) => result)
                        .catch((err) => console.log(err))

    let addEventResponse = await addEvent

    return addEventResponse
}

// Function to retrieve one event
exports.getById = async(eventId) => {

    let getEvent = database.getResourceFromCollection(database_url, events_collection, eventId)
                        .then((event) => event)
                        .catch((err) => console.log(err))

    let event = await getEvent

    return event
}

// Function to retrieve all events
exports.getAll = async() => {

    let getEvents = database.getAllFromCollection(database_url, events_collection)
                        .then((events) => events) // Obtains the result from the Promise object
                        .catch((err) => console.log(err)) // If the result was an error then handle the error

    let events = getEvents

    return events
}






// Function to update a event
exports.update = function(eventID, newEventDetailsObject, callback){
    database.updateResource(database_url, events_collection, eventID, newEventDetailsObject)
    callback()
};

// Function to delete a event
exports.delete = function(eventID, callback){
    database.deleteResource(database_url, events_collection, eventID)
    callback() 
};