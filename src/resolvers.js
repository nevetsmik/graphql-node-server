/**
 * Here are your Resolvers for your Schema. They must match
 * the type definitions in your scheama
 */

module.exports = {
  Query: {
    pets(_, { input }, { models }) {
      return models.Pet.findMany(input);
    },
    pet(_, { input }, { models }) {
      return models.Pet.findOne(input);
    },
  },
  Mutation: {
    newPet(_, { input }, { models }) {
      return models.Pet.create(input);
    },
  },
  Pet: {
    owner(pet, _, ctx) {
      // owner of type Pet is a field level resolver, i.e.,
      // pet argument is the 'parent' node in graph and the owner a child node
      return ctx.models.User.findOne();
    },
    img(pet) {
      return pet.type === "DOG" ? "https://placedog.net/300/300" : "http://placekitten.com/300/300";
    },
  },
  User: {
    pets(user, _, ctx) {
      // only 1 user, so all the pets are owned by the 1 user
      return ctx.models.Pet.findMany();
    },
  },
};
