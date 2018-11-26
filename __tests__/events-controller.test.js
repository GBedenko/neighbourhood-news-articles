'use strict'

const eventsController = require('../modules/events-controller')

jest.mock('../modules/articles-and-events-db')

describe('Add events controller functionality', async() => {

	test('Recieving a new event sends it to the database', async done => {

                expect.assertions(1)
                
                const response = await eventsController.add({"title":"Test Title"})

                expect(response).toBeTruthy()
                
                done()
	})
})

describe('Get all events controller functionality', () => {

        test('Recieving a get request recieves an array response from the database', async done => {

                expect.assertions(1)
                
                const response = await eventsController.getAll()
                
                expect(response).toEqual([{"_id": 1234, "name": "Test Resource"}])
                
                done()
	})
})

describe('Get one event controller functionality', () => {

	test('Recieving a get request for one event recieves one event response from the database', async done => {

                // expect.assertions(1)
                
                const response = await eventsController.getById("1234")

                expect(response).toEqual({"_id": 1234, "name": "Test Resource"})
                
                done()
	})
})

describe('Update event controller functionality', () => {

	test('Recieving a put request for one event recieves a success response from the database', async done => {

                // expect.assertions(1)
                
                const response = await eventsController.update("1234", {"title":"Test Title"})

                expect(response).toBeTruthy()
                
                done()
	})
})

describe('Delete event controller functionality', () => {

	test('Recieving a delete request for one event recieves a success response from the database', async done => {

                // expect.assertions(1)
                
                const response = await eventsController.delete("1234")

                expect(response).toBeTruthy()
                
                done()
	})
})