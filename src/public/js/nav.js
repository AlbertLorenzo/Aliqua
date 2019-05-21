document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('logedIn') === null || localStorage.getItem('logedIn') === 'null') {
        document.getElementById('userOptions').style.display = 'none';
    } else {
        document.getElementById('userOptions').style.display = 'block';
    }
});