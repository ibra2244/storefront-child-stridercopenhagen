const cookieStorage = {
    getItem: (item) => {
        const cookies = document.cookie
            .split(';')
            .map(cookie => cookie.split('='))
            .reduce((acc, [key, value]) => ({ ...acc, [key.trim()]: value }), {});
        return cookies[item];
    },
    setItem: (item, value) => {
        document.cookie = `${item}=${value};`
    }
}

const consentItem = 'strider_consent';
const showPopup = () => !cookieStorage.getItem(consentItem);
const saveToStorage = () => cookieStorage.setItem(consentItem, true);

window.onload = () => {

    const consentPopup = document.getElementById('consent-popup');
    const acceptBtn = document.getElementById('accept');
    
    const acceptFn = event => {
        saveToStorage(cookieStorage);
        consentPopup.classList.add('hidden');
    }
    acceptBtn.addEventListener('click', acceptFn);

    if (showPopup(cookieStorage)) {
        setTimeout(() => {
            consentPopup.classList.remove('hidden');
        }, 2000);
    }

};