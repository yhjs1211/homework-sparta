const reviewList = document.querySelector(".reviewList");
window.onload = getReview(movieId);

//리뷰 불러오기
function getReview(movieNum) {
  //   해당 영화 ID에 관련된 리뷰만 불러오기
  findItem()
    .filter((v) => {
      if (JSON.parse(localStorage.getItem(v)).movieNumber == movieNum) return v;
    })
    .sort((a, b) => b - a)
    .forEach((v) => {
      const json = JSON.parse(localStorage.getItem(v));
      const user = json.ID;
      const contentValue = json.content;

      const reviewCard = document.createElement("li");
      reviewCard.setAttribute("class", "review_card");

      //태환 추가 : 본인 ID만 수정 삭제 버튼 보이게. 및 uuid 값 비교하기 위해 div안에 데이터 추가
      if (JSON.parse(localStorage.getItem("Token")) === user) {
        reviewCard.innerHTML = `
              <div class="review" id="${movieId}">
                  <h4>${user}</h4>
                  <h3 style="display:none">${v}</h3>
                  <p>${contentValue}</p>
                  <button type="button" onclick="updateReview(this)" id="updateButton">수정</button>
                  <button type="button" onclick="deleteReview(this)" id="deleteButton">X</button>
              </div>
          `;
      } else {
        reviewCard.innerHTML = `
              <div class="review" id="${movieId}">
                  <h4>${user}</h4>
                  <h3 style="display:none">${v}</h3>
                  <p>${contentValue}</p>
          `;
      }
      reviewList.appendChild(reviewCard);
    });
}

// 리뷰 새로 등록
// 태환 수정 : 로그인 페이지에서 ID값 가져와서 리뷰에 ID값 넣어줌
function createReview(id) {
  // 로그인, 입력 체크
  if (logincheck()) {
    if (inputcheck()) {
      let key = Date.now() + String(Math.floor(Math.random() * 100));
      const user = JSON.parse(localStorage.getItem("Token"));
      const contentValue = document.querySelector("#reviewContent").value;
      const obj = {
        movieNumber: id,
        ID: user,
        content: contentValue,
      };
      localStorage.setItem(key, JSON.stringify(obj));
      window.location.reload();
    }
  } else {
    // 태환 추가 : 로그인 안됐으면 현재 페이지 저장 후 로그인 페이지로 이동
    // 로그인 할때 confirm으로 체크
    if (
      confirm(
        "리뷰를 등록하시려면 로그인을 하셔야 합니다. \n 로그인 하시겠습니까??"
      )
    )
      window.location.href = `./login.html`;
  }
}

//리뷰 수정
function updateReview(tag) {
  if (confirm("수정하시면 복구할수 없습니다. \n 정말로 수정하시겠습니까?")) {
    const updateItem = findItem(tag, "U");
    const validation = passwordVerify(updateItem);
    console.log(JSON.parse(localStorage.getItem(updateItem)).content);
    if (validation) {
      const willUpdateContent = prompt(
        "수정할 내용을 적어주세요.",
        JSON.parse(localStorage.getItem(updateItem)).content
      );
      let item = JSON.parse(localStorage.getItem(updateItem));
      if (willUpdateContent !== null) {
        item.content = willUpdateContent;
        localStorage.setItem(updateItem, JSON.stringify(item));
        window.location.reload();
      }
    } else {
      alert("본인의 리뷰만 수정 할 수 있습니다.");
    }
  }
}

//리뷰 삭제
function deleteReview(tag) {
  if (confirm("삭제하시면 복구할수 없습니다. \n 정말로 삭제하시겠습니까?")) {
    const deleteItem = findItem(tag, "D");
    const validation = passwordVerify(deleteItem);
    if (validation) {
      localStorage.removeItem(deleteItem);
      window.location.reload();
    } else {
      alert("본인의 리뷰만 삭제 할 수 있습니다.");
    }
  }
}

// 비밀번호 검증
// 태환 수정 : 로그인 페이지에서 넘겨준 id 가져와서 비교
function passwordVerify(item) {
  const id = JSON.parse(localStorage.getItem("Token"));
  if (id === JSON.parse(localStorage.getItem(item)).ID) {
    return true;
  } else {
    return false;
  }
}

// 로컬 스토리지 내 해당 아이템 반환
// 태환 추가 : 삭제 및 수정을 위한 uuid 비교
function findItem(t = null, word = "R") {
  const reviewArray = Object.keys(localStorage);
  if (word == "R") {
    return reviewArray;
  } else {
    const movieIdOfReview = t.parentNode.getAttribute("id");
    const userId = t.parentNode.getElementsByTagName("h4")[0].innerHTML;
    const uuid = t.parentNode.getElementsByTagName("h3")[0].innerHTML;
    const item = reviewArray.filter((v) => {
      const jsonObj = JSON.parse(localStorage.getItem(v));
      if (
        jsonObj.ID === userId &&
        jsonObj.movieNumber === movieIdOfReview &&
        v === uuid
      )
        return v;
    });
    return item;
  }
}

//태환 추가 : 로그인 됐는지 확인
function logincheck() {
  if (localStorage.getItem("Token")) return true;
  else return false;
}
//연범 추가 : 내용 입력 확인
function inputcheck() {
  if (document.querySelector("#reviewContent").value == "") {
    alert("내용을 입력해 주십시오.");
    document.querySelector("#reviewContent").focus();
    return false;
  } else return true;
}
