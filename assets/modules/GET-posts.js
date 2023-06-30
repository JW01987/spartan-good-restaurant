async function getPosts() {
  let posts;
  const options = {
    method: 'GET',
  };
  try {
    posts = await fetch(`/api/posts`, options);
    // console.log(movies);
    // 패치로 가져온 데이터를 movies에 할당
  } catch (error) {
    alert('오류'); // 오류시 오류알림
  }
  return posts.json(); // 받은 데이터를 json 형식으로 반환
}

async function renderPosts() {
  /* 패치로 가져온 데이터를 찍는 과정 */
  let { data: posts } = await getPosts(); // 객체구조분해할당 방식으로 변수저장을 해줘야한다. getMovie()로 가져온 데이터는 배열이기 때문에 객체로 변환
  console.log(posts);

  let html = '';

  posts.map((post) => {
    console.log(post.image);
    let imagePath = post.image.replace('assets/', '');
    let image = `http://localhost:3000/${imagePath}`;

    let htmlSegment = `<div class="item-2">
                        <a href="./detail.html?postId=${post.id}" class="card">
                          <div
                            class="thumb"
                            style="
                              background-image: url('${image}');
                            "
                          ></div>
                          <article>
                            <h1>${post.title}</h1>
                            <span>${post.User.UserInfo.nickname}</span>
                            <span>${post.likes}</span>
                          </article>
                        </a>
                      </div>
                      `;
    html += htmlSegment;
  });

  let container = document.querySelector('.band');
  container.innerHTML = html;
}

export { renderPosts };
