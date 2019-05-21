const sendCookieConfirm = (param) => {
    vex.dialog.confirm({
        message: param,
        callback: (value) => {
            if (value) {
                localStorage.setItem('cookie', true);
            } else {
                localStorage.setItem('cookie', null);
            }
        }
    })
}

const sendAlert = (param) => {
    vex.dialog.alert({
        message: param
    })
}