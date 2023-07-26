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

const users = [
  {
    id: 1,
    username: 'test',
    email: 'asdf@asdf.com',
    password: 'asdf',
    // nickname key와 value가 없음!
  },
  {
    id: 2,
    username: 'test2',
    email: 'qwer@qwer.com',
    password: 'qwer',
    // nickname key와 value가 없음!
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
    addMovie(title: String!, rating: Float!): Movie
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
  }
`;

const resolvers = {
  Query: {
    allMovies: () => {
      return movies;
    },
    allUsers: () => {
      console.log('allUsers called'); // (1)
      return users;
    },
    movie: (_, { id }) => {
      return movies.find((movie) => movie.id === parseInt(id));
    },
    user: () => {},
  },
  Mutation: {
    addMovie: (_, { title, rating }) => {
      const newMovie = {
        id: movies.length + 1,
        title,
        rating,
        summary,
        language,
        medium_cover_image,
        genres,
        year,
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
  // Type User에 대한 Resolver
  // typeDef의 type User에만 nickname이 있음
  User: {
    // nickname: (root) => {
    //   console.log('User Nickname called'); // (2)
    //   console.log(root); // (3)
    //   return 'test';
    // },
    nickname: ({ username }) => {
      return `${username}_guest`;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Running on ${url}`);
});
