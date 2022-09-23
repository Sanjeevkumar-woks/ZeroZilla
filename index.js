import express from "express";
import { MongoClient } from "mongodb";
import cors from "cors";
import dotenv from "dotenv";
import { usersRouter } from "./routes/users.js";
import { agencyClientRouter } from "./routes/agencyClient.js";

export const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 9000;
const MONGO_URL =  process.env.MONGO_URL;

async function createConnection() {
  try {
    const client = new MongoClient(MONGO_URL);
    await client.connect();
    console.log("Mongo is connected");
    return client;
  } catch (error) {
    console.log(error);
  }
}

export const client = await createConnection();

app.get("/", (req, res) => {
  res.send('<h1>Welcome to Agency Client Managment Backend APIs 😉</h1>');
});

app.use("/users", usersRouter);
app.use("/agencyClient", agencyClientRouter);

app.listen(PORT, () => console.log(`server running at ${PORT}`));
