if(!localStorage.getItem('dictApiKey') || !localStorage.getItem('transApiKey')){
    console.log('Sorry we need key, master');
    let page = document.createElement('div');
    page.classList.add('initial__page');
    page.innerHTML=`
        <textarea class="initial__page__ApiKey initial__page__transApiKey" placeholder="Введите API-ключ Яндекс.Переводчик">${localStorage.getItem('initial__page__transApiKey')? localStorage.getItem('initial__page__transApiKey'):''}</textarea>
        <p class="help transApiKey__help">Как получить ключ?</p> 
        <ol class="help__tranApiKey__list">
        <li>Войдите в почту Яндекс и Перейдите по <a target="_blank" href="https://translate.yandex.ru/developers/keys"> ссылке</a></li>
        <li><img src="./src/help1.png"/></li>
        <li><img src="./src/help2.png"/></li>
        <li><img src="./src/help3.png"/></li>
        <li> Вставьте ключ в поле выше </li>
        </ol>
        <textarea class="initial__page__ApiKey initial__page__dictApiKey" placeholder="Введите API-ключ Яндекс.Словарь">${localStorage.getItem('initial__page__dictApiKey')? localStorage.getItem('initial__page__dictApiKey'):''}</textarea>
        <p class="help dictApiKey__help">Как получить ключ?</p>
        <ol class="help__dictApiKey__list">
        <li>Войдите в почту Яндекс и Перейдите по <a target="_blank" href="https://yandex.ru/dev/keys/get/?service=dict"> ссылке</a></li>
        <li><img src="./src/help4.png"/></li>
        <li><img src="./src/help5.png"/></li>
        <li> Вставьте ключ в поле выше </li>
        </ol>
        <button class="initial__page__submit">Отправить</button>
    `;
    document.body.appendChild(page);
    setListner('initial__page', showHelp);
    setListner('initial__page', sizingImg);
    setListner('initial__page__submit', checkKeys);
    setListner('initial__page__transApiKey',saveInput,'keyup');
    setListner('initial__page__dictApiKey',saveInput,'keyup');
    setListner('initial__page__transApiKey',saveInput,'change');
    setListner('initial__page__dictApiKey',saveInput,'change');

}

// Showing, toggle or closing help info
function showHelp(event){
    let dictApiKey__help = document.getElementsByClassName('help__dictApiKey__list')[0];
    let transApiKey__help = document.getElementsByClassName('help__tranApiKey__list')[0];
    if (event.target.classList.contains('help')){
        // Checking current opened info and target element 
        if((getComputedStyle(dictApiKey__help).display == 'flex' && event.target.classList.contains('dictApiKey__help')) || (getComputedStyle(transApiKey__help).display == 'flex' && event.target.classList.contains('transApiKey__help')) ){
            dictApiKey__help.style.display='none';
            transApiKey__help.style.display='none';
        }else if(event.target.classList.contains('dictApiKey__help')){
            transApiKey__help.style.display='none';
            dictApiKey__help.style.display='flex';
        }else{
            dictApiKey__help.style.display='none';
            transApiKey__help.style.display='flex';
        }
    }
}

//Sizing up image in list and adding caption for closing
function sizingImg(event){
    let elem = event.target;
    if(elem.tagName == 'IMG'){
        elem.classList.toggle('img_big');
        let caption;
        if(elem.classList.contains('img_big')){
            caption = document.createElement('p');
            caption.classList.add('img_caption');
            caption.innerText="Чтобы закрыть нажмите на скриншот";
            elem.parentElement.appendChild(caption);
        }else{
            caption = document.getElementsByClassName('img_caption')[0];
            caption.remove();
        }
    }
}

// Checking work of keys and storing their in localStore
async function checkKeys(){
    let transApiKey = document.getElementsByClassName('initial__page__transApiKey')[0].value;
    let dictApiKey = document.getElementsByClassName('initial__page__dictApiKey')[0].value;
    const urlTrans = "https://translate.yandex.net/api/v1.5/tr.json/";
    const urlDict = "https://dictionary.yandex.net/api/v1/dicservice.json/";
    let response;
    let responseDict;
    try{
        response = await fetch(`${urlTrans}getLangs?key=${transApiKey}`);
        if(response.status == 403){
            document.getElementsByClassName('transApiKey__help')[0].innerHTML +='<span class="invalid_key">Неверный ключ. Проверьте написание!</span>';
            let answer = await response.json();
            throw new Error(answer.message);
        }else if(response.ok){
            localStorage.setItem('transApiKey',transApiKey);
        }
    }catch(e){
            console.log(e);}
    try{
        responseDict = await fetch(`${urlDict}getLangs?key=${dictApiKey}`); 
        if(responseDict.status == 403){
            document.getElementsByClassName('dictApiKey__help')[0].innerHTML +='<span class="invalid_key">Неверный ключ. Проверьте написание!</span>';
            let answer = await responseDict.json();
            throw new Error(answer.message);
        }else if(response.ok){
            localStorage.setItem('dictApiKey', dictApiKey);
        }

        if(response.ok && responseDict.ok){
            console.log('It\'s correct, master');
            
            
            document.getElementsByClassName('initial__page')[0].remove();
        }
    }catch(e){
        console.log(e);
    }
}

//Remember last user input
function saveInput(e){
    localStorage.setItem(e.target.classList[1],e.target.value);
    
}