import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLError,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
} from "graphql";
import { CompanyType, UserType } from "./types.js";
import { Company, User } from "../database/models.js";

// Queries
const RootQuery = new GraphQLObjectType({
  name: "Query",
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      async resolve(_, args) {
        const user = await User.findById(args.id);
        if (!user) {
          throw new GraphQLError(`Can't find the user with id (${args.id})`);
        }
        return user;
      },
    },
    users: {
      type: new GraphQLList(UserType),
      async resolve() {
        return await User.find();
      },
    },
    company: {
      type: CompanyType,
      args: { id: { type: GraphQLID } },
      async resolve(_, args) {
        const company = await Company.findById(args.id);
        if (!company) {
          throw new GraphQLError(`Can't find the company with id (${args.id})`);
        }
        return company;
      },
    },
    companies: {
      type: new GraphQLList(CompanyType),
      async resolve() {
        return await Company.find();
      },
    },
  },
});

// Mutations
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addCompany: {
      type: CompanyType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        slogan: { type: GraphQLString },
      },
      async resolve(_, args) {
        const company = new Company(args);
        return await company.save();
      },
    },
    updateCompany: {
      type: CompanyType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        slogan: { type: GraphQLString },
      },
      async resolve(_, args) {
        const company = await Company.findByIdAndUpdate(
          args.id,
          { name: args.name, slogan: args.slogan },
          { new: true }
        );
        if (!company) {
          throw new GraphQLError(`Can't update company with id (${args.id})`);
        }
        return company;
      },
    },
    deleteCompany: {
      type: CompanyType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      async resolve(_, args) {
        const company = await Company.findByIdAndDelete(args.id);
        if (!company) {
          throw new GraphQLError(`Can't delete company with id (${args.id})`);
        }
        return company;
      },
    },
    addUser: {
      type: UserType,
      args: {
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: GraphQLInt },
        companyId: { type: GraphQLID },
      },
      async resolve(_, args) {
        const user = new User(args);
        return await user.save();
      },
    },
    updateUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        firstName: { type: GraphQLString },
        age: { type: GraphQLInt },
        companyId: { type: GraphQLID },
      },
      async resolve(_, args) {
        const user = await User.findByIdAndUpdate(args.id, args, { new: true });
        if (!user) {
          throw new GraphQLError(`Can't update user with id (${args.id})`);
        }
        return user;
      },
    },
    deleteUser: {
      type: UserType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      async resolve(_, args) {
        const user = await User.findByIdAndDelete(args.id);
        if (!user) {
          throw new GraphQLError(`Can't delete user with id (${args.id})`);
        }
        return user;
      },
    },
  },
});

// Export schema
export default new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
