
const urlTrans = "https://translate.yandex.net/api/v1.5/tr.json/";
const urlDict = "https://dictionary.yandex.net/api/v1/dicservice.json/";

// Return API keys from localStorage
function getKeys(){
    return {
        transApiKey: localStorage.getItem('transApiKey'),
        dictApiKey: localStorage.getItem('dictApiKey')
    }
}

function getText(){
    return document.getElementsByClassName('userInputField__input__textarea')[0].value;
}

//It request languages from Yandex.Translator and render their on page
async function getLangs(){
    const transApiKey = getKeys().transApiKey; 
    try{
        let response = await fetch(`${urlTrans}getLangs?key=${transApiKey}&ui=ru`);
        if (response.ok){
        let answer = await response.json();
        addLangs(answer);
        return 'done,master';
        }
        throw new Error('something bad');
    }catch(e){
        console.log(e);
    }
    
}

// rendering languages on page
function addLangs(langs){
    let elem = document.createElement('div');
    elem.classList.add('languageChoose__lang__list');
    let result = '<ul>';
    for( i in langs.langs){
        result+= `<li ui=${i}>${langs.langs[i]}</li>`;
    }
    result+='</ul>';
    elem.innerHTML = result;
    console.log('Language list - done');
    document.body.appendChild(elem);
    elem.addEventListener('click',setLang); 
}

//Checking one or more words entered by the user
function itsOneWord(text){
    let arr = text.split(' ').filter(word=>{
        return word.length>0? true:false;
    });
    return arr.length>1? false:true;
    
}

//Taking translation. If it's one word used Dictionary with examples.  
async function getTranslate(){
    const transApiKey = getKeys().transApiKey; 
    const dictApiKey = getKeys().dictApiKey;
    let text =  getText();
    let lang = `${document.getElementsByClassName('languageChoose__lang')[0].getAttribute('ui')}-${document.getElementsByClassName('languageChoose__lang')[1].getAttribute('ui')}`;
    try{   
        addLoading();
        drawLoading();
        if(itsOneWord(text)){
            let response = await fetch(`${urlDict}lookup?key=${dictApiKey}&lang=${lang}&text=${text}&ui=ru`);
            let answer = await response.json();
            console.log(answer);
            delLoading();
            if(response.status == 400){
                throw new Error(`${answer.message}`);
            }
            dictionaryResultRender(answer);
        }else{
            let response = await fetch(`${urlTrans}translate?key=${transApiKey}&lang=${lang}&text=${text}`);
            let answer = await response.json();
            console.log(answer);
            delLoading();
            if(response.status == 400){
                throw new Error(`${answer.message}`);
            }
           translateRresultRender(answer);
        }
    }catch(e){
        console.log(e);
        showAlert(`${e}`); 
    }
}

// rendreing results from response of dictionary
function dictionaryResultRender(answer){
    let transRes = document.getElementsByClassName('outputFiled__output')[0];
    if(transRes.classList.contains('outputFiled__output_transResult')){
        transRes.classList.remove('outputFiled__output_transResult');
    }
    let rawArr = answer.def;
    let addInfo ="";
    for(let i=0; i < rawArr.length; i++){
        let syn = "";
        let synOrigin ="";
        let example =""
        if(!!rawArr[i].tr[0].ex){
            example = rawArr[i].tr[0].ex[0].text;
        }
        for(let j=0; j < rawArr[i].tr.length; j++){
            syn += `${rawArr[i].tr[j].text}, `;
            if(!!rawArr[i].tr[j].mean){
            synOrigin += `${rawArr[i].tr[j].mean[0].text}, `;
            }
        }
        addInfo += `<div class="outputField__additionalInfo__case outputField__additionalInfo__case_short">
                        <p class="outputField__additionalInfo__case__text">${rawArr[i].text} <span> [${rawArr[i].ts}] </span><span> ${rawArr[i].pos}</span></p>
                        <p class="outputField__additionalInfo__case__other">${syn}</p>
                        <p class="outputField__additionalInfo__case__otherOrigin outputField__additionalInfo__case__otherOrigin_short">(${synOrigin})</p>
                        <p class="outputField__additionalInfo__case__example outputField__additionalInfo__case__example_short">Пример: ${example? example: ''}</p>
                    </div> 
                        `;
        
    }
    document.getElementsByClassName('outputFiled__output')[0].innerHTML = rawArr[0].tr[0].text +'<div class="fullInfo"><img src="./src/fullOpen.png" /></div>';
    setListner('fullInfo', tooggleShort);
    document.getElementsByClassName('outputField__additionalInfo')[0].innerHTML = addInfo;
}

// Render translate Result
function translateRresultRender(answer){
    let transRes = document.getElementsByClassName('outputFiled__output')[0];
    if(!transRes.classList.contains('outputFiled__output_transResult')){
        transRes.classList.add('outputFiled__output_transResult');
    }
    document.getElementsByClassName('outputFiled__output')[0].innerHTML = answer.text[0];
    document.getElementsByClassName('outputField__additionalInfo')[0].innerHTML = '';
}

//Show alert in input filed with given text
function showAlert(str='Ошибка в написании'){
    document.getElementsByClassName('alert__text')[0].innerText = str;
    document.getElementsByClassName('alert')[0].style.display = 'flex';
    setTimeout(()=>{
        document.getElementsByClassName('alert')[0].style.display = 'none';
    },3000);
}