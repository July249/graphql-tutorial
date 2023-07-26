import { ApolloServer, gql } from 'apollo-server';

const movies = [
  {
    id: 1,
    title: 'Hello',
    rating: 4.5,
    summary: 'lorem ipsum',
    language: 'English',
    medium_cover_image:
      'https://yts.mx/assets/images/movies/avengers_endgame_2019/medium-cover.jpg',
    genres: ['Thriller', 'Action'],
    year: '2019',
  },
  {
    id: 2,
    title: 'Hello 2',
    rating: 4.5,
    summary: 'lorem ipsum',
    language: 'English',
    medium_cover_image:
      'https://yts.mx/assets/images/movies/avengers_endgame_2019/medium-cover.jpg',
    genres: ['Romance'],
    year: '2019',
  },
  {
    id: 3,
    title: 'Hello 3',
    rating: 4.5,
    summary: 'lorem ipsum',
    language: 'English',
    medium_cover_image:
      'https://yts.mx/assets/images/movies/avengers_endgame_2019/medium-cover.jpg',
    genres: ['Science Fiction', 'Action'],
    year: '2019',
  },
];

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

const resolvers = {
  Query: {
    allMovies: () => {
      console.log('allMovies');
      return movies;
    },
    movie: (_, { id }) => {
      return movies.find((movie) => movie.id === parseInt(id));
    },
    user: () => {},
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Running on ${url}`);
});
