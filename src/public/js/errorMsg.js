document.addEventListener('DOMContentLoaded', () => { 
    if(document.getElementById('error_msg')) {
        sendAlert(document.getElementById('error_msg').innerHTML);
    } 

    if (document.getElementById('error')) {
        sendAlert(document.getElementById('error').innerHTML);
    }
});