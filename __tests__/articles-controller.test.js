'use strict'

const articlesController = require('../modules/articles-controller')

jest.mock('../modules/articles-and-events-db')

describe('Add articles controller functionality', async() => {

	test('Recieving a new article sends it to the database', async done => {

                expect.assertions(1)
                
                const response = await articlesController.add({"heading":"Test Heading"})

                expect(response).toBeTruthy()
                
                done()
	})
})

describe('Get all articles controller functionality', () => {

	test('Recieving a get request recieves an array response from the database', async done => {

        expect.assertions(1)
        
        const response = await articlesController.getAll()
        
        expect(response).toEqual([{"_id": 1234, "heading":"Test Heading"}])
        
        done()
	})
})

describe('Get one article controller functionality', () => {

	test('Recieving a get request for one article recieves one article response from the database', async done => {

        // expect.assertions(1)
        
        const response = await articlesController.getById("1234")

        expect(response).toEqual({"_id": 1234, "heading":"Test Heading"})
        
        done()
	})
})

describe('Update article controller functionality', () => {

	test('Recieving a put request for one article recieves a success response from the database', async done => {

        // expect.assertions(1)
        
        const response = await articlesController.update("1234", {"heading":"New Heading"})

        expect(response).toBeTruthy()
        
        done()
	})
})

describe('Delete article controller functionality', () => {

	test('Recieving a delete request for one article recieves a success response from the database', async done => {

        // expect.assertions(1)
        
        const response = await articlesController.delete("1234")

        expect(response).toBeTruthy()
        
        done()
	})
})