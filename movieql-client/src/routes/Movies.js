import { Link } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';

const ALL_MOVIES = gql`
  query getMovies {
    allMovies {
      id
      userId {
        id
        email
        nickname
      }
      title
    }
    allUsers {
      nickname
      email
      id
    }
  }
`;

export default function Movies() {
  const { data, loading, error } = useQuery(ALL_MOVIES);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Something went wrong: {error.message}</div>;
  }

  return (
    <div>
      <p>영화 제목 리스트 - 리뷰어 닉네임</p>
      {data.allMovies.map((movie) => (
        <li key={movie.id}>
          <Link to={`/movies/${movie.id}`}>
            영화제목: {movie.title} - 리뷰어: {movie.userId.nickname}
          </Link>
        </li>
      ))}
      <p>리뷰어 닉네임</p>
      {data.allUsers.map((user) => (
        <li key={user.id}>
          {user.nickname} (email: {user.email})
        </li>
      ))}
    </div>
  );
}
