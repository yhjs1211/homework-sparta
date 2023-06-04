const apiKey = '37b7d2b4cf6d8c5915217d0288c4e180';

const getMovie = async(id)=>{
    const movie = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=ko`,{method:'GET'})
                        .then(response=>response.json())
                        .catch(console.log);
    showContent(movie)
}

function showContent(data){
    const header = document.querySelector(".title");
    const containner = document.querySelector(".movieContainer");
    header.innerHTML=
        `<h1>${data.title}</h1>`;
    containner.innerHTML=
        `
        <div class="moviePoster">
            <img src="https://image.tmdb.org/t/p/w300${data.poster_path}" alt="${data.original_title}"/>
        </div>
        <div class="cols">
        <p>개봉일 👉</p>
        <p>평점 👉</p>
        <p>내용 👉</p>
        </div>
        <div class="movieInfo">
            <p>${data.release_date}</p>
            <p>${data.vote_average}</p>
            <p>${data.overview}</p>
        </div>
        `
}