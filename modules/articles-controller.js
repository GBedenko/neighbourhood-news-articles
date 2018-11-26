'use strict'

const databaseURL = "mongodb://localhost:27017/articles_and_events_database"
const articlesCollection = "articles"

const database = require('./articles-and-events-db')

// Function to add a new article
exports.add = async(articleObject) => {
    
    const addArticle = database.addResourceToCollection(databaseURL, articlesCollection, articleObject)
                        .then((result) => result)

    const addArticleResponse = await addArticle

    return addArticleResponse
}

// Function to retrieve one article
exports.getById = async(articleId) => {

    const getArticle = database.getResourceFromCollection(databaseURL, articlesCollection, articleId)
                        .then((article) => article)
    
    const article = await getArticle

    return article
}

// Function to retrieve all articles
exports.getAll = async() => {

    // Declare a function which will call the controller for all articles
    // Returns a Promise object with either a resolve or reject value
    const articles = database.getAllFromCollection(databaseURL, articlesCollection)
                    .then((results) => results) // Obtains the result from the Promise object
    
    // Calls the results function, waits for response before continuing
    const articlesResponse = await articles

    // Return the list of articles
    return articlesResponse
}

// Function to retrieve all articles
exports.getByQuery = async(queryObject) => {

    // Declare a function which will call the controller for all articles
    // Returns a Promise object with either a resolve or reject value
    const articles = database.findResourceFromCollection(databaseURL, articlesCollection, queryObject)
                    .then((results) => results) // Obtains the result from the Promise object
    
    // Calls the results function, waits for response before continuing
    const articlesResponse = await articles

    // Return the list of articles
    return articlesResponse
}

// Function to update a article
exports.update = async(articleID, newArticleDetailsObject) => {

    const updateArticle = database.updateResource(databaseURL, articlesCollection, articleID, newArticleDetailsObject)
                            .then((article) => article)

    const updateArticleResponse = await updateArticle

    return updateArticleResponse
}

// Function to delete a article
exports.delete = async(articleID) => {

    const deleteArticle = database.deleteResource(databaseURL, articlesCollection, articleID)
                            .then((article) => article)

    const deleteArticleResponse = await deleteArticle

    return deleteArticleResponse
}
