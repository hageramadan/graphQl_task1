import {
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
} from "graphql";
import mongoose from "mongoose";
import { Company, User } from "../database/models.js";

export const CompanyType = new GraphQLObjectType({
  name: "Company",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    slogan: { type: GraphQLString },
    users: {
      type: new GraphQLList(UserType),
      async resolve(parent, args, context) {
        return await context.usersByCompanyLoader.load(parent._id.toString());
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
      async resolve(parent, args, context) {
        if (!parent.companyId) return null;
        if (!mongoose.Types.ObjectId.isValid(parent.companyId)) return null;
        return await context.companyLoader.load(parent.companyId.toString());
      },
    },
  }),
});
