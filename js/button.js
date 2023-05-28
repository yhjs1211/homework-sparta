function findMovieButton(){
    let inputText = document.querySelector("#findMovieInput").value.toLowerCase();
    let select = document.querySelector('#selector').value;
    select=='titleOfMovie' ? matchMovie(inputText) : matchId(inputText);
}

matchMovie = (inputText) =>{
    let movies = document.querySelectorAll("#movieTitle");
    movies.forEach(m=>{
        let title = m.textContent.replace('제목 : ','').toLowerCase();
        if(!title.includes(inputText)){
            let displayNone = m.closest('.flip-box');
            displayNone.setAttribute("style","display: none;");
        }
    })
}

matchId = function(input){
    let divs = document.querySelectorAll('.flip-box');
    let found = Array.from(divs).find(v=>v.getAttribute('id')==input);

    if(found==undefined){
        alert('찾는 ID가 없습니다.');
    }else{
        divs.forEach(m=>{
            let id = m.getAttribute('id');
            if(id!=input){
                m.setAttribute("style","display: none;");
            }
        })
    }
}

function alertId(e){
    let id = e.getAttribute("id")
    alert('영화 ID : '+id);
}