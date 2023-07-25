import { ApolloServer, gql } from 'apollo-server';

// Mutation: 데이터를 추가하거나 삭제하거나 수정하는 등의 DB를 변경하는 작업을 수행하는 것들
const typeDefs = gql`
  type Query {
    allMovies: [Movie]
    movie(id: ID): Movie
    user(id: ID): User
  }
  type Mutation {
    addMovie(title: String!, rating: Float!): Movie
    deleteMovie(id: ID!): Boolean
    updateMovie(id: ID!, rating: Float!): Movie
  }
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
`;
// GET /api/v1/movies <- allMovies
// GET /api/v1/movies/:id <- movie
// GET /api/v1/users/:id <- user

const server = new ApolloServer({ typeDefs });

server.listen().then(({ url }) => {
  console.log(`🚀  Running on ${url}`);
});
