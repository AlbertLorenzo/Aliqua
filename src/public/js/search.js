const searchBox = document.getElementById('searchBox');
const searchResult = document.getElementById('searchResult');
const searchBtn = document.getElementById('searchBtn');
const form = document.getElementById('searchForm');
const closeBtn = document.getElementById('closeBtn');
const searchIndicator = document.getElementById('searchIndicator');

const removeElements = (elements) => elements.forEach(element => element.remove());

const addJsonDataToList = (data) => {
    let li = document.createElement('li');
    let a = document.createElement('a');
    li.setAttribute('class', 'listItem');
    data.forEach(element => {
        cloneA = a.cloneNode(false);
        cloneLi = li.cloneNode(false);
        cloneA.innerText = element.title;
        cloneA.setAttribute('href', `/article/${element._id}`);
        cloneLi.appendChild(cloneA);
        document.getElementById('myUL').appendChild(cloneLi);
    });
}

const searchEngine = (input) => {
    const li = document.getElementById('myUL').querySelectorAll('.listItem');
    console.log(li);
    let filter = input.value.toLowerCase();
    li.forEach((element) => {
        let txtValue = element.childNodes[0].innerText;
        if (txtValue.toLowerCase().includes(filter)) {
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }
    });
}

searchBtn.addEventListener('click', () => {
    addJsonDataToList(objJSON);
    searchBox.style.display = 'block';
    const input = document.getElementById('searchBar');
    input.addEventListener('keyup', () => {
        if (input.value.length >= 1) {
            searchResult.style.display = 'block';
        } else {
            searchResult.style.display = 'none';
        }
        searchEngine(input);
    });
});

closeBtn.addEventListener('click', () => {
    searchResult.style.display = 'none';
    searchBox.style.display = 'none';
    removeElements(document.querySelectorAll('.listItem'));
});