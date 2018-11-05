const database_url = "mongodb://localhost:27017/articles_and_events_database"
const articles_collection = "articles"

const database = require('./articles-and-events-db')

// Function to add a new article
exports.add = function(articleObject, callback){
    database.addResourceToCollection(database_url, articles_collection, articleObject)
    callback()
};

// Function to retrieve one article
exports.getById = function(articleId, callback){
    database.getResourceFromCollection(database_url, articles_collection, articleId, function(article) {
        return callback(article)
    })
};

// Function to retrieve all articles
exports.getAll = function(err, callback){
    // If there's an error from the function call, exit with error message
    if (err) throw err;

    // Call database to add the new article record to the article collection
    // Once done, pass the articles_list result as the parameter to the callback function
    database.getAllFromCollection(database_url, articles_collection, function(articles_list) {
        return callback(articles_list)
    })
};

// Function to update a article
exports.update = function(articleID, newarticleDetailsObject, callback){
    database.updateResource(database_url, articles_collection, articleID, newarticleDetailsObject)
    callback()
};

// Function to delete a article
exports.delete = function(articleID, callback){
    database.deleteResource(database_url, articles_collection, articleID)
    callback() 
};