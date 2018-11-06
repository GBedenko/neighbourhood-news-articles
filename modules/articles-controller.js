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
exports.getAll = async() => {

    // Call database to add the new article record to the article collection
    // Once done, pass the articles_list result as the parameter to the callback function
    let results = database.getAllFromCollection(database_url, articles_collection)
                    .then((results) => results)
                    .catch((err) => console.log(err))
    
    let final_result = await results
    return final_result
};

// Function to update a article
exports.update = (articleID, newarticleDetailsObject, callback) => {
    database.updateResource(database_url, articles_collection, articleID, newarticleDetailsObject)
    callback()
};

// Function to delete a article
exports.delete = function(articleID, callback){
    database.deleteResource(database_url, articles_collection, articleID)
    callback() 
};