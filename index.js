let sliderValue = document.querySelector('#slider-id');
let passLenNumber = document.querySelector('[password-length-number]');

// initializing slider and syncing with the number 
sliderValue.value = 10;
passLenNumber.innerText = sliderValue.value;

sliderValue.addEventListener("input", () => {
    passLenNumber.innerText = sliderValue.value;
});


// case arry which represents the which checkbox is selected 
let len = 1;
let lower = false;
let upper = true;
let symbol = false;
let num = false;
let lowerCase = document.getElementById("lower-case");
let upperCase = document.getElementById("upper-case");
let numberCase = document.getElementById("numbers");
let symbolCase = document.getElementById("symbols");
lowerCase.addEventListener("click", () => {
    if (lowerCase.checked) {
        len++;
        lower = true;
    } else {
        len--;
        lower = false;
    }
});
upperCase.addEventListener("click", () => {
    if (upperCase.checked) {
        len++;
        upper = true;
    } else {
        len--;
        upper = false;
    }
});
numberCase.addEventListener("click", () => {
    if (numberCase.checked) {
        len++;
        num = true;
    } else {
        len--;
        num = false;
    }
});
symbolCase.addEventListener("click", () => {
    if (symbolCase.checked) {
        len++;
        symbol = true;
    } else {
        len--;
        symbol = false;
    }
});



// random number generater function ... 
function generateRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function getRandomNumber() {
    return generateRandom(0, 9);
}
function getRandomLowerCase() {
    return String.fromCharCode(generateRandom(97, 123));
}
function getRandomUpperCase() {
    return String.fromCharCode(generateRandom(65, 91));
}
const symbolsArr = "!@#$%^&*()_+}{:<>?,./*~";
function getRandomSymbols() {
    const randNum = generateRandom(0, symbolsArr.length);
    return symbolsArr.charAt(randNum);
}
let myPassword = "";
let passBox = document.getElementById("pass-box");

// generate password button 
let generatePass = document.getElementById("generate-passid");
generatePass.addEventListener("click", () => {


    if (len <= 0) {
        indicator.style.backgroundColor = "white";
        indicator.style.border = "1px solid black";
        indicator.style.boxShadow = "none";
        myPassword = "";
        passBox.value = myPassword;
        return;
    }

    let passLen = 0;
    if (len > sliderValue.value) {
        sliderValue.value = len;
        passLenNumber.innerText = len;
        passLen = len;
    } else {
        passLen = sliderValue.value;
    }

    //finding new password here ....
    myPassword = "";

    let myfunArray = [];
    if (upper) {
        myfunArray.push(getRandomUpperCase);
    }
    if (lower) {
        myfunArray.push(getRandomLowerCase);
    }
    if (symbol) {
        myfunArray.push(getRandomSymbols);
    }
    if (num) {
        myfunArray.push(getRandomNumber);
    }

    for (let i = 0; i < myfunArray.length; i++) {
        myPassword += myfunArray[i]();
    }
    for (let i = 0; i < passLen - myfunArray.length; i++) {
        let ind = generateRandom(0, myfunArray.length);
        myPassword += myfunArray[ind]();
    }

    myPassword = sufflePassword(Array.from(myPassword));
    passBox.value = myPassword;
    passwordStrengthCheck();

});
function sufflePassword(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    let str = "";
    arr.forEach(element => {
        str += element;
    });
    return str;
}
let indicator = document.getElementById("indi");
function passwordStrengthCheck() {

    if (myPassword.length >= 8 && len > 3) {
        indicator.style.backgroundColor = "green";
        indicator.style.boxShadow = "0px 0px 10px rgb(24, 80, 6)";
        indicator.style.border = "none";
    } else if (myPassword.length >= 8 && len > 2) {
        indicator.style.backgroundColor = "yellow";
        indicator.style.boxShadow = "0px 0px 10px rgb(180, 180, 12)";
        indicator.style.border = "none";
    } else {
        indicator.style.backgroundColor = "red";
        indicator.style.boxShadow = "0px 0px 10px rgb(155, 11, 11)";
        indicator.style.border = "none";
    }
}

let copyBtn=document.getElementById("copy-btn");
let copied=document.getElementById("copied");
copyBtn.addEventListener("click",copyContent);
async function copyContent(){
    if(myPassword.length<=0) return;

    try{
        await navigator.clipboard.writeText(passBox.value);
        copied.innerText="Copied";
        setTimeout(()=>{
            copied.innerText="";
        }, 2000);
    }catch(e){
        copied.innerText="Failed";
        setTimeout(()=>{
            copied.innerText="";
        }, 2000);
    }
}