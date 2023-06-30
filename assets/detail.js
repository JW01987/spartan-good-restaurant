//detailhtml 과 연결되어 있는 js파일

import { renderPostDetails, modifyPosts } from "./modules/GET-postDetails.js"; // 렌더링하는 모듈
import {
  renderComments,
  saveComments,
  modifyComments,
} from "./modules/comments.js";
import { likeBtn } from "./modules/forLikeButton.js";

renderPostDetails();
renderComments();

const signupLink = document.getElementById("signup-link");
const registerOverlay = document.getElementById("register-overlay");
const loginButton = document.getElementById("login-button");
const loginOverlay = document.getElementById("login-overlay");
const loginLink = document.getElementById("login-link");
const closeLoginIcon = document.getElementById("login-close-icon");
const closeRegisterIcon = document.getElementById("register-close-icon");
const registerForm = document.getElementById("register-form");
const loginForm = document.getElementById("login-form");
const newPostButton = document.getElementById("new-post-button");
const nicknameButton = document.getElementById("nickname-button");
const userMenuButton = document.getElementById("user-menu-button");
const userMenuUI = document.getElementById("user-menu");
const homeButton = document.getElementById("home-button");
const insertCommentButton = document.getElementById("comments-btn");
const commentsList = document.querySelector(".comments-list");
const postList = document.querySelector("#detail-list");

insertCommentButton.addEventListener("click", saveComments); // 댓글저장

postList.addEventListener("click", (e) => {
  if (e.target.classList.contains("likeBtn")) {
    likeBtn();
  } else modifyPosts(e);
});
// 댓글 수정 삭제
commentsList.addEventListener("click", (e) => {
  modifyComments(e);
});
// 홈으로가기
homeButton.addEventListener("click", () => {
  location.href = "./index.html";
});
// 로그인 버튼 클릭 시 login-overlay 표시
loginButton.addEventListener("click", () => {
  loginOverlay.style.display = "flex";
});

// 회원가입 버튼 클릭 시 register-overlay 표시
signupLink.addEventListener("click", () => {
  loginOverlay.style.display = "none";
  registerOverlay.style.display = "flex";
});

// register-overlay의 로그인 버튼 클릭 시 login-overlay 표시
loginLink.addEventListener("click", () => {
  registerOverlay.style.display = "none";
  loginOverlay.style.display = "flex";
});

// 로그인 창 닫기
closeLoginIcon.addEventListener("click", () => {
  loginOverlay.style.display = "none";
});

// 회원가입 창 닫기
closeRegisterIcon.addEventListener("click", () => {
  registerOverlay.style.display = "none";
});

function showLoggedInUI(nickname) {
  loginButton.style.display = "none";
  userMenuButton.style.display = "block";
  newPostButton.style.display = "block";
  nicknameButton.style.display = "block";
  nicknameButton.textContent = nickname;
}

function showLoggedOutUI() {
  loginButton.style.display = "block";
  userMenuButton.style.display = "none";
  newPostButton.style.display = "none";
  nicknameButton.style.display = "none";
  userMenuUI.style.display = "none";
}

function getCookie(name) {
  const cookies = document.cookie.split(";");

  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.trim().split("=");
    if (cookieName === name) {
      return decodeURIComponent(cookieValue);
    }
  }

  return "";
}

window.addEventListener("DOMContentLoaded", async () => {
  {
    const authorization = getCookie("authorization");

    if (authorization) {
      try {
        const profileResponse = await fetch("/api/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: authorization,
          },
        });
        if (profileResponse) {
          const profileData = await profileResponse.json();
          const { nickname } = profileData.data.UserInfo;
          showLoggedInUI(nickname);
        } else {
          // 실패 시 로그인 버튼으로 유지
          showLoggedOutUI();
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      // 인증 토큰이 없는 경우 로그인 버튼으로 유지
      showLoggedOutUI();
    }
  }
});

registerForm.addEventListener("submit", async (event) => {
  event.preventDefault(); // 폼 제출 기본 동작 방지

  const email = document.getElementById("register-inputEmail").value;
  const password = document.getElementById("register-inputPassword").value;
  const nickname = document.getElementById("register-inputname").value;
  const age = document.getElementById("register-inputAge").value;
  const introduce = document.getElementById("register-inputIntroduce").value;

  try {
    const response = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        nickname,
        age,
        introduce,
      }),
    });

    if (response.ok) {
      alert("회원가입이 완료되었습니다."); // 성공 메시지 표시
      registerOverlay.style.display = "none"; // 회원가입 창 닫기
    } else {
      const data = await response.json();
      alert(data.message); // 실패 메시지 표시
    }
  } catch (error) {
    console.error("Error:", error);
  }
});

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault(); // 폼 제출 기본 동작 방지

  const email = document.getElementById("inputEmail").value;
  const password = document.getElementById("inputPassword").value;

  try {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (response.ok) {
      alert("로그인이 완료되었습니다."); // 성공 메시지 표시
      loginOverlay.style.display = "none"; // 로그인 창 닫기

      // 사용자 프로필 정보를 가져오기 위해 API 요청을 수행합니다.
      const profileResponse = await fetch("/api/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (profileResponse.ok) {
        const profileData = await profileResponse.json();
        console.log(profileData);
        const { nickname } = profileData.data.UserInfo;
        showLoggedInUI(nickname); // 사용자 닉네임으로 UI 업데이트
      } else {
        alert("프로필을 불러올 수 없습니다."); // 실패 메시지 표시
      }
    } else {
      const data = await response.json();
      alert(data.message); // 실패 메시지 표시
    }
  } catch (error) {
    console.error("Error:", error);
  }
});

userMenuButton.addEventListener("click", () => {
  userMenuUI.style.display =
    userMenuUI.style.display === "none" ? "block" : "none";
});

const logoutButton = document.getElementById("logout-button");

logoutButton.addEventListener("click", async () => {
  {
    // 로그아웃 API 요청을 수행합니다.
    fetch("/api/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          // 로그아웃이 성공하면 UI 업데이트
          showLoggedOutUI();
          alert("로그아웃되었습니다.");
        } else {
          alert("로그아웃을 할 수 없습니다.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("로그아웃을 할 수 없습니다.");
      });
  }
});

newPostButton.addEventListener("click", async () => {
  window.location.replace("./Post.html");
});
