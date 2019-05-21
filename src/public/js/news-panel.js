// Variable para identificar las ID de forma única
let elementId = 0;

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
        'name': 'extraInput'+elementId,
    });

    divGroup.appendChild(label);
    divGroup.appendChild(textAreaField);

    return divGroup;
}

const addInputField = (type) => {
    const textAreaField = createElement(type);
    document.getElementById('new-article').insertBefore(textAreaField, document.getElementById('sendForm'));
}

document.addEventListener('DOMContentLoaded', () => {
    const btns = document.querySelectorAll('.btn');

    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            switch (event.currentTarget.dataset.pointer) {
                case 'text':
                    addInputField('text');
                    break;
                case 'img':
                    addInputField('file');
                    break;

                default:
                    break;
            }
        });
    });
    
});