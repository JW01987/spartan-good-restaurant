const loginButton = document.getElementById('login-button');
const overlay = document.getElementById('overlay');
const loginContainer = document.getElementById('login-container');
const loginH2 = document.getElementById('login-h2');
const signupLink = document.getElementById('signup-link');
const loginRegisterButton = document.getElementById('login-register-button');
const loginP = document.getElementById('login-p');
const closeIcon = document.getElementById('close-icon');
const nicknameButton = document.getElementById('nickname-button');
const newPostButton = document.getElementById('new-post-button');
const userMenuButton = document.getElementById('user-menu-button');
const userMenu = document.getElementById('user-menu');

loginButton.addEventListener('click', () => {
  overlay.style.display = 'flex';
});

closeIcon.addEventListener('click', () => {
  overlay.style.display = 'none';
});

signupLink.addEventListener('click', () => {
  if (loginH2.innerText === '로그인') {
    loginH2.innerText = '회원가입';
    loginRegisterButton.innerText = '회원가입';
    loginP.innerText = '계정이 이미 있으신가요?';
    signupLink.innerText = '로그인';
    loginContainer.style.display = 'block';
  } else {
    loginH2.innerText = '로그인';
    loginRegisterButton.innerText = '로그인';
    signupLink.innerText = '회원가입';
    loginP.innerText = '아이디가 없으신가요?';
    loginContainer.style.display = 'block';
  }
});

// 추가: 폼 엔터 키 제출 방지
loginContainer.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault(); // 폼 제출 방지
  }
});

loginRegisterButton.addEventListener('click', (event) => {
  event.preventDefault(); // 기본 이벤트 동작 취소
  if (loginRegisterButton.innerText === '회원가입') {
    console.log('회원가입 버튼 클릭');
    // 회원가입 처리
  } else {
    console.log('로그인 버튼 클릭');
    // 로그인 처리
    const inputNickname = document.getElementById('inputNickname').value; // db에서 불러오는걸로 바꿔야 됨
    nicknameButton.innerText = inputNickname; // 닉네임으로 버튼 텍스트 변경
    loginButton.style.display = 'block';
    nicknameButton.style.display = 'inline-block'; // 닉네임 버튼 표시
    newPostButton.style.display = 'inline-block'; // 새글 작성 버튼 표시
    userMenuButton.style.display = 'inline-block'; // 사용자 메뉴 버튼 표시
  }
});

// 추가: 사용자 메뉴 토글
userMenuButton.addEventListener('click', () => {
  if (userMenu.style.display === 'none') {
    userMenu.style.display = 'block';
  } else {
    userMenu.style.display = 'none';
  }
});
