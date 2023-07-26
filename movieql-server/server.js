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
    userId: 2,
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
    userId: 1,
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
    userId: 1,
  },
];

const users = [
  {
    id: 1,
    username: 'test',
    email: 'asdf@asdf.com',
    password: 'asdf',
  },
  {
    id: 2,
    username: 'test2',
    email: 'qwer@qwer.com',
    password: 'qwer',
  },
];

const typeDefs = gql`
  type Query {
    allMovies: [Movie!]!
    allUsers: [User!]!
    movie(id: ID!): Movie
    user(id: ID!): User
  }
  type Mutation {
    addMovie(title: String!, rating: Float!, userId: ID!): Movie
    deleteMovie(id: ID!): Boolean
    updateMovie(id: ID!, rating: Float!): Movie
  }
  type User {
    id: ID!
    username: String!
    email: String!
    password: String!
    nickname: String!
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
    userId: User
  }
`;

const resolvers = {
  Query: {
    allMovies: () => {
      return movies;
    },
    allUsers: () => {
      return users;
    },
    movie: (_, { id }) => {
      return movies.find((movie) => movie.id === parseInt(id));
    },
    user: () => {},
  },
  Mutation: {
    addMovie: (_, { title, rating, userId }) => {
      const newMovie = {
        id: movies.length + 1,
        title,
        rating,
        summary,
        language,
        medium_cover_image,
        genres,
        year,
        userId,
      };
      movies.push(newMovie);
      return newMovie;
    },
    deleteMovie: (_, { id }) => {
      const cleanedMovies = movies.filter((movie) => movie.id !== id);
      if (movies.length > cleanedMovies.length) {
        movies = cleanedMovies;
        return true;
      }
      return false;
    },
    updateMovie: (_, { id, rating }) => {
      const updatedMovie = movies.find((movie) => movie.id === id);
      if (updatedMovie) {
        updatedMovie.rating = rating;
        return updatedMovie;
      }
      return null;
    },
  },
  User: {
    nickname: ({ username }) => {
      return `${username}_guest`;
    },
  },
  Movie: {
    userId: ({ userId }) => {
      return users.find((user) => user.id === userId);
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Running on ${url}`);
});
