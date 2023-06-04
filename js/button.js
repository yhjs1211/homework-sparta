function findMovieButton(){
    let inputText = document.querySelector("#findMovieInput").value.toLowerCase().split(' ').join('');
    let select = document.querySelector('#selector').value;
    select=='titleOfMovie' ? matchMovie(inputText) : matchId(inputText);
}

matchMovie = (inputText) =>{
    let movies = document.querySelectorAll("#movieTitle");
    
    let found = [...movies].filter(v=>v.innerHTML.toLowerCase().split(' ').join('').includes(inputText));

    if(found.length==0 || inputText.length==0){
        alert('해당 영화 제목을 찾을 수 없습니다.');
    }else{
        movies.forEach(m=>{
            let title = m.textContent.toLowerCase().split(' ').join('');
            if(!title.includes(inputText)){
                let displayNone = m.closest('.flip-box');
                displayNone.setAttribute("style","display: none;");
            }
        })
    }
}

matchId = function(input){
    let divs = document.querySelectorAll('.flip-box');
    let found = Array.from(divs).find(v=>v.getAttribute('id')==input);

    if(found==undefined || input.length==0){
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

const moveDetailPage = (data) => {
    const movieId = data.getAttribute('id');
    const param = `?id=${movieId}`;
    window.location.href=`./detail.html${param}`;
}