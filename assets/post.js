const loginButton = document.getElementById('login-button');
const newPostButton = document.getElementById('new-post-button');
const nicknameButton = document.getElementById('nickname-button');
const userMenuButton = document.getElementById('user-menu-button');
const userMenuUI = document.getElementById('user-menu');

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

const postForm = document.getElementById('post-form');

postForm.addEventListener('submit', async (data) => {
  data.preventDefault();

  const imageFile = document.getElementById('image').files[0];
  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;

  if (!imageFile || !title || !content) {
    alert('이미지, 타이틀, 컨텐츠를 모두 입력해주세요.');
    return;
  }

  const formData = new FormData(); //서버로 전송하기 위해 폼데이터 객체 생성, 파일 처리 시 폼데이터가 편리
  formData.append('image', imageFile); // 키-값 형태로 저장
  formData.append('title', title);
  formData.append('content', content);

  try {
    const response = await fetch('/api/posts', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      // console.log(1, response);
      const responseData = await response.json();
      // console.log(2, responseData);
      const { data: post } = responseData;
      // console.log(3, post);
      // console.log('게시글 생성:', post);
      alert('게시글이 생성되었습니다.');
      window.location.reload();
    } else {
      const errorData = await response.json();
      console.error('게시글 생성 오류:', errorData);
      alert('게시글 생성에 실패했습니다.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('게시글 생성에 실패했습니다.');
  }
});

newPostButton.addEventListener('click', async () => {
  window.location.replace('./Post.html');
});
