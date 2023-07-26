import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache(),
});

// hook을 사용하지 않고 query 날리는 방법
client
  .query({
    query: gql`
      {
        allMovies {
          id
          medium_cover_image
        }
      }
    `,
  })
  .then((data) => console.log(data));

export default client;
