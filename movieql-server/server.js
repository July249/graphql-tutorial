import { ApolloServer, gql } from 'apollo-server';

// Schema: Query, Mutation
// Query: GET
// Mutation: POST, PUT, DELETE

// GET /api/v1/movies <- allMovies
// GET /api/v1/movies/:id <- movie
// GET /api/v1/users/:id <- user

// !: 필수값
// [String!]!: 배열, 필수값
// [String]: 배열, 필수값 아님 (null 가능)
// String: 필수값 아님 (null 가능)
const typeDefs = gql`
  type Query {
    allMovies: [Movie!]!
    movie(id: ID!): Movie
    user(id: ID!): User
  }
  type Mutation {
    addMovie(title: String!, rating: Float!): Movie
    deleteMovie(id: ID!): Boolean
    updateMovie(id: ID!, rating: Float!): Movie
  }
  type User {
    id: ID!
    username: String!
    email: String!
    password: String!
  }
  type Movie {
    id: ID!
    title: String!
    rating: Float
    summary: String!
    language: String
    medium_cover_image: String
    genres: [String!]!
    year: String!
  }
`;

const server = new ApolloServer({ typeDefs });

server.listen().then(({ url }) => {
  console.log(`🚀  Running on ${url}`);
});
