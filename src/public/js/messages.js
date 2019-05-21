document.addEventListener('DOMContentLoaded', () => { 
    if(document.getElementById('success_msg')) {
        sendAlert(document.getElementById('success_msg').innerHTML);
    } 
});