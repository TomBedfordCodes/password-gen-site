
// STRETCH GOALS: 
//      toggle symbols / numbers included - done
//      copy-on-click - done
//      set password length


const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", 
"U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", 
"s", "t", "u", "v", "w", "x", "y", "z"];

const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]

const symbols = ["~", "`", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "-", "+", 
"=", "{", "[", "}", "]", ",", "|", ":", ";", "<", ">", ".", "?", "/"]


let generatePasswordBtnEl = document.getElementById("generate-password-btn-el")
let includeNumbersEl = document.getElementById("include-numbers-el")
let includeSymbolsEl = document.getElementById("include-symbols-el")
let passwordBoxEl = document.getElementById("password-box-el")
let passwordCopiedEl = document.getElementById("password-copied-el")

let passwordLengthRangeEL = document.getElementById("password-length-range-el")
let lengthDisplayEl = document.getElementById("length-display-el")
lengthDisplayEl.textContent = "Length: " + passwordLengthRangeEL.value


generatePasswordBtnEl.addEventListener("click", function() {
    resetPasswordCopiedEl()
    let password = []
    if (includeNumbersEl.checked) {
        for (let i = 0; i < Math.floor(passwordLengthRangeEL.value / 3); i++) {
            index = Math.floor(Math.random() * numbers.length)
            password.push(numbers[index])
        }
    }
    if (includeSymbolsEl.checked) {
        for (let i = 0; i < Math.floor(passwordLengthRangeEL.value / 3); i++) {
            index = Math.floor(Math.random() * symbols.length)
            password.push(symbols[index])
        }
    }
    let len = passwordLengthRangeEL.value - password.length
    for (let i = 0; i < len; i++) {
        index = Math.floor(Math.random() * letters.length)
        password.push(letters[index])
    }
    // SHUFFLE PASSWORD ORDER
    shuffleArray(password)
    // DISPLAY PASSWORD
    displayPassword(password.join(""))
})



function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

function displayPassword(pw) {
    passwordBoxEl.hidden = false
    passwordBoxEl.textContent = pw
}


passwordBoxEl.addEventListener("click", function() {
    navigator.clipboard.writeText(passwordBoxEl.textContent);
    passwordCopiedEl.hidden = false
    setTimeout(function() {
        passwordCopiedEl.hidden = true
    }, 2000)
})


function resetPasswordCopiedEl() {
    passwordCopiedEl.hidden = true
}


includeNumbersEl.addEventListener("change", function() {
    resetPasswordCopiedEl()
})


includeSymbolsEl.addEventListener("change", function() {
    resetPasswordCopiedEl()
})


passwordLengthRangeEL.addEventListener("input", function() {
    resetPasswordCopiedEl()
    lengthDisplayEl.textContent = "Length: " + passwordLengthRangeEL.value
})
