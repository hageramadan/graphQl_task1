import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { graphqlHTTP } from "express-graphql";

import schema from "./schema/schema.js";
import { companyLoader, usersByCompanyLoader } from "./loaders/loaders.js";

// اتصال بقاعدة البيانات
await mongoose.connect("mongodb://127.0.0.1:27017/graphql_test");
console.log("✅ MongoDB connected");

// إنشاء السيرفر
const app = express();
app.use(cors());
app.use(express.json());

// Route ترحيبي بسيط
app.get("/welcoming", (req, res) => {
  res.send("Welcome To Express Server!");
});

// GraphQL endpoint
app.use(
  "/graphql",
  graphqlHTTP((req, res) => ({
    schema,
    graphiql: true,
    context: {
      companyLoader,        // نفس الـ loaders
      usersByCompanyLoader, // نفس الـ loaders
    },
  }))
);

// تشغيل السيرفر
app.listen(4000, () => {
  console.log("🚀 Server ready at http://localhost:4000/graphql");
});
