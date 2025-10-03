import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { graphqlHTTP } from "express-graphql";
import connectDB from "./database/connection.js";
import schema from "./schema/schema.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/welcoming", (req, res) => {
  res.send("Welcome To Express Server!");
});

let x = 0;

app.use(
  "/graphql",
  graphqlHTTP((req, res) => ({
    schema,
    graphiql: true,
    context: { test: x++ },
  }))
);

app.listen(4000, () => {
  console.log("🚀 Server running at: http://localhost:4000/graphql");
});
