'use strict'

const eventsController = jest.genMockFromModule('../events-controller');

// Mock adding a new event response
eventsController.add = async(eventObject) => {
    
    const response = true

    return response
}

// Mock retrieving one event
eventsController.getById = async(eventID) => {

    const response = {"_id": 1234, title: "Test Title"}

    return response
}

// Mock retrieving all events
eventsController.getAll = async(queryObject) => {

    const response = [{"_id": 1234, "title": "Test Title"}]

    return response
}

// Mock updating a event response
eventsController.update = async(eventID, newEventDetailsObject) => {

    const response = true

    return response
}

// Mock deleting a event response
eventsController.delete = async(eventID) => {

    const response = true

    return response
}

module.exports = eventsController;