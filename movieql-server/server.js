import { ApolloServer, gql } from 'apollo-server';

// To solve Error: "Apollo Server requires either an existing schema, modules or typeDefs", we need to define typeDefs
// gql SDL(schema definition language) in backticks
const typeDefs = gql`
  type User {
    id: ID
    username: String
    email: String
    password: String
  }
  type Movie {
    id: ID
    title: String
    rating: Float
    summary: String
    language: String
    medium_cover_image: String
    genres: [String]
    year: String
  }
  type Query {
    allMovies: [Movie]
    movie(id: ID): Movie
    user(id: ID): User
  }
`;

const server = new ApolloServer({ typeDefs });

server.listen().then(({ url }) => {
  console.log(`🚀  Running on ${url}`);
});
