// Wrapper for mongoose to support promises and stuff
// Don't use this to CRUD users (yet). Passport handles that (for now).

class DbResultError extends Error {
  constructor(message, resultCount) {
    super(message);
    this.message = message;
    this.resultCount = resultCount;
    this.name = 'DbResultError';
  }
}

function insert(collection, doc) {
  // Insert a document 'doc' into mongoose collection
  // Assumes document is valid and doesn't already exist
  let promise = new Promise((resolve, reject) => {
    collection.create(doc, function(err, results) {
      if (err) {
        reject(err);
      } else {
        let response = {
          results: results,
          status: "Inserted new document",
          statusCode: 201
        };
        resolve(response);
      }
    });
  });
  return promise;
}

function get(collection, match) {
  // Get everything matching 'match' from 'collection'
  let promise = new Promise((resolve, reject) => {
    collection.find(match, (err, results) => {

      if (err) { // if there's a problem running the query
        reject(err);

      } else if (!results.length) { // if query comes back empty
        let response = {results: [], count: 0, status: "No results fount", statusCode: 404};
        resolve(response);

      } else { // query comes back with results
        let response = {
          results: results,
          count: results.length,
          status: "OK",
          statusCode: 200
        };
        resolve(response);
      }
    });
  });
  return promise;
}

function getOne(collection, match) {
  // Resolves with exactly one item. Rejects if nothing or > 1 result is found.

  var promise = new Promise(function(resolve, reject) {
    collection.find(match, (err, results) => {

      if (err) { // if there's a problem running the query
        reject(err);

      } else if (results.length == 0) { // no results
        var err = new DbResultError("Zero results found for crud.getOne()", results.length);
        reject(err);

      } else if (results.length > 1) {
        var err = new DbResultError("More than result found for crud.getOne()", results.length);
        reject(err);

      } else if (results.length == 1) { // query comes back with exactly one result
        var response = {
          results: results,
          count: results.length,
          status: "OK",
          statusCode: 200
        };
        resolve(response);

      } else {
        let err = new Error("crud.getOne did something weird");
        reject(err);
      }
    });
  });
  return promise;
}

function getNone(collection, match) {
  // rejects if doc matching 'match' id found in 'collection'
  let promise = new Promise((resolve, reject) => {
    collection.count(match, (err, count) => {
      if (err) {
        reject(err);

      } else if (count != 0) {
        let err = new DbResultError("That document already exists", count);
        reject(err);

      } else if (count == 0) {
        resolve(count);

      } else {
        let err = new Error("crud.getNone did something weird");
        reject(err);
      }
    });
  });
  return promise;
}

function update(collection, match, doc) {
  // overwrites matching document with new data 'doc'
  let promise = new Promise((resolve, reject) => {
    getOne(collection, match)
      .then((results) => {
        collection.update(match, doc, {runValidators: true}, function(err, raw) {
          if (err) {
            reject(err);

          } else if (raw.nModified == 0) {
            let err = new DbResultError("Document not updated", 0);
            reject(err);

          } else if (raw.nModified == 1) {
            let response = {results: raw, count: raw.nModified, status: "OK", statusCode: 200};
            resolve(response);

          } else {
            let err = new Error("There was a problem updating a collection");
            reject(err);
          }
        });
      }).catch((err) => {
        reject(err);
      });
  });
  return promise;
}

function remove(collection, match) {
  // Remove everything matching 'match' from 'collection'
  let promise = new Promise((resolve, reject) => {
    collection.remove(match, (err, results) => {
      if (err) {
        reject(err);
      } else {
        let response = {
          results: results,
          status: "Deleted document(s)",
          statusCode: 200
        };
        resolve(response);
      }
    });
  });
  return promise;
}

function removeOne(collection, match) {
  // Remove a single doc matching 'match' from 'collection'
  let promise = new Promise((resolve, reject) => {
    getOne(collection, match)
    .then((results) => {
      let _id = results.results[0]._id;
      return remove(collection, {_id: _id});
    })
    .then((deleted) => {
      resolve(deleted);
    }).catch((err) => {
      reject(err);
    })
  });
  return promise;
}

exports.insert = insert;
exports.get = get;
exports.getOne = getOne;
exports.getNone = getNone;
exports.update = update;
exports.remove = remove;
exports.removeOne = removeOne;
