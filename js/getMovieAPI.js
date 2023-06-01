const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzN2I3ZDJiNGNmNmQ4YzU5MTUyMTdkMDI4OGM0ZTE4MCIsInN1YiI6IjY0NzA4OWYxNTQzN2Y1MDE0NzVmMDVjZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.t42WMrLIy0fGHEdgBcFhhL4TW60jWni6SYfpwEVqYZg'
    }
  };

  const getResult = async function(){
    const getDataJson = await fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
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
    let imgURL = "<img src=\"https://image.tmdb.org/t/p/w500"+value.poster_path+"\" alt=\""+value.original_title+"\"\/>";
    makeFrontCardDiv.innerHTML=imgURL;
    // 인기도 80이 넘는 영화 추천 스티커 부착
    if(Number(value.popularity)>=80){
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
    movieTitle.innerText="제목 : "+value['original_title'];
    let movieContentDiv = document.createElement("div");
    let movieContentTitle = document.createElement("h3");
    movieContentTitle.innerText="내용";
    movieContentTitle.setAttribute("style","border: 1px dotted;");
    let movieContent = document.createElement("p");
    movieContent.innerText=value.overview;
    movieContentDiv.appendChild(movieContentTitle);
    movieContentDiv.appendChild(movieContent);
    let movieRate = document.createElement("p");
    movieRate.innerText="평점 : "+value['vote_average'];
    let movieRelease = document.createElement("p");
    movieRelease.innerText="개봉일 : "+value['release_date'];

    let backColDiv = document.createElement("div");
    backColDiv.setAttribute("class","col");
    backColDiv.appendChild(movieTitle);
    backColDiv.appendChild(movieRelease);
    backColDiv.appendChild(movieRate);
    backColDiv.appendChild(movieContentDiv);
    
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
    flipBoxDiv.setAttribute("onclick","alertId(this)");
    flipBoxDiv.setAttribute("class","flip-box");
    flipBoxDiv.setAttribute("id",value.id);
    let flipDiv = document.createElement("div");
    flipDiv.setAttribute("class","flip");

    flipDiv.appendChild(frontDiv);
    flipDiv.appendChild(backDiv);
    flipBoxDiv.appendChild(flipDiv);

    document.querySelector(".card-list").append(flipBoxDiv);
  }
