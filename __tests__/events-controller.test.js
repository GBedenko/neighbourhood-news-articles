'use strict'

const eventsController = require('../modules/events-controller')

jest.mock('../modules/articles-and-events-db')

describe('Add events controller functionality', async() => {

	test('Recieving a new event sends it to the database', async done => {
                
                const response = await eventsController.add({"title":"Test Title"})

                expect(response).toBeTruthy()
                
                done()
	})
        
	test('Adding an empty event returns a failed request to the database', async done => {
                
                const addEventResponse = await eventsController.add({}).then((response) => response)

                expect(addEventResponse).toEqual(Error('Trying to add an empty object'))
                
                done()
	})
})

describe('Get all events controller functionality', () => {

        test('Recieving a get request recieves an array response from the database', async done => {

                expect.assertions(1)
                
                const response = await eventsController.getAll({}, {})
                
                expect(response).toEqual([{"_id": 1234, "name": "Test Resource"}])
                
                done()
	})

        test('GET Request for highest_rated events', async done => {

                expect.assertions(1)
                
                const response = await eventsController.getAll({sort: "highest_rated"})
                
                expect(response).toEqual([{"_id": 1234, "name": "Test Resource"}])
                
                done()
	})

        test('GET Request for lowest_rated events', async done => {

                expect.assertions(1)
                
                const response = await eventsController.getAll({sort: "lowest_rated"})
                
                expect(response).toEqual([{"_id": 1234, "name": "Test Resource"}])
                
                done()
	})
})

describe('Get one event controller functionality', () => {

	test('Recieving a get request for one event recieves one event response from the database', async done => {

                expect.assertions(1)
                
                const response = await eventsController.getById("1234")

                expect(response).toEqual({"_id": 1234, "name": "Test Resource"})
                
                done()
	})
        
	test('Requesting the database for a event that doesnt exist returns a failed request from the database', async done => {
                
                const response = await eventsController.getById("6666")

                expect(response).toEqual(Error('Trying to request an object that doesnt exist'))
                
                done()
	})
})

describe('Update event controller functionality', () => {

	test('Recieving a put request for one event recieves a success response from the database', async done => {

                expect.assertions(1)
                
                const response = await eventsController.update("1234", {"title":"Test Title"})

                expect(response).toBeTruthy()
                
                done()
	})
        
	test('Updating a event with an empty new event object recieves a failed response from the database', async done => {
                
                const response = await eventsController.update("1234", {})

                expect(response).toEqual(Error('Trying to update an object with an empty object'))
                
                done()
	})
        
	test('Updating a event that doesnt exist recieves a failed response from the database', async done => {
                
                const response = await eventsController.update("6666", {"event":"test event updated"})

                expect(response).toEqual(Error('Trying to request an object that doesnt exist'))
                
                done()
	})
})

describe('Delete event controller functionality', () => {

	test('Recieving a delete request for one event recieves a success response from the database', async done => {

                expect.assertions(1)
                
                const response = await eventsController.delete("1234")

                expect(response).toBeTruthy()
                
                done()
	})
        
	test('Deleting a event that doesnt exist recieves a failed response from the database', async done => {
                
                const response = await eventsController.delete("6666")

                expect(response).toEqual(Error('Trying to request an object that doesnt exist'))
                
                done()
	})
})