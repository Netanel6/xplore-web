import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("Xplore");

    switch(req.method) {
      case "GET":
        const users = await db.collection("users").find({}).toArray();
        res.status(200).json(users);
        break;
      case "POST":
        const newUser = req.body;
        const result = await db.collection("users").insertOne(newUser); 
        res.status(201).json({ message: "User added successfully", result });
        break;
        default : {
          res.setHeader("Allow", ["GET", "POST"]);
          res.status(405).end(`Method ${req.method} Not Allowed`);
          break;
        }
        
      }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}