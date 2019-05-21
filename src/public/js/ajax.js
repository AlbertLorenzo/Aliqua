// Manejo de peticiones AJAX
const ajaxRequest = (data, method, action) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(`${method}`, `${action}`);
        xhr.onload = () => {
            resolve(xhr.responseText);
        };
        xhr.onerror = () => {
            reject(new Error(xhr.responseText));
        };
        xhr.setRequestHeader('content-type', 'application/json');
        xhr.send(data);
    });
};

const serializeForm = (form) => {
    const jsonObject = {};
    const formData = new FormData(form);
    formData.forEach((value, index) => { jsonObject[index] = value });
    return JSON.stringify(jsonObject);
}

const handlePromise = (promise) => {
    Promise.resolve(promise).then((response) => {
        console.log(response);
    }).catch((err) => {
        console.log(err);
    });
}

const checkFormFields = (formFields, formId) => {
    if (formId === 'log-user') {
        if (formFields['email'].length < 1) {
            sendAlert('Email vacío.');
            return false;
        } else if (formFields['password'].length < 1) {
            sendAlert('Contraseña vacía.');
            return false;
        } else {
            return true;
        }
    } else {
        if (formFields['email'].length < 1) {
            sendAlert('Email vacío.');
            return false;
        } else if (formFields['name'].length < 1) {
            sendAlert('Nombre vacío.');
            return false;
        } else if (formFields['password'].length < 1) {
            sendAlert('Contraseña vacía.');
            return false;
        } else {
            return true;
        }
    }
}

const handleAsyncFunction = async (fomdId, fnt) => {
    const response = await fnt;
    console.log(response);

    if (fomdId === 'log-user') {
        if (response !== 'Unauthorized') {
            sendAlert('Login correcto.');
            $('#loginModal').modal('toggle');
            document.getElementById('userOptions').style.display = 'block';
            localStorage.setItem('logedIn', response);
        } else {
            sendAlert('El usuario o la contraseña no existen.');
        }
    } else {
        if (response === 'userCreated') {
            sendAlert('Usuario creado.');
            $('#signupModal').modal('toggle');
        } else {
            sendAlert(response);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const forms = document.querySelectorAll('.form');
    forms.forEach(form => {
        form.addEventListener('submit', (event) => {
            const serializedForm = serializeForm(form);
            event.preventDefault();
            if (checkFormFields(JSON.parse(serializedForm), form.getAttribute('id'))) {
                handleAsyncFunction(form.getAttribute('id'), ajaxRequest(serializedForm, form.getAttribute('method'), form.getAttribute('action')));
            }
        });
    });
});