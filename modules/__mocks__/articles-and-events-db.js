'use strict' 

const articlesAndEventsDB = jest.genMockFromModule('../articles-and-events-db');

// Mock adding one resource to provided collection
articlesAndEventsDB.addResourceToCollection = (databaseURL, collectionName, newResource) => new Promise((resolve, reject) => {

    resolve(true)
})

// Mock retrieve all resources from a given collection
articlesAndEventsDB.getAllFromCollection = (databaseURL, collectionName) => new Promise((resolve, reject) => {

    resolve([{"_id": 1234 , "heading": "Test Heading"}])
})

// Mock retrieve a specific resource from a collection
articlesAndEventsDB.getResourceFromCollection = (databaseURL, collectionName, resourceID) => new Promise((resolve, reject) => {

    resolve({"_id": 1234, "heading": "Test Heading"})
})


// Mock update a resource with the provided ID and new values object
articlesAndEventsDB.updateResource = (databaseURL, collectionName, resourceID, newValuesObject) => new Promise((resolve, reject) => {
    
    resolve(true)
})

// Mock delete a resource by its given ID
articlesAndEventsDB.deleteResource = (databaseURL, collectionName, resourceID) => new Promise((resolve, reject) => {

    resolve(true)
})

module.exports = articlesAndEventsDB;
