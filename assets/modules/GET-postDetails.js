let posts;
let urlPostId = new URL(location.href).searchParams;
let postId = urlPostId.get("postId");

async function getPostDetails() {
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
  let { data: posts } = await getPostDetails(); // 객체구조분해할당 방식으로 변수저장을 해줘야한다. getMovie()로 가져온 데이터는 배열이기 때문에 객체로 변환
  console.log(posts); // movies 라는 객체를 받아서 화면에 출력하는 함수
  let html = "";
  let imagePath = posts.image.replace("assets/", "");
  html = `<div class="card-box">
  <img src= http://localhost:3000/${imagePath} />
  <div class="title-box">
  <h1 class="detailPageTitle">${posts.title}</h1>
  <h2>${posts.User.UserInfo.nickname}</h2>
  <div>
  <p>
    ${posts.content}
  </p>
  <div>`;

  let container = document.querySelector("#detail-list");
  container.innerHTML = html;
}

export { renderPostDetails };
