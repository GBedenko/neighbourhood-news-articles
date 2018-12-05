'use strict'

const articlesController = require('../modules/articles-controller')

jest.mock('../modules/articles-and-events-db')

describe('Add articles controller functionality', async() => {

	test('Recieving a new article sends it to the database', async done => {
                
                const response = await articlesController.add({"heading":"Test Heading"})

                expect(response).toBeTruthy()
                
                done()
	})
        
	test('Adding an empty article returns a failed request to the database', async done => {
                
                const addArticleResponse = await articlesController.add({}).then((response) => response)

                expect(addArticleResponse).toEqual(Error('Trying to add an empty object'))
                
                done()
	})
})

describe('Get all articles controller functionality', () => {

        test('Recieving a get request recieves an array response from the database', async done => {
                
                const response = await articlesController.getAll({}, {})
                
                expect(response).toEqual([{"_id": 1234, "name": "Test Resource"}])
                
                done()
	})

        test('GET Request for highest_rated articles', async done => {
                
                const response = await articlesController.getAll({sort: "highest_rated"})
                
                expect(response).toEqual([{"_id": 1234, "name": "Test Resource"}])
                
                done()
	})

        test('GET Request for lowest_rated articles', async done => {
                
                const response = await articlesController.getAll({sort: "lowest_rated"})
                
                expect(response).toEqual([{"_id": 1234, "name": "Test Resource"}])
                
                done()
	})
})

describe('Get one article controller functionality', () => {

	test('Recieving a get request for one article recieves one article response from the database', async done => {
                
                const response = await articlesController.getById("1234")

                expect(response).toEqual({"_id": 1234, "name": "Test Resource"})
                
                done()
	})
        
	test('Requesting the database for a article that doesnt exist returns a failed request from the database', async done => {
                
                const response = await articlesController.getById("6666")

                expect(response).toEqual(Error('Trying to request an object that doesnt exist'))
                
                done()
	})
})

describe('Update article controller functionality', () => {

	test('Recieving a put request for one article recieves a success response from the database', async done => {
                
                const response = await articlesController.update("1234", {"heading":"New Heading"})

                expect(response).toBeTruthy()
                
                done()
	})
        
	test('Updating a article with an empty new article object recieves a failed response from the database', async done => {
                
                const response = await articlesController.update("1234", {})

                expect(response).toEqual(Error('Trying to update an object with an empty object'))
                
                done()
	})
        
	test('Updating a article that doesnt exist recieves a failed response from the database', async done => {
                
                const response = await articlesController.update("6666", {"article":"test article updated"})

                expect(response).toEqual(Error('Trying to request an object that doesnt exist'))
                
                done()
	})
})

describe('Delete article controller functionality', () => {

	test('Recieving a delete request for one article recieves a success response from the database', async done => {
                
                const response = await articlesController.delete("1234")

                expect(response).toBeTruthy()
                
                done()
	})
        
	test('Deleting a article that doesnt exist recieves a failed response from the database', async done => {
                
                const response = await articlesController.delete("6666")

                expect(response).toEqual(Error('Trying to request an object that doesnt exist'))
                
                done()
	})
})