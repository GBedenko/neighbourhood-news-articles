// Import package for mongodb client
const MongoClient = require('mongodb').MongoClient
const mongodb = require('mongodb')

const database_name = "local_new_articles_db"

// Add one resource to provided collection
exports.addResourceToCollection = function(database_url, collection_name, new_resource) {

    console.log("New resource being added to database: " + database_name + ". collection: " + collection_name)

    // Connect to the mongodb database
    // Once done, runs the callback to execute the query to add a new resource to the given collection
    MongoClient.connect(database_url, function(err, db) {

        if (err) throw err;

        let dbo = db.db(database_name);

        dbo.collection(collection_name).insertOne(new_resource, function(err, res) {

          if (err) throw err;
          console.log("Document inserted to mongodb database: " + database_name + ", collection: " + collection_name);
          db.close();
        });
      });
}

exports.getAllFromCollection = function() {
    // Retrieve all resources from a given collection
}

exports.getResourceFromCollection = function() {
    // Retrieve a specific resource from a collection
}

exports.updateResource = function() {
    // Update the given resource
}

exports.deleteResource = function(database_url, collection_name, articleID) {
    // Delete the given resource
}
