const loginButton = document.getElementById('login-button');
const overlay = document.getElementById('overlay');
const loginContainer = document.getElementById('login-container');
const loginH2 = document.getElementById('login-h2');
const signupLink = document.getElementById('signup-link');
const loginRegisterButton = document.getElementById('login-register-button');
const loginP = document.getElementById('login-p');
const closeIcon = document.getElementById('close-icon');

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
    // 회원가입 처리
  } else {
    // 로그인 처리
    // 로그인 인증 완료 후 닉네임으로 변경
    const inputNickname = document.getElementById('inputNickname');
    const userNickname = inputNickname.value;
    loginRegisterButton.innerText = userNickname;

    // 사용자 메뉴 표시를 위한 작은 화살표 버튼 추가
    const userMenuButton = document.createElement('userMenuButton');
    userMenuButton.innerHTML = '<i class="fa-solid fa-caret-down"></i>';
    userMenuButton.id = 'user-menu-button';

    // 사용자 메뉴 열기
    userMenuButton.addEventListener('click', () => {
      // 사용자 메뉴 열기 코드 작성
    });

    // 로그인 버튼과 사용자 메뉴 버튼을 동시에 표시하기 위해 부모 요소를 가져옴
    const loginButtonParent = loginRegisterButton.parentNode;

    // 로그인 버튼 대신 사용자 메뉴 버튼으로 교체
    loginButtonParent.replaceChild(userMenuButton, loginRegisterButton);
  }
});
