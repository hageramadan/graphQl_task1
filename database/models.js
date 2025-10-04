import mongoose from "mongoose";

const CompanySchema = new mongoose.Schema({
  name: String,
  slogan: String,
});

const UserSchema = new mongoose.Schema({
  firstName: String,
  age: Number,
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
  },
});

export const Company = mongoose.model("Company", CompanySchema);
export const User = mongoose.model("User", UserSchema);
