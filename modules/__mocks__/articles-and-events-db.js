const articles_and_events_db = jest.genMockFromModule('../articles-and-events-db');

// Mock adding one resource to provided collection
articles_and_events_db.addResourceToCollection = (database_url, collection_name, new_resource) => new Promise((resolve, reject) => {

    resolve(true)
})

// Mock retrieve all resources from a given collection
articles_and_events_db.getAllFromCollection = (database_url, collection_name) => new Promise((resolve, reject) => {

    resolve([{"_id": 1234 , "heading":"Test Heading"}])
})

// Mock retrieve a specific resource from a collection
articles_and_events_db.getResourceFromCollection = (database_url, collection_name, resource_id) => new Promise((resolve, reject) => {

    resolve({"_id": 1234, "heading":"Test Heading"})
})


// Mock update a resource with the provided ID and new values object
articles_and_events_db.updateResource = (database_url, collection_name, resourceID, new_values_object) => new Promise((resolve, reject) => {
    
    resolve(true)
})

// Mock delete a resource by its given ID
articles_and_events_db.deleteResource = (database_url, collection_name, resourceID) => new Promise((resolve, reject) => {

    resolve(true)
})

module.exports = articles_and_events_db;
