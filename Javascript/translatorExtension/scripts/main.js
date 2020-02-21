// set Listner for given elem with class
function setListner(className, func, type='click'){
    let elems  = document.getElementsByClassName(`${className}`);
    for(let i =0; i < elems.length; i++){
        elems[i].addEventListener(type,func);
    }
}

//Clear input and output when clicked
function clearAll(){
    document.getElementsByClassName('userInputField__input__textarea')[0].value= '';
    document.getElementsByClassName('outputFiled__output')[0].innerHTML= '';
    document.getElementsByClassName('outputField__additionalInfo')[0].innerHTML= '';
    document.getElementsByClassName('charCount__actualCount')[0].innerHTML = 0;
    localStorage.removeItem('userInputField__input__textarea');
}

//Showing "clear"
function showClear(event){
    let elem = document.createElement('p');
    elem.style.cssText=`
        position:absolute;
        top:${event.clientY}px;
        left:${event.clientX + 7}px;
        border-radius:5px;
        border: 1px solid #c4c4c4;
        border-left: 0;
        color: #c4c4c4;
        font-size: 1.2em;
        background-color:white;
    `;
    elem.innerText = 'Очистить';
    document.body.appendChild(elem);
}

//deleting 'clear'
function hideClear(){
    document.body.lastElementChild.remove();
}

//Counting user intup length and render in UI counter 
function charCount(){
    let charLength = document.getElementsByClassName('userInputField__input__textarea')[0].value.length;
    document.getElementsByClassName('charCount__actualCount')[0].innerHTML = charLength;
    if(charLength > 7000){
        document.getElementsByClassName('charCount__actualCount')[0].style.cssText = "color:red";
    }else{
        document.getElementsByClassName('charCount__actualCount')[0].style.cssText = "color: grey";
    }
}


//Showing languages list
async function showLang(){
    if(!document.getElementsByClassName('languageChoose__lang__list')[0]){
        await getLangs();
    }
    let list = document.getElementsByClassName('languageChoose__lang__list')[0];
    list.style.display ="flex";
}

// Hiding languages
function hideLangs(){
    let list = document.getElementsByClassName('languageChoose__lang__list')[0];
    list.style.display ="none";
}

//Seting language and hiding language list
function setLang(event){
    let lang = event.target;
    if(lang.tagName != "LI"){
        return '';
    }
    let uiElem = document.getElementsByClassName('languageChoose__lang_current')[0];
    uiElem.innerHTML = lang.innerHTML;
    uiElem.setAttribute('ui', lang.getAttribute('ui'));
    uiElem.classList.remove('languageChoose__lang_current');
    document.getElementsByClassName('currentLang')[0].classList.remove('currentLang');
    document.getElementsByClassName('languageChoose')[0].style.display = "flex";
    hideLangs();
}

//Choosing language - open lang list and highlight current language. 
async function chooseLang(event){
    await showLang();
    let currentUi = event.target;
    let listArr = document.getElementsByClassName('languageChoose__lang__list')[0].children[0].children;
    for(let i=0; i< listArr.length; i++){
        if(currentUi.getAttribute('ui') == listArr[i].getAttribute('ui')){
            listArr[i].classList.add('currentLang');
            break;
        }
        continue;
    }
    currentUi.classList.add('languageChoose__lang_current');
    if(currentUi != document.getElementsByClassName('languageChoose__lang')[0]){
        document.getElementsByClassName('languageChoose')[0].style.display = "none";
    }
}

//Close/Open aditional info. setting as listner on .fullinfo in "translator.js" within of function dictionaryResultRender
function tooggleShort(){
    let arr = ['outputField','outputField__upperLine', 'outputFiled__output', 'outputField__additionalInfo', 'outputField__additionalInfo__case', 'outputField__additionalInfo__case__otherOrigin', 'outputField__additionalInfo__case__example', 'outputField__lowerLine', ];
    arr.map(className=>{
        let elems = document.getElementsByClassName(`${className}`);
        for(let i=0, length=elems.length; i < length; i++){
            elems[i].classList.toggle(`${className}_short`);
        }
    });
    let icon = document.querySelector('.fullInfo img');
    icon.getAttribute('src') == './src/fullOpen.png' ? icon.setAttribute('src', './src/fullClose.png'): icon.setAttribute('src', './src/fullOpen.png');
}


//Drawing circle of loading
function drawLoading(degree=0){
    if(!!document.getElementById('loading')){
        let canvas = document.getElementById('loading');
        let ctx = canvas.getContext('2d');
        let x = (+getComputedStyle(canvas).width.split('px')[0] + 60) /2;
        let y = (+getComputedStyle(canvas).height.split('px')[0] + 40) /2;
        let radius = 50;
        let degrees;
        if(degree < 2){
        degrees = degree + 0.02;
        }else{
            ctx.clearRect(0,0,500,500);
            degrees = 0;
        }
        ctx.strokeStyle = '#F9C50C';
        ctx.lineWidth = 5;
        ctx.lineCap ='round';
        let startAngle = 0 ;
        let endAngle = Math.PI*degrees ;
        ctx.beginPath();
        ctx.arc(x,y,radius,startAngle,endAngle, false);
        ctx.stroke();
        setTimeout(drawLoading, 50,degrees);
    }else{
        console.log('removed, master');
    }
    
    
}

//Add circle of loading to output
function addLoading(){
    let canvas = document.createElement('canvas');
    canvas.setAttribute('id', 'loading');
    document.getElementsByClassName('outputField')[0].appendChild(canvas);
}

//Removing loading and stop animation
function delLoading(){
    document.getElementById('loading').remove();
}

//Saving user input until end of 10 minutes
function saveUserText(e){
    let elem = e.target;
    localStorage.setItem(e.target.classList[0], e.target.value);
    localStorage.setItem('timeOfText',new Date().getTime());

}


function returnUserText(){
    let date = new Date().getTime();
    let storedDate = localStorage.getItem('timeOfText');
    if(date - storedDate > 300000){
        localStorage.removeItem('userInputField__input__textarea');
        return '';
    }
    document.getElementsByClassName('userInputField__input__textarea')[0].value = localStorage.getItem('userInputField__input__textarea');
}

//Switch langs
function switchLangs(){
    let firstLang = document.getElementsByClassName('languageChoose__lang')[0];
    let intermediateState = {
        ui: firstLang.getAttribute('ui'),
        text: firstLang.innerHTML
    };
    let secondLang = document.getElementsByClassName('languageChoose__lang')[1];
    firstLang.setAttribute('ui', secondLang.getAttribute('ui'));
    firstLang.innerHTML = secondLang.innerHTML;
    secondLang.setAttribute('ui', intermediateState.ui);
    secondLang.innerHTML = intermediateState.text;
}