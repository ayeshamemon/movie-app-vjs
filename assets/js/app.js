
const API_KEY = 'f7f16a80edfcdf0131a965c050d9b6a0';
const url = 'https://api.themoviedb.org/3/search/movie?api_key=f7f16a80edfcdf0131a965c050d9b6a0';

const IMG_URL = 'https://image.tmdb.org/t/p/w500';


//select element from dom


const buttonElement = document.querySelector('#search');

const inputElement = document.querySelector('#inputValue');

const movieSearchable = document.querySelector('#movies-searchable');

/*

 <div class="movie">
            <section>
                <img src="" alt="">
            </section>

            <div class="content">
                <p></p>
            </div>

        </div>

*/


function createMovieElement(movies){

    const movieElement = document.createElement('div');
    movieElement.setAttribute('class','movie');

    const movieTemplate = `

    <section>
        ${movies.map((movie) => {
            if(movie.poster_path){
            return `<img 
            src= ${IMG_URL + movie.poster_path} data-movie-id = ${movie.id}/>
            `
            }
        })}
    </section>

    <div class="content">
        <p id="content-close">X</p>
    </div>

    `

    movieElement.innerHTML = movieTemplate;

    return movieElement;


}

function renderSearchMovies(data){
    movieSearchable.innerHTML = "";
    const movieBlock = createMovieElement(data.results);

    movieSearchable.appendChild(movieBlock);
    console.log('Data',data);
}

buttonElement.onclick = function(event) {
    event.preventDefault();
    const value = inputElement.value;

    const newUrl = url + '&query=' + value;
    //search movie
    fetch(newUrl)
        .then((res) => 
            res.json()
        )
        .then(renderSearchMovies)
        .catch((error) => {
            console.log('Error',error);
        });

    
    
    inputElement.value = "";
    console.log(value);
    
}

function createIframe(video){
    const iframe =  document.createElement('iframe');
    iframe.src = `https://youtube.com/embed/${video.key}`;
    iframe.width = 360;
    iframe.height = 315;
    iframe.allowFullscreen = true;

    return iframe;
}

function createVideoTemplate(data,content){

    content.innerHTML = `<p id="content-close">X</p>`;

    console.log(data);

            const videos = data.results;
            
            const length = videos.length > 4 ? 4 : videos.length;
            const iframeContainer = document.createElement('div');
            //console.log(iframeContainer);

            for(let i= 1; i < length ; i++){

                const video = videos[i];
                const iframe = createIframe(video);
                iframeContainer.appendChild(iframe);
                
                content.appendChild(iframeContainer);

            }

}

document.onclick = function(event){

    const target = event.target;

    if(target.tagName.toLowerCase() === 'img'){

        console.log('Hello World');
        const movieId = target.dataset.movieId;
        console.log(movieId);
        const section = event.target.parentElement;
        const content = section.nextElementSibling;

        content.classList.add('content-display'); 

        //fetch videos

        const VIDEO_URL = `https://api.themoviedb.org/3/movie/${movieId}videos?api_key=f7f16a80edfcdf0131a965c050d9b6a0`;

        fetch(VIDEO_URL)
        .then((res) => 
        res.json()
        )
        .then((data) => createVideoTemplate(data,content))
        .catch((error) => {
        console.log('Error',error);
        });



    }

    if(target.id === 'content-close'){
        const content = target.parentElement;
        content.classList.remove('content-display');
    }
}