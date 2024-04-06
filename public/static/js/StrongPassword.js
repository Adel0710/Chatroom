console.log('good1');
const passwordInput = document.querySelector('.passwordInput');
const passwordCheckList = document.querySelectorAll('.list-item');

const validationRegex = [
    { regex: /.{8,}/ },
    { regex: /[0-9]/ },
    { regex: /[a-z]/ },
    { regex: /[A-Z]/ },
    { regex: /[^A-Za-Z0-9]/ },
];

passwordInput.addEventListener('keyup', () => {
    const passwordInputValue = passwordInput.value; 
    validationRegex.forEach((item, i) => {
        let isValid = item.regex.test(passwordInputValue);
        if (isValid) {
            passwordCheckList[i].classList.add('checked');
        } else {
            passwordCheckList[i].classList.remove('checked');
        }
    });
});
