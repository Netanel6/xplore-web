// lib/db.js
import clientPromise from "./mongoClient";

/**
 * Connect to the database and return the requested collection
 * @param {string} collectionName - Name of the MongoDB collection
 * @returns {Promise<Collection>} - MongoDB collection instance
 */
export const getCollection = async (collectionName) => {
  const client = await clientPromise;
  const dbName = "Xplore"; // Replace with your actual database name
  console.log(`Connecting to database: ${dbName}, collection: ${collectionName}`);
  const db = client.db(dbName);
  return db.collection(collectionName);
};

/**
 * Find a single document in a collection
 * @param {string} collectionName - Name of the MongoDB collection
 * @param {object} query - MongoDB query
 * @returns {Promise<object|null>} - Single document or null if not found
 */
export const findOne = async (collectionName, query) => {
  console.log(`Finding one document in ${collectionName} with query:`, query);
  const collection = await getCollection(collectionName);
  const result = await collection.findOne(query);
  console.log(`Found document:`, result);
  return result;
};

/**
 * Find multiple documents in a collection
 * @param {string} collectionName - Name of the MongoDB collection
 * @param {object} query - MongoDB query
 * @returns {Promise<object[]>} - Array of documents
 */
export const findMany = async (collectionName, query = {}) => {
  console.log(`Finding documents in ${collectionName} with query:`, query);
  const collection = await getCollection(collectionName);
  const results = await collection.find(query).toArray();
  console.log(`Found documents:`, results);
  return results;
};