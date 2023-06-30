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
  let { data: posts } = await getPostDetails();
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

//  게시물 수정
async function modifyPosts(e) {
  // 게시물 수정시
  if (e.target.id == "post-modify") {
    let { data: posts } = await getPostDetails();
    console.log(posts);
    const modifyBox = document.getElementById(e.target.parentElement.id);
    modifyBox.innerHTML = `
    <div>닉네임 : ${posts.User.UserInfo.nickname}</div>
    <div><a>수정할 제목</a><input class='modifyTitle' value='${posts.title}'></div>
  <div><a>수정할 내용</a><input class='modifyContent' value='${posts.content}'></div>
  <button class="modify-Btn" id='modifyVerify'>확인</button>
  <button class="cancel-Btn" id='cancel'>취소</button>`;

    // 확인버튼 눌렀을때
    const modifyVerifyBtn = document.getElementById("modifyVerify");
    modifyVerifyBtn.addEventListener("click", () => {
      let modifyTitle = document.querySelector(".modifyTitle").value;
      let modifyContent = document.querySelector(".modifyContent").value;

      fetch(`/api/posts/${postId}}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: modifyTitle,
          content: modifyContent,
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          if (data.message) {
            alert(data.message);
            return location.reload();
          } else if (data.errorMessage) {
            alert(data.errorMessage);
            return location.reload();
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("삭제 오류입니다.");
        });
    });
    // 취소 버튼 눌렀을 때
    const cancelBtn = document.getElementById("cancel");
    cancelBtn.addEventListener("click", () => {
      alert("수정취소");
      window.location.reload();
    });
    // 댓글 삭제시
  } else if (e.target.id == "post-delete") {
    {
      let { data: posts } = await getPostDetails();
      console.log(posts);
      const deletebox = document.getElementById(e.target.parentElement.id);
      deletebox.innerHTML = `
          <div>닉네임 : ${posts.User.UserInfo.nickname}</div>
      <div><a>content : ${posts.content}</a></div>
      <button id='deleteVerify'>정말 삭제하시겠습니까?</button>
      <button class="cancel-Btn" id='cancel'>취소</button>`;

      // 확인버튼 눌렀을때
      const deleteVerifyBtn = document.getElementById("deleteVerify");
      deleteVerifyBtn.addEventListener("click", () => {
        fetch(`/api/posts/${postId}}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            if (data.message) {
              alert(data.message);
              return location.replace("http://localhost:3000");
            } else if (data.errorMessage) {
              alert(data.errorMessage);
              return location.reload();
            }
          })
          .catch((error) => {
            console.error("Error:", error);
            alert("삭제 오류입니다.");
          });
      });
      // 취소 버튼 눌렀을 때
      const cancelBtn = document.getElementById("cancel");
      cancelBtn.addEventListener("click", () => {
        alert("삭제취소");
        window.location.reload();
      });
    }
  }
}

export { renderPostDetails, modifyPosts };
