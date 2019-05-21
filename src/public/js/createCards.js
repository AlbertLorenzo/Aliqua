const articleData = document.getElementById('jsonDATA').innerHTML;
const objJSON = JSON.parse(articleData);

const createJsElement = (el) => document.createElement(el);

const addJumbotron = (el) => {
    return `<br><div id="jumbotron" class="card_card−article"
    data−target="${el._id}"> <div class="jumbotron_jumbotron−fluid"
    id="jumbotronImg" style="background-image: url(${el.routeImg})">
    <div class="container">
        <h5 class="text−center" id="jumbotronTitle">
            ${el.title}
        </h5>
        <p class="lead_text−center" id="jumbotronLead">
            ${el.lead}
        </p>
    </div>
    </div>
    </div>`
}

const addBanner = (el) => {
    return `<br><div class="card card-article mb-3" data-target="${el._id}" id="bannerTarget">
            <div class="row no-gutters">
                <div class="col-md-4">
                    <img src="${el.routeImg}" class="card-img" alt="" id="bannerImg">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title" id="bannerTitle">${el.title}</h5>
                        <p class="card-text" id="bannerLead">${el.lead}</small></p>
                    </div>
                </div>
                </div>
            </div>`
}

const addOnlyTextCard = (el) => {
    return `<div class="card p-3 card-article" data-target="${el._id}">
    <blockquote class="mb-0 card-body">
    <p>${el.title}
    </p>
    <h5 class="blockquote-footer"><small class="text-muted"><cite title="Source Title">${el.author}</cite></small></h5></blockquote></div>`
} 

const addOnlyImageCard = (el) => {
    return `<div data-target="${el.routeImg}" class="card card-article"><img class="card-img" src="${el.routeImg}" alt="Card Image"></div>`
} 

const addCard = (el) => {
    return `<div class="card card-article" data-target="${el._id}"><img class="card-img-top" src="${el.routeImg}" alt="Card image cap"><div class="card-body">
        <h5 class="card-title">Introducing Hooks</h5>
        <p class="card-text">Hooks are a new addition in React 16.8. They let you use state and other React features without writing a class.
        </p>
        </div>
    </div>`
}

const setJumbotron = (el) => {
    const bannerIds = document.querySelectorAll('#jumbotron, #jumbotronTitle, #jumbotronLead, #jumbotronImg');

    setAttributes(bannerIds[0], {
        'data-target': `${el._id}`
    });

    bannerIds[1].setAttribute('style', `background-image: url(${el.routeImg})`);
    bannerIds[2].innerHTML = `${el.title}`;
    bannerIds[3].innerHTML = `${el.lead}`;
}

const setBanner = (el) => {
    const bannerIds = document.querySelectorAll('#bannerImg, #bannerTitle, #bannerLead, #bannerAuthor, #bannerTarget');

    bannerIds[0].setAttribute('data-target', `${el._id}`);
    bannerIds[1].setAttribute('src', `${el.routeImg}`);
    bannerIds[2].innerHTML = `${el.title}`;
    bannerIds[3].innerHTML = `${el.lead}`;
    bannerIds[4].innerHTML = `${el.author}`;
}

const cardTypeImage = (parent, el) => {
    const div = createJsElement('div');
    const img = createJsElement('img');
    const h5 = createJsElement('h5');
    const p = createJsElement('p');

    const card = div.cloneNode(true);
    const cardBody = div.cloneNode(true);

    cardBody.setAttribute('class', 'card-body');

    setAttributes(card, {
        'class': 'card card-article',
        'data-target': `${el._id}`
    });

    setAttributes(img, {
        'class': 'card-img-top',
        'src': `${el.routeImg}`,
        'alt': 'Card image cap'
    });

    h5.setAttribute('class', 'card-title');
    h5.innerHTML = `${el.title}`;
    p.setAttribute('class', 'card-text');
    p.innerHTML = `${el.lead}`;

    cardBody.appendChild(h5);
    cardBody.appendChild(p);

    card.appendChild(img);
    card.appendChild(cardBody);

    const rnd = Math.floor(Math.random() * 2);

    if (rnd === 0) {
        const cardText = createJsElement('p');
        cardText.setAttribute('class', 'card-text');
        const small = createJsElement('small');
        small.setAttribute('class', 'text-muted');
        small.innerHTML = 'Last updated 3 mins ago';

        cardText.appendChild(small);
        cardBody.appendChild(cardText);
    }

    parent.appendChild(card);
}

const cardTypeOnlyText = (parent, el) => {
    const div = createJsElement('div');
    const blockquote = createJsElement('blockquote');
    const footer = createJsElement('h5');
    const small = createJsElement('small')
    const p = createJsElement('p');

    const card = div.cloneNode(true);

    setAttributes(card, {
        'class': 'card p-3 card-article',
        'data-target': `${el._id}`
    });

    blockquote.setAttribute('class', 'mb-0 card-body');
    p.innerHTML = el.lead;
    footer.setAttribute('class', 'blockquote-footer');
    small.setAttribute('class', 'text-muted');
    small.innerHTML = `<cite title="Source Title">${el.author}</cite>`;

    footer.appendChild(small);
    blockquote.appendChild(p);
    blockquote.appendChild(footer);

    card.appendChild(blockquote);
    parent.appendChild(card);
}

const cardTypeFullImage = (parent, el) => {
    const div = createJsElement('div');
    const img = createJsElement('img');

    const card = div.cloneNode(true);

    card.setAttribute('data-target', `${el._id}`);

    setAttributes(img, {
        'class': 'card-img',
        'src': `${el.routeImg}`,
        'alt': 'Card Image',
    });

    card.setAttribute('class', 'card card-article');
    card.appendChild(img);
    parent.appendChild(card);
}

document.addEventListener('DOMContentLoaded', () => {
    const cardColumns = document.getElementById('card-columns');
    objJSON.forEach((el, i) => {

        if (i === 0) {
            setJumbotron(el);
        }

        if (i === 1) {
            setBanner(el);
        }

        if (i >= 2) {
            let num = Math.floor(Math.random() * 3);
            switch (num) {
                case 0:
                    cardTypeImage(cardColumns, el);
                    break;

                case 1:
                    cardTypeOnlyText(cardColumns, el);
                    break;

                case 2:
                    cardTypeFullImage(cardColumns, el);
                    break;

                default:
                    break;
            }
        }

    });

    const cards = document.querySelectorAll('.card-article');

    cards.forEach(card => {
        card.addEventListener('click', () => {
            const id = event.currentTarget.dataset.target;
            let form = document.createElement('form');
            let articleId = '/article/' + id;

            setAttributes(form, {
                'method': 'GET',
                'action': articleId,
                'target': '_self'
            });

            let hiddenId = document.createElement('input');

            setAttributes(hiddenId, {
                'type': 'hidden',
                'name': 'message',
                'value': 'val'
            });

            form.appendChild(hiddenId);
            document.body.appendChild(form);
            form.submit();
        });
    });

});