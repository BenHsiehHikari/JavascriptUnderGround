const secondHand = document.querySelector('.second-hand');
const minHand = document.querySelector('.min-hand');
const hourHand = document.querySelector('.hour-hand');

function setDate() {
    const now = new Date();
    const seconds = now.getSeconds();
    let secondsDegress = (360 / 60) * seconds + 90;
    secondHand.style.transform = setRotate(secondsDegress);


    const mins = now.getMinutes();
    let minsDegress = (360 / 60) * mins + (6 / 60) * seconds + 180;
    minHand.style.transform = setRotate(minsDegress);

    const hours = now.getHours();
    let hourDegress = (360 / 12) * (hours % 12) + (30 / 60) * mins + 270;
    hourHand.style.transform = setRotate(hourDegress);
}
//GuaHsu 若傳入角度為0，則不顯示動畫效果避免354~0的rotate反彈跳
function setRotate(deg) {
    if (deg === 0) {
        document.querySelector('.hand').style.transition = 'all 0s';
    } else {
        document.querySelector('.hand').style.transition = 'all 0.05s';
    }
    return `rotate(${deg}deg)`;
}

setInterval(setDate, 1000);