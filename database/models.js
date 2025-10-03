import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
  name: String,
  slogan: String,
});

const userSchema = new mongoose.Schema({
  firstName: String,
  age: Number,
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    default: null,
  },
});

export const Company = mongoose.model("Company", companySchema);
export const User = mongoose.model("User", userSchema);
