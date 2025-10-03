import {
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
} from "graphql";
import mongoose from "mongoose";
import { User, Company } from "../database/models.js";

export const CompanyType = new GraphQLObjectType({
  name: "Company",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    slogan: { type: GraphQLString },
    users: {
      type: new GraphQLList(UserType),
      async resolve(parent) {
        return await User.find({ companyId: parent._id });
      },
    },
  }),
});

export const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt },
    company: {
      type: CompanyType,
      async resolve(parent) {
        if (!parent.companyId) return null;
        if (!mongoose.Types.ObjectId.isValid(parent.companyId)) return null;
        return await Company.findById(parent.companyId);
      },
    },
  }),
});
