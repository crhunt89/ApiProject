const baseURL = "https://rickandmortyapi.com/api/character/";
let section = document.querySelector('section');
let searchForm = document.querySelector('form');
let url;
let pageNumber = 1;
let displayNav = false;
let searchTerm = document.querySelector('.form-control');
searchForm.addEventListener('submit',submitSearch); 

function submitSearch(e){
    pageNumber = 1;
    fetchResults(e);
  }
  function fetchResults(e) { 
    e.preventDefault();
    url = baseURL + '?name=' + searchTerm.value + '&page=' + pageNumber; 
    fetch(url).then(function(result) {
      return result.json();
    }).then(function(json) {
      displayResults(json);
    });
  }

function displayResults(json) {
    while (section.firstChild) {
        section.removeChild(section.firstChild);
    }
    let results = json.results;
    if (results.length === 0) {
        let par = document.createElement('p')
        par.textContent('No content')
        section.appendChild(par);
    } else {
        for (let i = 0; i < results.length; i++) {
            let div = document.createElement('div');
            let img = document.createElement('img');
            let para1 = document.createElement('p');
            let para2 = document.createElement('p');
            let current = results[i];
            console.log(current.status);
            let status = 'Status:' + ' ' + current.status
            let name = 'Name:'+ ' ' + current.name
            para2.textContent = status;
            console.log(name);
            para1.textContent = name;
            div.setAttribute('class', 'searchResults');
            div.appendChild(img);
            div.appendChild(para1);
            div.appendChild(para2);
            section.appendChild(div);
            if (typeof current.image != 'undefined') {
                img.src = current.image;
                img.alt = 'https://rickandmortyapi.com';
                console.log(current.image);
            }
        }
    }
};
    let next = document.querySelector('#next');
    let previous = document.querySelector('#previous');
    next.addEventListener('click', nextPage);
    previous.addEventListener('click', prevPage);
    function nextPage(e) {
        pageNumber++;
        fetchResults(e);
        scroll(0,0);
    };
    function prevPage(e) {
        if (pageNumber > 1) {
            pageNumber--;
        } else {
            return;
        }
        fetchResults(e);
        scroll(0,0);
    };
    function playAudio(url) {
        let a = new Audio(url);
        a.play();
    }