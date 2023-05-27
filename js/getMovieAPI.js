const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzN2I3ZDJiNGNmNmQ4YzU5MTUyMTdkMDI4OGM0ZTE4MCIsInN1YiI6IjY0NzA4OWYxNTQzN2Y1MDE0NzVmMDVjZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.t42WMrLIy0fGHEdgBcFhhL4TW60jWni6SYfpwEVqYZg'
    }
  };
  
  

  const data = fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
    .then(response => response.json())
    .then(res => res.results)
    .then(v=>{
        v.forEach(value=>{
            // Front of Card
            let makeFrontCardDiv = document.createElement("div");
            makeFrontCardDiv.setAttribute("class","card");
            let imgURL = "<img src=\"https://image.tmdb.org/t/p/w500"+value.poster_path+"\" alt=\""+value.original_title+"\"\/>";
            makeFrontCardDiv.innerHTML=imgURL;

            let frontColDiv = document.createElement("div");
            frontColDiv.setAttribute("class","col");
            frontColDiv.appendChild(makeFrontCardDiv);

            // Back of Card
            let makeBackCardDiv = document.createElement("div");
            let movieTitle = document.createElement("h3");
            movieTitle.setAttribute("id","movieTitle")
            movieTitle.innerText="제목 : "+value['original_title'];
            let movieContent = document.createElement("p");
            movieContent.innerText="내용 : "+value.overview;
            let movieRate = document.createElement("p");
            movieRate.innerText="평점 : "+value['vote_average'];
            let movieRelease = document.createElement("p");
            movieRelease.innerText="개봉일 : "+value['release_date'];

            let backColDiv = document.createElement("div");
            backColDiv.setAttribute("class","col");
            backColDiv.appendChild(movieTitle);
            backColDiv.appendChild(movieRelease);
            backColDiv.appendChild(movieRate);
            backColDiv.appendChild(movieContent);
            
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
            flipBoxDiv.setAttribute("class","flip-box");
            flipBoxDiv.setAttribute("id",value.id);
            let flipDiv = document.createElement("div");
            flipDiv.setAttribute("class","flip");

            flipDiv.appendChild(frontDiv);
            flipDiv.appendChild(backDiv);
            flipBoxDiv.appendChild(flipDiv);

            document.querySelector(".card-list").append(flipBoxDiv);
        })
        
    })
    .catch(err => console.error(err));
