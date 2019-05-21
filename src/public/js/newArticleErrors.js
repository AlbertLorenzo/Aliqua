const validateInputs = (inputs) => {
    let errors = [];
    errors[0] = 'Error no se pudo enviar el fomulario: '

    inputs.forEach(el => {
        if (el.value.length === 0) {
            errors.push(`\nCampo: ${el.id} vacío\n`);
        }
    });
    return errors.length > 1 ? errors.join('') : true;
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('new-article');
    const inputs = document.querySelectorAll('.form-control');

    document.getElementById('sendForm').addEventListener('click', () => {
        if (validateInputs(inputs) === true) {
            document.getElementById('new-article').submit();
        } else {
            sendAlert(validateInputs(inputs));
        }
    });
});