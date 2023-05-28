function findMovieButton(){
    let inputText = document.querySelector("#findMovieInput").value.toLowerCase();
    let select = document.querySelector('#selector').value;
    
    matchMovie(inputText,select);
}

matchMovie = (inputText,select) =>{
    // Title 검색
    if(select=='titleOfMovie'){
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
    // ID 검색
    }else{
        let divs = document.querySelectorAll('.flip-box');
        let arr = [];
        divs.forEach(m=>{
            let id = m.getAttribute('id');
            if(id!=inputText){
                m.setAttribute("style","display: none;");
            }
        })
        return arr;
    }
    
}

function alertId(e){
    let id = e.getAttribute("id")
    alert('영화 ID : '+id);
}