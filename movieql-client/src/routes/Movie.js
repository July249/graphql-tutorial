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
      isLiked @client
    }
  }
`;

export default function Movie() {
  const { id } = useParams();
  const {
    data,
    loading,
    error,
    client: { cache },
  } = useQuery(GET_MOVIE, {
    variables: { movieId: id },
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  // console.log(loading); // Data 캐싱을 확인하기 위해 콘솔에 출력

  //
  const handleClick = () => {
    cache.writeFragment({
      id: `Movie:${id}`,
      // 변경하려는 field의 fragment를 작성
      fragment: gql`
        fragment LikeMovie on Movie {
          isLiked
        }
      `,
      data: {
        isLiked: !data.movie.isLiked,
      },
    });
  };

  return (
    <div>
      <h1>영화 제목: {data.movie.title}</h1>
      <button type='button' onClick={handleClick}>
        {data.movie.isLiked ? 'Unlike' : 'Like'}
      </button>
      <h3>리뷰어: {data.movie.userId.nickname}</h3>
      <span style={{ fontSize: 14 }}>영화 언어: {data.movie.language}</span>
      <p>영화 설명: {data.movie.summary}</p>
    </div>
  );
}
