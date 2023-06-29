let space = /\s/; //공백값
function passwordCheck(password) {
  //비밀번호 영문자 + 숫자 + 특수조합 8~25자리
  let pswRegExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
  let check = false;

  if (password.length == 0) {
    //값이 없는 경우
    alert("비밀번호를 입력해주세요.");
  } else if (space.test(password) == true) {
    //공백이 있는 경우
    alert("공백은 사용할 수 없습니다.");
  } else if (pswRegExp.test(password) == false) {
    alert(
      "비밀번호는 영문자+숫자+특수문자(!@#$%^*+=-) 조합으로 8-25자리 사용해야 합니다."
    );
  } else {
    check = true;
  }
  return check;
}

function emailCheck(email) {
  //이메일 영어, 숫자 -_. 의 특수문자 1개 이상  + @ + 영어, 숫자 -_. 의 특수문자 1개 이상 , 영어 2-3글자
  let emailRegExp =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  let check = false;

  if (email.length == 0) {
    //값이 없는 경우
    alert("비밀번호를 입력해주세요.");
  } else if (space.test(email) == true) {
    //공백이 있는 경우
    alert("공백은 사용할 수 없습니다.");
  } else if (emailRegExp.test(email) == false) {
    alert("이메일이 아닙니다.");
  } else {
    check = true;
  }
  return check;
}

module.exports = { passwordCheck, emailCheck };
