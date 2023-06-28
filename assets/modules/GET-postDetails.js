async function getPostDetails() {
  let posts;
  let urlPostId = new URL(location.href).searchParams;
  let postId = urlPostId.get("postId");
  const options = {
    method: "GET",
  };
  try {
    posts = await fetch(`/api/posts/${postId}`, options);
    // console.log(movies);
    // 패치로 가져온 데이터를 movies에 할당
  } catch (error) {
    alert("오류"); // 오류시 오류알림
  }
  return posts.json(); // 받은 데이터를 json 형식으로 반환
}

async function renderPostDetails() {
  /* 패치로 가져온 데이터를 찍는 과정 */
  let { data: posts } = await getPostDetails(); // 객체구조분해할당 방식으로 변수저장을 해줘야한다. getMovie()로 가져온 데이터는 배열이기 때문에 객체로 변환
  console.log(posts); // movies 라는 객체를 받아서 화면에 출력하는 함수
  let html = "";

  html = `<img src="https://dummyimage.com/900x400/ced4da/6c757d.jpg" />
  <h1 class="detailPageTitle">${posts.title}</h1>
  <h2>${posts.User.UserInfo.nickname}</h2>
  <p>
    ${posts.content}
  </p>`;

  let container = document.querySelector("#detail-list");
  container.innerHTML = html;
}

export { renderPostDetails };
