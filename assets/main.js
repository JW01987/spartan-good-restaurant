const signupLink = document.getElementById('signup-link');
const registerOverlay = document.getElementById('register-overlay');
const loginButton = document.getElementById('login-button');
const loginOverlay = document.getElementById('login-overlay');
const loginLink = document.getElementById('login-link');
const closeLoginIcon = document.getElementById('login-close-icon');
const closeRegisterIcon = document.getElementById('register-close-icon');
const registerForm = document.getElementById('register-form');
const loginForm = document.getElementById('login-form');

// 로그인 버튼 클릭 시 login-overlay 표시
loginButton.addEventListener('click', () => {
  loginOverlay.style.display = 'flex';
});

// 회원가입 버튼 클릭 시 register-overlay 표시
signupLink.addEventListener('click', () => {
  loginOverlay.style.display = 'none';
  registerOverlay.style.display = 'flex';
});

// register-overlay의 로그인 버튼 클릭 시 login-overlay 표시
loginLink.addEventListener('click', () => {
  registerOverlay.style.display = 'none';
  loginOverlay.style.display = 'flex';
});

// 로그인 창 닫기
closeLoginIcon.addEventListener('click', () => {
  loginOverlay.style.display = 'none';
});

// 회원가입 창 닫기
closeRegisterIcon.addEventListener('click', () => {
  registerOverlay.style.display = 'none';
});

registerForm.addEventListener('submit', async (event) => {
  event.preventDefault(); // 폼 제출 기본 동작 방지

  const email = document.getElementById('register-inputEmail').value;
  const password = document.getElementById('register-inputPassword').value;
  const nickname = document.getElementById('register-inputname').value;
  const age = document.getElementById('register-inputAge').value;
  const gender = document.getElementById('register-inputGender').value;
  const introduce = document.getElementById('register-inputIntroduce').value;

  try {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        nickname,
        age,
        gender,
        introduce,
      }),
    });

    if (response.ok) {
      alert('회원가입이 완료되었습니다.'); // 성공 메시지 표시
      registerOverlay.style.display = 'none'; // 회원가입 창 닫기
    } else {
      const data = await response.json();
      alert(data.message); // 실패 메시지 표시
    }
  } catch (error) {
    console.error('Error:', error);
  }
});

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault(); // 폼 제출 기본 동작 방지

  const email = document.getElementById('inputEmail').value;
  const password = document.getElementById('inputPassword').value;

  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (response.ok) {
      alert('로그인이 완료되었습니다.'); // 성공 메시지 표시
      loginOverlay.style.display = 'none'; // 로그인 창 닫기
    } else {
      const data = await response.json();
      alert(data.message); // 실패 메시지 표시
    }
  } catch (error) {
    console.error('Error:', error);
  }
});
