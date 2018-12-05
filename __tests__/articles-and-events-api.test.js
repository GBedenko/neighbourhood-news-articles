'use strict'

// Testing endpoints requries supertest package
const request = require("supertest");

const articlesAndEventsAPI = require('../articles-and-events-api')

jest.mock('../modules/articles-controller')
jest.mock('../modules/events-controller')

// Test GET /articles
describe('GET /articles endpoint', async() => {

    afterEach(() => {
        articlesAndEventsAPI.close()
    });

    // Test that a request recieves the correct status code
	test('Requesting all articles returns a 200 status code', async done => {

        const response = await request(articlesAndEventsAPI).get("/api/v1.0/articles")

        expect(response.status).toEqual(200)

        done()
    })    

    // Test that the request recieves the correct JSON response
	test('Requesting all articles returns a json object', async done => {

        const response = await request(articlesAndEventsAPI).get("/api/v1.0/articles");

        expect(response.body).toEqual([{"_id": 1234, "heading": "Test Heading"}])

        done()
	})  

	test('Requesting all articles with a query returns an array of objects', async done => {

        const response = await request(articlesAndEventsAPI).get("/api/v1.0/articles").send({"heading": "Queried Heading"});

        expect(response.body).toEqual([{"_id": 2345, "heading": "Queried Heading"}])

        done()
	})
})

// Test GET /articles/:article_id
describe('GET /articles/:article_id endpoint', async() => {

    afterEach(() => {
        articlesAndEventsAPI.close()
    });

    // Test that a request recieves the correct status code
	test('Requesting an article returns a 200 status code', async done => {

        const response = await request(articlesAndEventsAPI).get("/api/v1.0/articles/123")

        expect(response.status).toEqual(200)

        done()
    })    

    // Test that the request recieves the correct JSON response
	test('Requesting an article returns a json object', async done => {

        const response = await request(articlesAndEventsAPI).get("/api/v1.0/articles/123");

        expect(response.body).toEqual({"_id": 1234, "heading": "Test Heading"})

        done()
	})

	test('Requesting an article that doesnt exist returns an empty object', async done => {

        const response = await request(articlesAndEventsAPI).get("/api/v1.0/articles/6666");

        expect(response.body).toEqual({})

        done()
	})
})

// Test POST /articles
describe('POST /articles endpoint', async() => {

    afterEach(() => {
        articlesAndEventsAPI.close()
    });

    // Test that a request recieves the correct status code
	test('Sending a new article returns a 201 status code', async done => {

        const response = await request(articlesAndEventsAPI).post("/api/v1.0/articles").send({"_id": 1234, "heading": "Test Heading"})

        expect(response.status).toEqual(201)

        done()
    })    

    // Test that the request recieves the correct JSON response
	test('Sending a new article returns the correct json response object', async done => {

        const response = await request(articlesAndEventsAPI).post("/api/v1.0/articles").send({"_id": 1234, "heading": "Test Heading"})

        expect(response.body).toEqual({"status": "success", "articleAddedSuccessfully": true})

        done()
	})    

	test('Sending an empty article returns a failed post request', async done => {

        const response = await request(articlesAndEventsAPI).post("/api/v1.0/articles").send({})

        expect(response.body).toEqual({"status": "fail", "articleAddedSuccessfully": false})

        done()
	})
})

// Test PUT /articles/:article_id
describe('PUT /articles/:article_id endpoint', async() => {

    afterEach(() => {
        articlesAndEventsAPI.close()
    });

    // Test that a request recieves the correct status code
	test('Updating a article returns a 201 status code', async done => {

        const response = await request(articlesAndEventsAPI).put("/api/v1.0/articles/1234").send({"_id": 1234, "heading": "Updated Heading"})

        expect(response.status).toEqual(201)

        done()
    })    

    // Test that the request recieves the correct JSON response
	test('Updating a article returns the correct json response object', async done => {

        const response = await request(articlesAndEventsAPI).put("/api/v1.0/articles/1234").send({"_id": 1234, "heading": "Updated Heading"})

        expect(response.body).toEqual({"status": "success", "articleUpdatedSuccessfully": true})

        done()
	}) 

	test('Updating a article with an empty new object recieves a failed put request', async done => {

        const response = await request(articlesAndEventsAPI).put("/api/v1.0/articles/1234").send({})

        expect(response.body).toEqual({"status": "fail", "articleUpdatedSuccessfully": false})

        done()
	})
})

// Test DELETE /articles/:article_id
describe('DELETE /articles/:article_id endpoint', async() => {

    afterEach(() => {
        articlesAndEventsAPI.close()
    });

    // Test that a request recieves the correct status code
	test('Deleting a article returns a 200 status code', async done => {

        const response = await request(articlesAndEventsAPI).del("/api/v1.0/articles/1234")

        expect(response.status).toEqual(200)

        done()
    })    

    // Test that the request recieves the correct JSON response
	test('Deleting a article returns the correct json response object', async done => {

        const response = await request(articlesAndEventsAPI).del("/api/v1.0/articles/1234")

        expect(response.body).toEqual({"status": "success", "articleDeletedSuccessfully": true})

        done()
    })

	test('Deleting a article that doesnt exist returns a failed delete request', async done => {

        const response = await request(articlesAndEventsAPI).del("/api/v1.0/articles/6666")

        expect(response.body).toEqual({"status": "fail", "articleDeletedSuccessfully": false})

        done()
    })
})

// Test GET /events
describe('GET /events endpoint', async() => {

    afterEach(() => {
        articlesAndEventsAPI.close()
    });

    // Test that a request recieves the correct status code
	test('Requesting all events returns a 200 status code', async done => {

        const response = await request(articlesAndEventsAPI).get("/api/v1.0/events")

        expect(response.status).toEqual(200)

        done()
    })    

    // Test that the request recieves the correct JSON response
	test('Requesting all events returns a json object', async done => {

        const response = await request(articlesAndEventsAPI).get("/api/v1.0/events");

        expect(response.body).toEqual([{"_id": 1234, "title": "Test Title"}])

        done()
	})    

	test('Requesting all events with a query returns an array of objects', async done => {

        const response = await request(articlesAndEventsAPI).get("/api/v1.0/events").send({"title": "Queried Title"});

        expect(response.body).toEqual([{"_id": 2345, "title": "Queried Title"}])

        done()
	})
})

// Test GET /events/:event_id
describe('GET /events/:event_id endpoint', async() => {

    afterEach(() => {
        articlesAndEventsAPI.close()
    });

    // Test that a request recieves the correct status code
	test('Requesting a event returns a 200 status code', async done => {

        const response = await request(articlesAndEventsAPI).get("/api/v1.0/events/123")

        expect(response.status).toEqual(200)

        done()
    })    

    // Test that the request recieves the correct JSON response
	test('Requesting a event returns a json object', async done => {

        const response = await request(articlesAndEventsAPI).get("/api/v1.0/events/123");

        expect(response.body).toEqual({"_id": 1234, "title": "Test Title"})

        done()
	})

	test('Requesting a event that doesnt exist returns an empty object', async done => {

        const response = await request(articlesAndEventsAPI).get("/api/v1.0/events/6666");

        expect(response.body).toEqual({})

        done()
	})
})

// Test POST /events
describe('POST /events endpoint', async() => {

    afterEach(() => {
        articlesAndEventsAPI.close()
    });

    // Test that a request recieves the correct status code
	test('Sending a new event returns a 201 status code', async done => {

        const response = await request(articlesAndEventsAPI).post("/api/v1.0/events").send({"_id": 1234, "title": "Test Title"})

        expect(response.status).toEqual(201)

        done()
    })    

    // Test that the request recieves the correct JSON response
	test('Sending a new event returns the correct json response object', async done => {

        const response = await request(articlesAndEventsAPI).post("/api/v1.0/events").send({"_id": 1234, "title": "Test Title"})

        expect(response.body).toEqual({"status": "success", "eventAddedSuccessfully": true})

        done()
	})  

	test('Sending an empty event returns a failed post request', async done => {

        const response = await request(articlesAndEventsAPI).post("/api/v1.0/events").send({})

        expect(response.body).toEqual({"status": "fail", "eventAddedSuccessfully": false})

        done()
	})
})

// Test PUT /events/:event_id
describe('PUT /events/:event_id endpoint', async() => {

    afterEach(() => {
        articlesAndEventsAPI.close()
    });

    // Test that a request recieves the correct status code
	test('Updating a event returns a 201 status code', async done => {

        const response = await request(articlesAndEventsAPI).put("/api/v1.0/events/1234").send({"_id": 1234, "title": "Test Title"})

        expect(response.status).toEqual(201)

        done()
    })    

    // Test that the request recieves the correct JSON response
	test('Updating a event returns the correct json response object', async done => {

        const response = await request(articlesAndEventsAPI).put("/api/v1.0/events/1234").send({"_id": 1234, "title": "Test Title"})

        expect(response.body).toEqual({"status": "success", "eventUpdatedSuccessfully": true})

        done()
	}) 

	test('Updating a event with an empty new object recieves a failed put request', async done => {

        const response = await request(articlesAndEventsAPI).put("/api/v1.0/events/1234").send({})

        expect(response.body).toEqual({"status": "fail", "eventUpdatedSuccessfully": false})

        done()
	})
})

// Test DELETE /events/:event_id
describe('DELETE /events/:event_id endpoint', async() => {

    afterEach(() => {
        articlesAndEventsAPI.close()
    });

    // Test that a request recieves the correct status code
	test('Deleting a event returns a 200 status code', async done => {

        const response = await request(articlesAndEventsAPI).del("/api/v1.0/events/1234")

        expect(response.status).toEqual(200)

        done()
    })    

    // Test that the request recieves the correct JSON response
	test('Deleting a event returns the correct json response object', async done => {

        const response = await request(articlesAndEventsAPI).del("/api/v1.0/events/1234")

        expect(response.body).toEqual({"status": "success", "eventDeletedSuccessfully": true})

        done()
    })

	test('Deleting a event that doesnt exist returns a failed delete request', async done => {

        const response = await request(articlesAndEventsAPI).del("/api/v1.0/events/6666")

        expect(response.body).toEqual({"status": "fail", "eventDeletedSuccessfully": false})

        done()
    })
})
