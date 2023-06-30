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
  let { comment: comments } = await getComments();
  let html = "";

  comments.map((comment) => {
    let htmlSegment = `<div class="mybox" id="${comment.id}">
      <div>이름 : ${comment.User.UserInfo.nickname}</div>
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

//  댓글 수정
async function modifyComments(e) {
  // 댓글 수정시
  if (e.target.classList.contains("modify-Btn")) {
    let { comment: comments } = await getComments();
    let currentComment = comments.filter(
      (comment) => comment.id == e.target.parentElement.id
    );
    //
    const modifybox = document.getElementById(e.target.parentElement.id);
    modifybox.innerHTML = `
    <div>닉네임 : ${currentComment[0].User.UserInfo.nickname}</div>
  <div><a>수정할 내용</a><input class='modifyContent' value='${currentComment[0].content}'></div>
  <button class="modify-Btn" id='verify'>확인</button>
  <button class="cancel-Btn" id='cancel'>취소</button>`;

    // 확인버튼 눌렀을때
    const verifyBtn = document.getElementById("verify");
    verifyBtn.addEventListener("click", () => {
      let reviewContent = document.querySelector(".modifyContent").value;
      if (!reviewContent) {
        alert("내용입력해주세요");
        return;
      }
      fetch(`/api/posts/${postId}/comments/${currentComment[0].id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: reviewContent,
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
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
          alert("수정 오류입니다.");
        });
    });
    // 취소 버튼 눌렀을 때
    const cancelBtn = document.getElementById("cancel");
    cancelBtn.addEventListener("click", () => {
      alert("수정취소");
      window.location.reload();
    });
    // 댓글 삭제시
  } else if (e.target.classList.contains("delete-Btn")) {
    {
      // console.log(e.target.parentElement.id);
      // console.log("Target : ", e.target);
      // console.log("Target : ", e.target.parentElement);
      // console.log(document.getElementById(e.target.parentElement.id));
      let { comment: comments } = await getComments();
      let currentComment = comments.filter(
        (comment) => comment.id == e.target.parentElement.id
      );
      //
      const deletebox = document.getElementById(e.target.parentElement.id);
      deletebox.innerHTML = `
      <div>닉네임 : ${currentComment[0].User.UserInfo.nickname}</div>
  <div><a>content : ${currentComment[0].content}</a></div>
  <button id='deleteVerify'>정말 삭제하시겠습니까?</button>
  <button class="cancel-Btn" id='cancel'>취소</button>`;

      // 확인버튼 눌렀을때
      const deleteVerifyBtn = document.getElementById("deleteVerify");
      deleteVerifyBtn.addEventListener("click", () => {
        fetch(`/api/posts/${postId}/comments/${currentComment[0].id}`, {
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
        alert("삭제취소");
        window.location.reload();
      });
    }
  }
}

export { renderComments, saveComments, modifyComments };
