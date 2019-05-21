const setAttributes = (el, attrs) => {
    Object.keys(attrs).forEach((attr) => {
        el.setAttribute(attr, attrs[attr])
    });
}

const createElement = (type) => {
    const textAreaField = document.createElement('textArea');
    const divGroup = document.createElement('div');
    const label = document.createElement('label');

    label.setAttribute('for', 'input');
    label.innerHTML = 'Extra text';
    divGroup.setAttribute('class', 'form-group');

    setAttributes(textAreaField, {
        'class': 'form-control',
        'type': type,
        'id': elementId++,
        'name': 'extraInput' + elementId,
    });

    divGroup.appendChild(label);
    divGroup.appendChild(textAreaField);

    return divGroup;
}

const input = createElement('input');

const articleRawData = document.getElementById('articleData').value;
const dataJSON = JSON.parse(articleRawData);

const pattern = /^extraInput*/;
const matchingKeys = Object.keys(dataJSON).filter((key) => pattern.test(key));

matchingKeys.forEach(el => {
    let n = createElement(dataJSON[`${el}`]);
});