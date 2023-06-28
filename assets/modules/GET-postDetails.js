async function getpostsDetails() {
  let posts;
  const options = {
    method: "GET",
  };
  try {
    posts = await fetch(`/api/posts`, options);
    // console.log(movies);
    // 패치로 가져온 데이터를 movies에 할당
  } catch (error) {
    alert("오류"); // 오류시 오류알림
  }
  return posts.json(); // 받은 데이터를 json 형식으로 반환
}

async function renderPosts() {
  /* 패치로 가져온 데이터를 찍는 과정 */
  let { data: posts } = await getPosts(); // 객체구조분해할당 방식으로 변수저장을 해줘야한다. getMovie()로 가져온 데이터는 배열이기 때문에 객체로 변환
  console.log(posts); // movies 라는 객체를 받아서 화면에 출력하는 함수
  let html = "";

  posts.map((post) => {
    let htmlSegment = `<div class="item-1">
  <a href="./detail.html" class="card">
    <div
      class="thumb"
      style="
        background-image: url(https://p4.wallpaperbetter.com/wallpaper/416/643/695/cybergirls-cyberpunk-cyber-city-cyber-hd-wallpaper-preview.jpg);
      "
    ></div>
    <article>
      <h1>${post.title}</h1>
      <span>${post.content}</span>
    </article>
  </a>
</div>
`;
    html += htmlSegment;
  });

  let container = document.querySelector(".band");
  container.innerHTML = html;
}

export { renderPosts };
