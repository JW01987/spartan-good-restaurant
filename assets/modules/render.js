// const posts = fetch("localhost:3000/api/posts", { method: "GET" })
// .then((response) =>response.json())
// .then((data)=>console.log(data));

async function getMovies() {
  let movies;
  const options = {
    method: "GET",
  };
  try {
    movies = await fetch((url = `http://localhost:3000/api/posts`), options);
    console.log(movies);
    // 패치로 가져온 데이터를 movies에 할당
  } catch (error) {
    alert("오류"); // 오류시 오류알림
  }
  return movies.json(); // 받은 데이터를 json 형식으로 반환
}

async function renderMovies() {
  /* 패치로 가져온 데이터를 찍는 과정 */
  let { data: movies } = await getMovies(); // 객체구조분해할당 방식으로 변수저장을 해줘야한다. getMovie()로 가져온 데이터는 배열이기 때문에 객체로 변환
  console.log(movies); // movies 라는 객체를 받아서 화면에 출력하는 함수
}

export { renderMovies, getMovies };
