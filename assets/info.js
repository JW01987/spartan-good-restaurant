const signupLink = document.getElementById('signup-link');
const registerOverlay = document.getElementById('register-overlay');
const loginButton = document.getElementById('login-button');
const loginOverlay = document.getElementById('login-overlay');
const loginLink = document.getElementById('login-link');
const closeLoginIcon = document.getElementById('login-close-icon');
const closeRegisterIcon = document.getElementById('register-close-icon');
const registerForm = document.getElementById('register-form');
const loginForm = document.getElementById('login-form');
const newPostButton = document.getElementById('new-post-button');
const nicknameButton = document.getElementById('nickname-button');
const userMenuButton = document.getElementById('user-menu-button');
const userMenuUI = document.getElementById('user-menu');

const correctionButtons = document.querySelectorAll('.correction-button');
correctionButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    event.preventDefault();

    const wrapperContentButton = button.parentElement.parentElement;
    wrapperContentButton.style.display = 'none'; // .wrapper-content-button 숨기기

    const editForm = wrapperContentButton.nextElementSibling;
    editForm.style.display = 'block'; // 수정 폼 표시
  });
});

window.addEventListener('DOMContentLoaded', async () => {
  {
    const authorization = getCookie('authorization');

    if (authorization) {
      try {
        const profileResponse = await fetch('/api/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: authorization,
          },
        });

        if (profileResponse.ok) {
          const profileData = await profileResponse.json();
          const { nickname } = profileData.data.UserInfo;
          showLoggedInUI(nickname);
        } else {
          // 실패 시 로그인 버튼으로 유지
          showLoggedOutUI();
        }
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      // 인증 토큰이 없는 경우 로그인 버튼으로 유지
      showLoggedOutUI();
    }
  }
});

function showLoggedInUI(nickname) {
  loginButton.style.display = 'none';
  userMenuButton.style.display = 'block';
  newPostButton.style.display = 'block';
  nicknameButton.style.display = 'block';
  nicknameButton.textContent = nickname;
}

function showLoggedOutUI() {
  loginButton.style.display = 'block';
  userMenuButton.style.display = 'none';
  newPostButton.style.display = 'none';
  nicknameButton.style.display = 'none';
  userMenuUI.style.display = 'none';
}

function getCookie(name) {
  const cookies = document.cookie.split(';');

  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.trim().split('=');
    if (cookieName === name) {
      return decodeURIComponent(cookieValue);
    }
  }

  return '';
}

userMenuButton.addEventListener('click', () => {
  userMenuUI.style.display =
    userMenuUI.style.display === 'none' ? 'block' : 'none';
});

const logoutButton = document.getElementById('logout-button');

logoutButton.addEventListener('click', async () => {
  {
    // 로그아웃 API 요청을 수행합니다.
    fetch('/api/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          // 로그아웃이 성공하면 UI 업데이트
          showLoggedOutUI();
          alert('로그아웃되었습니다.');
          window.location.replace('./');
        } else {
          alert('로그아웃을 할 수 없습니다.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('로그아웃을 할 수 없습니다.');
      });
  }
});

const userInfoButton = document.getElementById('user-info');

userInfoButton.addEventListener('click', async () => {
  window.location.replace('./userInfo.html');
});
