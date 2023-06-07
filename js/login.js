//로그인 값을 조회하기 위한 키값
const idKey = "USER-ID";
const $idInput = document.getElementById("login-input-user"); //아이디 인풋 엘레먼트
const $pwdInput = document.getElementById("login-input-password"); //비번 인풋 엘레먼트
const $chkRemember = document.getElementById("login-remember"); //아이디 저장 여부 체크박스 엘레먼트(비밀번호는X)

//로컬스토리지에 저장된 로그인 정보가 있는 경우 세팅하기.
const loginInfo = localStorage.getItem(idKey);

if (loginInfo != null) {
  $idInput.value = loginInfo;
  $chkRemember.checked = true;
}

function Account(id, password) {
  this.id = id;
  this.password = password;
}

let user1 = new Account("wnstjr123", "qwerty123");
let user2 = new Account("dudgns123", "qwerty123");
let user3 = new Account("dusqja123", "qwerty123");
let user4 = new Account("tkddn123", "qwerty123");
let user5 = new Account("xoghks123", "qwerty123");

const accounts = [user1, user2, user3, user4, user5];

//로그인 시에는 어떤 순차로 정보를 확인해야하는지 유의해야한다.
function login() {
  //0.입력값 여부 확인.
  if (checkNullInput($idInput) && checkNullInput($pwdInput)) {
    //값이 모두 입력된 경우

    //1.1 아이디 유효성 검사 + 비밀번호 유효성 검사
    if (checkId($idInput.value) && checkPwd($pwdInput.value)) {
      //모두 유효
      //true 반환되면 아이디 비밀번호 정보 저장 후 formaction으로 보냄.
      checkRemeberLoginInfo();

      if (accountCheck($idInput.value, $pwdInput.value)) {
        loginOk();
      } else {
        alert("아이디와 비밀번호가 일치하지 않습니다.");
        $pwdInput.value = null;
      }
    } else {
      //1.2 모두 또는 일부 유효하지않음.

      alert("아이디 또는 비밀번호를 올바르게 입력해주세요.");
    }
  } else {
    //아이디나 비밀번호 둘중 하나, 또는 모두 입력되지않음

    //비어있는 곳으로 포커스.
    if (checkNullInput($idInput) == false) {
      //두개 모두 false인 경우(두개모두 미입력된 경우), 또는 아이디기 false를 반환한 경우(아이디 미입력 경우)
      alert("아이디를 입력해주세요.");
      $idInput.focus();
    } else {
      //비밀번호 미입력한 경우
      alert("비밀번호를 입력하세요.");
      $pwdInput.focus();
    }
  }
}

function checkNullInput(input) {
  //인풋 값 입력 여부를 확인하는 함수 //input element를 파람으로 받는다.

  if (input.value == "") {
    return false;
  } else {
    return true;
  }
}

function checkPwd(str_pwd) {
  //비밀번호 정규식 체크 함수
  const reg1 = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/; //비밀번호는 영어/숫자/특수문자를 포함한 8자 이상.
  return reg1.test(str_pwd); //정규식과 매치되면 true, 매치되지않으면 false 반환.
}

function checkId(str_id) {
  //아이디 정규식 체크 함수
  const reg2 = /^[a-z]+[a-z0-9]{4,19}$/g; //영문자로 시작해야하는(숫자가 앞으로 올 수 없음) 영문+숫자 조합 5~20자.
  return reg2.test(str_id);
}

function checkRemeberLoginInfo() {
  //웹스토리지 이용하여 저장 또는 삭제.
  let userId = $idInput.value;

  if ($chkRemember.checked === true) {
    localStorage.setItem(idKey, userId);
  } else {
    //선택하지않으면 기존에 있던 모든 로그인 정보 삭제.
    localStorage.removeItem(idKey);
  }
}

const loginOk = () => {
  const movieId = localStorage.getItem("movieId");
  localStorage.removeItem("movieId");
  submitLogin();
  if (!movieId) {
    window.location.href = `./index.html`;
  } else {
    const param = `?id=${movieId}`;
    window.location.href = `./detail.html${param}`;
  }
};

const submitLogin = async () => {
  try {
    localStorage.setItem("Token", $idInput.value);
  } catch (err) {
    console.log(err);
  }
};

const accountCheck = (userId, userPassword) => {
  let usertest = accounts.find(
    (account) => account.id === userId && account.password === userPassword
  );

  if (usertest) return true;
  else return false;
};
