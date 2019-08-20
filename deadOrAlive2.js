
let section = document.querySelector('section')
let searchForm = document.querySelector('form');
let pageNumber = 0;
let displayNav = false;

searchForm.addEventListener('submit', function (e) {
    let searchTerm = document.querySelector('.form-control').value;
    fetch('https://rickandmortyapi.com/api/character/?name=' + searchTerm)
        .then(result => {
            return result.json();
        })
        .then(json => {
            // console.log(json)
            displayResults(json);
        })
    e.preventDefault();
});
function displayResults(json) {
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
            let status = current.status
            let name = current.name
            para2.textContent = status;
            console.log(name);
            para1.textContent = name;
            div.setAttribute('class', 'searchResults');
            div.appendChild(para1);
            div.appendChild(para2);
            section.appendChild(div);
            div.appendChild(img);
            if (typeof current.image != 'undefined') {
                img.src = current.image;
                img.alt = 'https://rickandmortyapi.com';
                console.log(current.image);
            }

        }
    }
};