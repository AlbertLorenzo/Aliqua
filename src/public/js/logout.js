document.addEventListener('DOMContentLoaded', () => {
    const logoutBtn = document.querySelectorAll('.logout');
    if (logoutBtn.length > 0) {
        logoutBtn[0].addEventListener('click', () => {
            localStorage.removeItem('logedIn');
        });
    }
});