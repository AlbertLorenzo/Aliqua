document.addEventListener('DOMContentLoaded', () => {
    const logedOffs = document.querySelectorAll('.logedOff');
    const logedOk = document.querySelectorAll('.logedOk');

    if (localStorage.getItem('cookie') === null || localStorage.getItem('cookie') === 'null') {
        sendCookieConfirm('Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'Cookies');
    }

    if (localStorage.getItem('logedIn') === null || localStorage.getItem('logedIn') === 'null') {
        document.getElementById('userOptions').style.display = 'none';
    } else {
        document.getElementById('userOptions').style.display = 'block';
    }
});