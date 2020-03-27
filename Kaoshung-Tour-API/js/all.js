let data = [];
let zoneArray = [];
let title = document.querySelector('.title');
let list = document.querySelector('.travelInfo');
let area = document.getElementById('areaId');
let btn = document.querySelectorAll('.btn');
let popData = document.getElementById('popCardId');

fetch('https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97', { method: 'post' })
    .then((response) => {
        // 這裡會得到一個 ReadableStream 的物件
        console.log(response);
        // 可以透過 blob(), json(), text() 轉成可用的資訊
        return response.json();
    }).then((jsonData) => {
        let str = '';
        // var rawData = JSON.parse(xhr.responseText);
        data = jsonData.result.records;
        for (let i = 0; i < data.length; i++) {
            zoneArray.push(data[i].Zone);
        }
        let zoneList = zoneArray.filter(function(item, index, array) {
            return array.indexOf(item) === index;
        })
        for (let i = 0; i < zoneList.length; i++) {
            str += `<option value="${zoneList[i]}">${zoneList[i]}</option>`;
        }
        area.innerHTML = `<option value="">Choose Location</option> ${str}`;
    }).catch((err) => {
        console.log('錯誤:', err);
    });

area.addEventListener('change', updateList, false);

for (var i = 0; i < btn.length; i++) {
    btn[i].addEventListener('click', updateList, false);
}

list.addEventListener('click', popInfo, false);
popData.addEventListener("click", closeInfo, false);

function updateList(e) {
    let str = '';
    let nowData = [];

    for (let i = 0; i < data.length; i++) {
        if (data[i].Zone === e.target.value) {
            nowData.push(data[i]);
        }
    }

    for (let j = 0; j < nowData.length; j++) {
        if (nowData[j].Ticketinfo === '免費參觀') {
            let content = `<li><div class="card" style="background-image: url('${nowData[j].Picture1}')"><h3>${nowData[j].Name}</h3><h4>${nowData[j].Zone}</h4></div>
                <p class="openTime">${nowData[j].Opentime}</p>
                <p class="address">${nowData[j].Add}</p>
                <p class="tel">${nowData[j].Tel}</p>
                <p class="fee">${nowData[j].Ticketinfo}</p>
                <a href="#" data-num="${j}"></a></li>`
            str += content;
        } else {
            let content = `<li><div class="card" style="background-image: url('${nowData[j].Picture1}')"><h3>${nowData[j].Name}</h3><h4>${nowData[j].Zone}</h4></div>
                <p class="openTime">${nowData[j].Opentime}</p>
                <p class="address">${nowData[j].Add}</p>
                <p class="tel">${nowData[j].Tel}</p>
                <a href="#" data-num="${j}"></a></li>`
            str += content;
        }
    }
    showData = nowData;
    list.innerHTML = str;
    title.innerHTML = `<h2>${e.target.value}</h2>`;
}

function popInfo(e) {
    e.preventDefault();
    if (e.target.nodeName !== 'A') {
        return;
    }
    var num = e.target.dataset.num;
    console.log(num);
    var str = `
                <div class="popCard">
          
                    <div class="infoCard" style="background-image: url(${showData[num].Picture1})">
                        <h3>${showData[num].Name}</h3>
                        <h4>${showData[num].Zone}</h4>
                    </div>
                    <p class="description">${showData[num].Description}</p>
                    <p class="openTime">${showData[num].Opentime}</p>
                    <p class="address">${showData[num].Add}</p>
                    <p class="tel">${showData[num].Tel}</p>
                    <p class="fee">${showData[num].Ticketinfo}</p>
                </div>
      `;
    popData.innerHTML = str;
    popData.style.visibility = "visible";
    popData.style.opacity = "1";
}

function closeInfo(e) {
    e.stopPropagation();
    if (e.target.id === "popCardId") {
        popData.style.visibility = "hidden";
        popData.style.opacity = "0";
    }
}
document.querySelector('body').addEventListener('click', function(e) {
    console.log(e, e.target.tagName);
}, false);

function popInfo(e) {
    e.preventDefault();
    if (e.target.nodeName !== 'A') {
        return;
    }
    var num = e.target.dataset.num;
    console.log(num);
    var str = `
            <div class="popCard">
                <div class="infoCard" style="background-image: url(${showData[num].Picture1})">
                    <h3>${showData[num].Name}</h3>
                    <h4>${showData[num].Zone}</h4>
                </div>
                <p class="description">${showData[num].Description}</p>
                <p class="openTime">${showData[num].Opentime}</p>
                <p class="address">${showData[num].Add}</p>
                <p class="tel">${showData[num].Tel}</p>
                <p class="fee">${showData[num].Ticketinfo}</p>
            </div>
  `;
    popData.innerHTML = str;
    popData.style.visibility = "visible";
    popData.style.opacity = "1";
}

function closeInfo(e) {
    e.stopPropagation();
    if (e.target.id === "popCardId") {
        popData.style.visibility = "hidden";
        popData.style.opacity = "0";
    }
}
document.querySelector('body').addEventListener('click', function(e) {
    console.log(e, e.target.tagName);
}, false);