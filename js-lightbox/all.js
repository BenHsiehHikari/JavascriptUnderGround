let mList = document.querySelector('.list');
let modalBtn = document.querySelector('.modal-btn');
let overlay = document.querySelector('.overlay');
let modalBox = document.querySelector('.modal-box');
let closeBtn = document.querySelector('.close-btn');
let title = document.querySelector('.title');
let prev = document.querySelector('.prev-btn');
let next = document.querySelector('.next-btn');
let li = document.querySelectorAll('.item');
let picAll = document.querySelector('.pic-all');
let currentNum = document.querySelector('.current-num');

let imgPath = 'images';
let linkPath = 'images/large';

let currentIndex = 1;
currentNum.textContent = 1;

mList.addEventListener('click', modalHandler);
prev.addEventListener('click', prevHandler);
next.addEventListener('click', nextHandler);
closeBtn.addEventListener('click', closeHandler);

function modalHandler(e){
    e.preventDefault();

    if(e.target.nodeName == 'IMG'){
        overlay.style.display = 'block';
        modalBox.style.display = 'flex';

        let num = Number(e.target.dataset.num);
        currentIndex = num;
        currentNum.textContent = num;

        let largePic = `<img src="${linkPath}/pic-${currentIndex}.jpg" alt="" class="large-pic">`;
        picAll.innerHTML = largePic;
    }
}

function closeHandler(){
    overlay.style.display = 'none';
    modalBox.style.display = 'none';
}

function nextHandler(e){
    e.preventDefault();
    currentIndex++;
    currentNum.textContent = currentIndex;
    if(currentIndex > li.length){
        currentIndex = 1;
        currentNum.textContent = currentIndex;
    }
    changeImage();
}

function prevHandler(e) {
    e.preventDefault();
    currentIndex--;
    currentNum.textContent = currentIndex;
    if (currentIndex < 1) {
        currentIndex = li.length;
        currentNum.textContent = currentIndex;
    }
    changeImage();
}

function changeImage() {
    let changePic = `<img src="${linkPath}/pic-${currentIndex}.jpg" alt="" class="large-pic">`;
    picAll.innerHTML = changePic;
}
