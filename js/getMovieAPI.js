const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzN2I3ZDJiNGNmNmQ4YzU5MTUyMTdkMDI4OGM0ZTE4MCIsInN1YiI6IjY0NzA4OWYxNTQzN2Y1MDE0NzVmMDVjZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.t42WMrLIy0fGHEdgBcFhhL4TW60jWni6SYfpwEVqYZg'
  }
};

const getResult = async function(){
  const getDataJson = await fetch('https://api.themoviedb.org/3/movie/popular?language=ko&page=1', options)
  .then(response=>{
      if(response.status!=200) throw new Error('No Response from TMDB')
      return response.json()
    })
  .catch((e)=>console.log(e));

  return getDataJson.results;
}

const movieDatas = getResult();

movieDatas
  .then(movie=>{      
    movie.forEach(value=>{
      makeFlipCard(value);
    })
  })

function makeFlipCard(value){
  // Front of Card
  let makeFrontCardDiv = document.createElement("div");
  makeFrontCardDiv.setAttribute("class","card");
  let imgURL = "<img src=\"https://image.tmdb.org/t/p/w300"+value.poster_path+"\" alt=\""+value.original_title+"\"\/>";
  makeFrontCardDiv.innerHTML=imgURL;
  // 평점 7.5이 넘는 영화 추천 스티커 부착
  if(Number(value.vote_average)>=7.5){
    let recommendDiv = document.createElement("div");
    recommendDiv.setAttribute("class","recommend");
    let recommendImg = document.createElement("img");
    recommendImg.setAttribute("src","./img/recommend.png");
    recommendDiv.appendChild(recommendImg);
    makeFrontCardDiv.appendChild(recommendDiv);
  }

  let frontColDiv = document.createElement("div");
  frontColDiv.setAttribute("class","col");
  frontColDiv.appendChild(makeFrontCardDiv);

  // Back of Card
  let makeBackCardDiv = document.createElement("div");
  let movieTitle = document.createElement("h3");
  movieTitle.setAttribute("id","movieTitle")
  movieTitle.setAttribute("style","display: none;")
  movieTitle.innerText=value['title'];
  let noticeComment = document.createElement("h3");
  noticeComment.setAttribute("class","noticeMove");
  noticeComment.innerText="카드 클릭시 상세페이지 이동👍";
  // let movieContentDiv = document.createElement("div");
  // let movieContentTitle = document.createElement("h3");
  // movieContentTitle.innerText="내용";
  // movieContentTitle.setAttribute("style","border: 1px dotted;");
  // let movieContent = document.createElement("p");
  // movieContent.innerText=value.overview;
  // movieContentDiv.appendChild(movieContentTitle);
  // movieContentDiv.appendChild(movieContent);
  // let movieRate = document.createElement("p");
  // movieRate.innerText="평점 : "+value['vote_average'];
  // let movieRelease = document.createElement("p");
  // movieRelease.innerText="개봉일 : "+value['release_date'];

  let backColDiv = document.createElement("div");
  backColDiv.setAttribute("class","col");
  backColDiv.appendChild(movieTitle);
  backColDiv.appendChild(noticeComment);
  // backColDiv.appendChild(movieRelease);
  // backColDiv.appendChild(movieRate);
  // backColDiv.appendChild(movieContentDiv);
  
  // Front Side
  let frontDiv = document.createElement("div");
  frontDiv.setAttribute("class","front");
  frontDiv.appendChild(frontColDiv);
  
  // Back Side
  let backDiv = document.createElement("div");
  backDiv.setAttribute("class","back");
  backDiv.appendChild(backColDiv);

  // (FlipBox & Flip) Div
  let flipBoxDiv = document.createElement("div");
  flipBoxDiv.setAttribute("onclick","moveDetailPage(this)");
  flipBoxDiv.setAttribute("class","flip-box");
  flipBoxDiv.setAttribute("id",value.id);

  let flipDiv = document.createElement("div");
  flipDiv.setAttribute("class","flip");

  flipDiv.appendChild(frontDiv);
  flipDiv.appendChild(backDiv);
  flipBoxDiv.appendChild(flipDiv);

  document.querySelector(".card-list").append(flipBoxDiv);
}

// 오준석 nav bar title 및 id JS 설정 시작 
const titleList = [];
const idList = [];

movieDatas
  .then(movie => {
    movie.forEach((value, index) => {
      const title = value.title;
      const id = value.id;
      titleList.push(title);
      idList.push(id);

      console.log(movie)
      // 타이틀 및 ID 업데이트 
      const navLink = document.querySelector(`.TopnaV li:nth-child(${index + 1}) a`);
      navLink.textContent = `${index + 1}. ${title}`;
      navLink.href = `detail.html?id=${id}`; // Update the href attribute with the new ID
    });
  });
// Nav bar 데이터 반영 기준을 vote_average 항목으로 기준 잡아서 평점 오름차순으로 코드 구성 예정 
// 오준석 nav bar title 및 id JS 설정 끝
