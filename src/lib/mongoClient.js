// lib/mongoClient.js
import { MongoClient } from "mongodb";

// Ensure the MongoDB URI is provided
const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error("Please add your MongoDB URI to .env.local");
}

// Define connection options (adjust based on your setup)
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

let client;
let clientPromise;

// Logging the current environment for debugging purposes
console.log("Initializing MongoDB Client in NODE_ENV:", process.env.NODE_ENV);

if (process.env.NODE_ENV === "development") {
  // Use a global variable to preserve the client in development
  if (!global._mongoClientPromise) {
    console.log("Creating a new MongoDB client for development...");
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // For production, always create a new MongoClient instance
  console.log("Creating a new MongoDB client for production...");
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

// Attach event listeners for debugging connection states
clientPromise
  .then(() => console.log("MongoDB client successfully connected"))
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
    throw err; // Let the application handle connection failures
  });

export default clientPromise;
