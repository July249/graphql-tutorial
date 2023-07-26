import { useApolloClient, gql } from '@apollo/client';
import { useState, useEffect } from 'react';

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const client = useApolloClient();

  // 아래의 작업은 fetch로 데이터를 가져오는 것과 같다. => It's suck!
  useEffect(() => {
    client
      .query({
        query: gql`
          {
            allMovies {
              id
              title
            }
          }
        `,
      })
      .then((result) => setMovies(result.data.allMovies));
  }, [client]);

  return (
    <div>
      {movies.map((movie) => (
        <li key={movie.id}>{movie.title}</li>
      ))}
    </div>
  );
}
