document.addEventListener('DOMContentLoaded', () => {
    const articleData = document.getElementById('articleData').innerHTML;
    const objJSON = JSON.parse(articleData);

    document.getElementById('articleTitle').innerHTML = objJSON.title;
    document.getElementById('articleLead').innerHTML = objJSON.lead;

    const p = document.createElement('p');

    p.innerHTML = objJSON.body;

    document.getElementById('articleInfo').appendChild(p);
});