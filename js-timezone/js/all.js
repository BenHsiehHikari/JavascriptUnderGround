const $timezone = document.querySelectorAll('.timezone');
const place = ['NEW YORK', 'LONDON', 'BANGKOK', 'TAIWAN', 'SYDNEY'];
const zone = [-5, 0, 7, 8, 11];

function getLocalTime(i) {
    if (typeof i !== 'number') return;
    var d = new Date();
    var len = d.getTime();
    var offset = d.getTimezoneOffset() * 60000;
    var utcTime = len + offset;
    return new Date(utcTime + 3600000 * i);
}

function localTime() {
    Array.from($timezone).forEach((element, index) => {
        var d = getLocalTime(zone[index]);
        var dateDay = d.toString().split(' ')[2];
        var dateMonth = d.toString().split(' ')[1];
        var dateYear = d.toString().split(' ')[3];
        var time = (d.toString().split(' ')[4]).slice(0, 5);
        console.log(element, index);
        element.querySelector('.timezone-date').innerText =
            `${dateDay} ${dateMonth}. ${dateYear}`;
        element.querySelector('.timezone-time').innerText = `${time}`;
        element.querySelector('.timezone-country').innerText = `${place[index]}`;
    })
}

localTime();

setInterval(localTime, 1000);

console.log(getLocalTime(-5));
console.log(getLocalTime(0));
console.log(getLocalTime(7));
console.log(getLocalTime(8));
console.log(getLocalTime(11));

var d = getLocalTime(-5);
var date = d.toString().split(' ')[2];
var dates = date.split('/');
console.log(date);
console.log(dates);
var time = (d.toString().split(' ')[4]).slice(0, 5);
console.log(time);

//https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/getTimezoneOffset
//https://blog.csdn.net/zzy7075/article/details/7554809