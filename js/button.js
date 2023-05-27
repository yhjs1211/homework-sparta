function findMovieButton(){
    let inputText = document.querySelector("#findMovieInput").value.toLowerCase();
    matchMovie(inputText);
}

matchMovie = (inputText) =>{
    let movies = document.querySelectorAll("#movieTitle");
    let arr = []
    movies.forEach(m=>{
        let title = m.textContent.replace('제목 : ','').toLowerCase();
        if(!title.includes(inputText)){
            let displayNone = m.closest('.flip-box');
            displayNone.setAttribute("style","display: none;");
        }
    })
    
    return arr;
}

function alertId(e){
    let id = e.getAttribute("id")
    alert('영화 ID : '+id);
}