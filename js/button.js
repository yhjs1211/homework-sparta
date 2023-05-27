function findMovieButton(){
    let inputText = document.querySelector("#findMovieInput").value;
    let foundMovie = matchMovie(inputText); 

}

function matchMovie(inputText){
    let movies = document.querySelectorAll("#movieTitle");
    let foundMovie = movies.filter(m=>{
        m.value.includes(inputText)
    });
    let arr = []
    foundMovie.forEach(v=>{
        arr.push(v.closest('.flip-box'));
    });
    return arr;
}

function displayNone(found){
    let movies =document.querySelectorAll(".flip-box");
    movies.forEach(m=>{
      m.getAttribute("")  
    })
}