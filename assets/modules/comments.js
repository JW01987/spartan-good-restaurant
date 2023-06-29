let posts;
let urlPostId = new URL(location.href).searchParams;
let postId = urlPostId.get("postId");

async function getComments() {
  let comments;
  let urlPostId = new URL(location.href).searchParams;
  let postId = urlPostId.get("postId");
  const options = {
    method: "GET",
  };
  try {
    comments = await fetch(`/api/posts/${postId}/comments`, options);
    // console.log(movies);
    // 패치로 가져온 데이터를 movies에 할당
  } catch (error) {
    alert("오류"); // 오류시 오류알림
  }
  return comments.json(); // 받은 데이터를 json 형식으로 반환
}

async function renderComments() {
  let { comment: comments } = await getComments(); // 객체구조분해할당 방식으로 변수저장을 해줘야한다. getMovie()로 가져온 데이터는 배열이기 때문에 객체로 변환
  let html = "";

  comments.map((comment) => {
    let htmlSegment = `<div class="mybox" id="${comment.id}">
      <div>이름 : ${comment.userId}</div>
      <div>댓글 : ${comment.content}</div>
      <button class="modify-Btn">수정</button>
      <button class="delete-Btn">삭제</button></br>
      <a>${comment.createdAt}</a>
      </div>`;
    html += htmlSegment;
  });

  const reviewList = document.querySelector(".comments-list");
  reviewList.innerHTML = html;
}

async function saveComments() {
  const content = document.getElementById("input-content").value;
  try {
    const response = await fetch(`/api/posts/${postId}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content,
      }),
    });

    if (response.ok) {
      alert("댓글작성이 완료되었습니다.");
      location.reload();
    } else {
      alert("오류"); // 실패 메시지 표시
    }
  } catch (error) {
    console.error("Error:", error);
  }
  // .then((res) => res.json()) // 이렇게하면 에러메시지 받을 수 있음
  // .then((data) => {

  // });
}

export { renderComments, saveComments };
