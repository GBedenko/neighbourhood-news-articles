const database_url = "mongodb://localhost:27017/articles_and_events_database"
const articles_collection = "articles"

const database = require('./articles-and-events-db')

// Function to add a new article
exports.add = async(articleObject) => {
    
    let addArticle = database.addResourceToCollection(database_url, articles_collection, articleObject)
                        .then((result) => result)
                        .catch((err) => console.log(err))

    let addArticleResponse = await addArticle

    return addArticleResponse
}

// Function to retrieve one article
exports.getById = async(articleId) => {

    let getArticle = database.getResourceFromCollection(database_url, articles_collection, articleId)
                        .then((article) => article)
                        .catch((err) => console.log(err))
    
    let article = await getArticle

    return article
}

// Function to retrieve all articles
exports.getAll = async() => {

    // Declare a function which will call the controller for all articles
    // Returns a Promise object with either a resolve or reject value
    let results = database.getAllFromCollection(database_url, articles_collection)
                    .then((results) => results) // Obtains the result from the Promise object
                    .catch((err) => console.log(err)) // If the result was an error then handle the error
    
    // Calls the results function, waits for response before continuing
    let final_result = await results

    // Return the list of articles
    return final_result
}

// Function to update a article
exports.update = async(articleID, newarticleDetailsObject) => {

    let updateArticle = database.updateResource(database_url, articles_collection, articleID, newarticleDetailsObject)
                            .then((article) => article)
                            .catch((err) => console.log(err))

    let updateArticleResponse = await updateArticle

    return updateArticleResponse
}

// Function to delete a article
exports.delete = async(articleID) => {

    let deleteArticle = database.deleteResource(database_url, articles_collection, articleID)
                            .then((article) => article)
                            .catch((err) => console.log(err))

    let deleteArticleResponse = await deleteArticle

    return deleteArticleResponse
}