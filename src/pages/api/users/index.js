import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("Xplore"); // Change "Xplore" to your database name

    switch (req.method) {
      case "GET": {
        // Fetch all users or a specific user by phone number
        const { phoneNumber } = req.query;

        if (phoneNumber) {
          const user = await db.collection("users").findOne({ phone_number: phoneNumber });

          if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
          }

          res.status(200).json(user);
        } else {
          // If no phone number provided, return all users (for debugging or testing)
          const users = await db.collection("users").find({}).toArray();
          res.status(200).json(users);
        }
        break;
      }

      case "POST": {
        // Create a new user
        const { name, phone_number, quiz_list } = req.body;

        if (!name || !phone_number || !Array.isArray(quiz_list)) {
          res.status(400).json({ message: "Invalid user data" });
          return;
        }

        const newUser = {
          name,
          phone_number,
          quiz_list,
        };

        const result = await db.collection("users").insertOne(newUser);
        res.status(201).json({ message: "User added successfully", userId: result.insertedId });
        break;
      }

      default: {
        res.setHeader("Allow", ["GET", "POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
        break;
      }
    }
  } catch (error) {
    console.error("Error in /api/users:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}