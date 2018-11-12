// Mock adding one resource to provided collection
exports.addResourceToCollection = (database_url, collection_name, new_resource) => new Promise((resolve, reject) => {

    resolve(true)
})

// Mock retrieve all resources from a given collection
exports.getAllFromCollection = (database_url, collection_name) => new Promise((resolve, reject) => {

    resolve([{"_id": "1234" , "heading":"Test Heading"}])
})

// Mock retrieve a specific resource from a collection
exports.getResourceFromCollection = (database_url, collection_name, resource_id) => new Promise((resolve, reject) => {

    resolve({"_id": "1234", "heading":"Test Heading"})
})


// Mock update a resource with the provided ID and new values object
exports.updateResource = (database_url, collection_name, resourceID, new_values_object) => new Promise((resolve, reject) => {
    
    resolve(true)
})

// Mock delete a resource by its given ID
exports.deleteResource = (database_url, collection_name, resourceID) => new Promise((resolve, reject) => {

    resolve(true)
})
