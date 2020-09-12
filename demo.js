const gql = require("graphql-tag");
const { ApolloServer } = require("apollo-server");

const typeDefs = gql`
  type User {
    email: String!
    avatar: String
    friends: [User]!
  }

  union Footwear = Sneaker | Boot

  enum ShoeType {
    JORDAN
    NIKE
    ADIDAS
  }

  # type Shoe {
  #   brand: ShoeType!
  #   size: Int!
  # }

  interface Shoe {
    brand: ShoeType!
    size: Int!
  }
  type Sneaker implements Shoe {
    brand: ShoeType!
    size: Int!
    sport: String!
  }
  type Boot implements Shoe {
    brand: ShoeType!
    size: Int!
    hasGrip: Boolean!
  }

  input ShoesInput {
    brand: ShoeType
    size: Int
  }

  type Query {
    me: User!
    shoes(input: ShoesInput): [Shoe]!
  }

  input NewShoeInput {
    brand: ShoeType!
    size: Int!
  }

  type Mutation {
    newShoe(input: NewShoeInput!): Shoe!
  }
`;

const resolvers = {
  Query: {
    me() {
      return {
        email: "yoda@masters.com",
        avatar: "http://yoda.png",
      };
    },
    shoes(_, { input }) {
      return [
        { brand: "NIKE", size: 15, sport: "soccer" },
        { brand: "ADIDAS", size: 14, hasGrip: true },
      ];
    },
  },
  Mutation: {
    newShoe(_, { input }) {
      return input;
    },
  },
  Shoe: {
    __resolveType(shoe) {
      if (shoe.sport) return "Sneaker";
      return "Boot";
    },
  },
  Footwear: {
    __resolveType(shoe) {
      if (shoe.sport) return "Sneaker";
      return "Boot";
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen(4000).then(() => console.log("on port 4000"));
