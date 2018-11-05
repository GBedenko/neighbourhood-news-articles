const database_url = "mongodb://localhost:27017/events_and_events_database"
const events_collection = "events"

const database = require('./articles-and-events-db')

// Function to add a new event
exports.add = function(eventObject, callback){
    database.addResourceToCollection(database_url, events_collection, eventObject)
    callback()
};

// Function to retrieve one event
exports.getById = function(eventId, callback){
    database.getResourceFromCollection(database_url, events_collection, eventId, function(event) {
        return callback(event)
    })
};

// Function to retrieve all events
exports.getAll = function(err, callback){
    // If there's an error from the function call, exit with error message
    if (err) throw err;

    // Call database to add the new event record to the event collection
    // Once done, pass the events_list result as the parameter to the callback function
    database.getAllFromCollection(database_url, events_collection, function(events_list) {
        return callback(events_list)
    })
};

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