const loginButton = document.getElementById('login-button');
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
          console.log(profileData.data);
          const { email } = profileData.data;
          const { nickname, age, introduce } = profileData.data.UserInfo;
          showUserInfo(email, nickname, age, introduce);
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

function showUserInfo(email, nickname, age, introduce) {
  const emailContent = document.querySelector('.user-info .email');
  const nicknameContent = document.querySelector('.user-info .nickname');
  const ageContent = document.querySelector('.user-info .age');
  const introduceContent = document.querySelector('.user-info .introduce');
  emailContent.textContent = email;
  nicknameContent.textContent = nickname;
  ageContent.textContent = age !== null ? String(age) : '';
  introduceContent.textContent = introduce;
}

const editForm = document.querySelectorAll('.edit-form');

editForm.forEach((form) => {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const emailInput = document.querySelector('#email').value;
    const nicknameInput = document.querySelector('#nickname').value;
    const ageInput = document.querySelector('#age').value;
    const introduceInput = document.querySelector('#introduce').value;
    const pswInput = document.querySelector('#psw').value;
    const confirmPswInput = document.querySelector('#confirmPsw').value;
    let pswRegExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    let emailRegExp = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    let space = /\s/g;

    if (isNaN(ageInput)) {
      return alert('나이는 숫자를 입력하세요');
    }
    fetch('/api/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: emailInput,
        nickname: nicknameInput,
        age: ageInput,
        introduce: introduceInput,
        password: pswInput,
        confirmPassword: confirmPswInput,
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
          return alert(data.errorMessage);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('수정 오류입니다.');
      });
  });
});

newPostButton.addEventListener('click', async () => {
  window.location.replace('./Post.html');
});
