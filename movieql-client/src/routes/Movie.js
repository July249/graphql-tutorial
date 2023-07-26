import { useParams } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';

const GET_MOVIE = gql`
  query getMovie($movieId: ID!) {
    movie(id: $movieId) {
      id
      title
      summary
      language
      userId {
        id
        nickname
        email
      }
    }
  }
`;

export default function Movie() {
  const { id } = useParams();

  const { data, loading, error } = useQuery(GET_MOVIE, {
    variables: { movieId: id },
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  console.log(loading);

  return (
    <div>
      <h1>영화 제목: {data.movie.title}</h1>
      <h3>리뷰어: {data.movie.userId.nickname}</h3>
      <span style={{ fontSize: 14 }}>영화 언어: {data.movie.language}</span>
      <p>영화 설명: {data.movie.summary}</p>
    </div>
  );
}
