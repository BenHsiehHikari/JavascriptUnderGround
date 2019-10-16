let timer;
let sec = 0;
let min = 0;
let hour = 0;

let startBtn = document.querySelector(".start");
let stopBtn = document.querySelector(".stop");
let resetBtn = document.querySelector(".reset");
let timer_element = document.querySelector("#timer");

startBtn.addEventListener("click",function(){
    timer = setInterval(TimerHandler, 1000);
    resetBtn.disabled = true;
});

stopBtn.addEventListener("click",function(){
    timer = clearInterval(timer);
    resetBtn.disabled = false;
});

resetBtn.addEventListener("click",function(){
    timer = clearInterval(timer);
    resetBtn.disabled = true;
    sec = 0;
    min = 0;
    hour = 0;
    timer_element.innerHTML = "00:00:00";
});

function TimerHandler() {
    sec++;

    if(sec == 60){
        sec = 0;
        min++;
    }
    if(min == 60){
        min == 0;
        hour++;
    }
    DisplayTime();
}

function DisplayTime(){
    let sec_pretty = sec;
    let min_pretty = min;
    let hour_pretty = hour;
    if(sec < 10){
        sec_pretty = "0" + sec;
    }
    if(min < 10){
        min_pretty = "0" + min;
    }
    if(hour < 10){
        hour_pretty = "0" + hour;
    }
    timer_element.innerHTML = `${hour_pretty}:${min_pretty}:${sec_pretty}`;
}
