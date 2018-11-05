// Import package for mongodb client
const MongoClient = require('mongodb').MongoClient
const mongodb = require('mongodb')

const database_name = "local_new_articles_and_events_db"

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

// Update a resource with the provided ID and new values object
exports.updateResource = function(database_url, collection_name, resourceID, new_values_object) {

    // Connect to the mongodb database
    // Once done, runs the callback to execute the query to update the resource matching the id
    MongoClient.connect(database_url, function(err, db) {

        if (err) throw err
        let dbo = db.db(database_name)

        dbo.collection(collection_name).updateOne({_id: new mongodb.ObjectID(resourceID)}, {$set:new_values_object}, function(err, res) {
          if (err) throw err;
          console.log("Resource with id " + resourceID + " has been updated");
          db.close();
        });
    });

}

// Delete a resource by its given ID
exports.deleteResource = function(database_url, collection_name, resourceID) {

    // Connect to the mongodb database
    // Once done, runs the callback to execute the query to delete one resource matching the id
    MongoClient.connect(database_url, function(err, db) {

        if (err) throw err;
        let dbo = db.db(database_name);

        dbo.collection(collection_name).deleteOne({_id: new mongodb.ObjectID(resourceID)}, function(err, obj) {
          if (err) throw err;
          console.log("Resource with id " + resourceID + " has been deleted");
          db.close();
        });
      });
}
