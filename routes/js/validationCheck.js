let space = /\s/g; //공백값
function passwordCheck(password) {
  //비밀번호 영문자 + 숫자 + 특수조합 8~25자리
  let pswRegExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
  if (
    password.length == 0 ||
    space.test(password) ||
    !pswRegExp.test(password)
  ) {
    return false;
  }
  return true;
}

function emailCheck(email) {
  //이메일 영어, 숫자 -_. 의 특수문자 1개 이상  + @ + 영어, 숫자 -_. 의 특수문자 1개 이상 , 영어 2-3글자
  let emailRegExp = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  if (email.length == 0 || space.test(email) || !emailRegExp.test(email)) {
    return false;
  }
  return true;
}

module.exports = { passwordCheck, emailCheck };
