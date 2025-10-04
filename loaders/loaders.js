import DataLoader from "dataloader";
import mongoose from "mongoose";
import { Company, User } from "../database/models.js";

// Loader للشركات
export const companyLoader = new DataLoader(async (companyIds) => {
  const validIds = companyIds.filter((id) => mongoose.Types.ObjectId.isValid(id));
  const companies = await Company.find({ _id: { $in: validIds } });

  return companyIds.map((id) =>
    companies.find((c) => c._id.toString() === id.toString()) || null
  );
});

// Loader للمستخدمين حسب الشركة
export const usersByCompanyLoader = new DataLoader(async (companyIds) => {
  const users = await User.find({ companyId: { $in: companyIds } });

  return companyIds.map((id) =>
    users.filter((u) => u.companyId.toString() === id.toString())
  );
});
