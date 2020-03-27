const calcResult = document.querySelector('#calcResult');
const calcResultText = document.querySelector('#calcResultText');
const bmireset = document.querySelector('.bmiReset');
const userHeightInput = document.querySelector("#js-height");
const userWeightInput = document.querySelector("#js-weight");
const userbmilist = document.querySelector('.report__history--listed');
const userBMIData = JSON.parse(localStorage.getItem('BMIData')) || [];


// 監聽與更新
calcResult.addEventListener('click', doCalc, false);
userHeightInput.addEventListener('blur', doCheck, false);
userWeightInput.addEventListener('blur', doCheck, false);

userbmilist.addEventListener('click', toggleDone);
updateList(userBMIData);

console.log(userHeightInput.value && userWeightInput);
function doCalc(){
	if(userHeightInput.value && userWeightInput ){
        console.log(userHeightInput.value && userWeightInput);
		const nowDay = new Date();
		const  month = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
		let userDate = `${month[nowDay.getMonth()]}-${nowDay.getDate()}-${nowDay.getFullYear()}`;
		let userHeightData = parseFloat(userHeightInput.value / 100);
		let userWeightData = parseInt(userWeightInput.value);
		let BMIData = (userWeightData / (userHeightData*userHeightData)).toFixed(2);
		let ArrayBmiResult = levelBmi(BMIData).split(",");
		var colorBMIResult = ArrayBmiResult[0];
        var textBMIResult = ArrayBmiResult[1];

        calcResult.innerHTML = `${BMIData}<br/><span class="BMIclass" style="display: block;">BMI</span>`;
        calcResult.className = `ResultBg Border ${colorBMIResult}`;

        const userBMIDataDict = {
            userHeight: userHeightData * 100,
            userWeight: userWeightData,
            userBMI: BMIData,
            userDate: userDate
        };
        userBMIData.push(userBMIDataDict); 
        updateList(userBMIData);
        localStorage.setItem('BMIData', JSON.stringify(userBMIData));
        } else {
        alert('您尚未輸入完整的資料哦!!');
    }

    //bmi重置設定
    if(bmireset.style.display == ""){
    	bmireset.style.display = "inline";
    }
    bmireset.className = `bmiReset ${colorBMIResult}`;
    bmireset.addEventListener("click", function() {
        bmireset.style.display = "";
        calcResult.className = "";
        calcResult.innerHTML = "看結果";
        document.querySelector('#calcResultText').innerHTML = "";
        // document.querySelector(".header").appendChild(resultBtn);
        // state.innerHTML='';
        // changeBtn.innerHTML='';
    });
}

function updateList(items){
	str = '';
	let len = items.length;

	for (let i = 0;i<len;i++){
		var ArrayBmiResult = levelBmi(items[i].userBMI).split(",");
        var colorBMIResult = ArrayBmiResult[0];
        var textBMIResult = ArrayBmiResult[1];
        str += `<li>
	        <div class="Txt ${colorBMIResult}">${textBMIResult}</div>
	        <div>
	        	<sup class="BMIclass">BMI</sup>&nbsp;${items[i].userBMI}
	        </div>
	        <div>
	        	<sup class="BMIclass">weight</sup>&nbsp;${items[i].userWeight}kg
	        </div>
	        <div>
	        	<sup class="BMIclass">height</sup>&nbsp;${items[i].userHeight}cm
	        </div>
	        <div>${items[i].userDate}</div>
	        <div>
	        	<a href="#" data-index="${i}"/>刪除</a>
	        </div>
        </li>`;
	}
	userbmilist.innerHTML = str;
}

// 刪除BMI資料
function toggleDone(e) {
    e.preventDefault();
    if (e.target.nodeName !== 'A') { return };
    var index = e.target.dataset.index;
    userBMIData.splice(index, 1);
    localStorage.setItem('BMIData', JSON.stringify(userBMIData));
    updateList(userBMIData);
}

// 檢查使用者是否正確輸入資料
function doCheck(e) {
    e.preventDefault();
    var str = e.target.value;
    var targetID = e.target.id;
    if (str == '') {
        var alertString = '';
        if (targetID == 'js-height') {
            alertString = "您尚未輸入身高！";
        } else if (targetID == 'js-weight') {
            alertString = "您尚未輸入體重！";
        }
        document.getElementById(targetID).className = "borderRed";
        alert(alertString);
    } else {
        //console.log(parseInt(str));
        if (isNaN(parseInt(str))) {
            document.getElementById(targetID).className = "borderRed";
            alert("您輸入非數字的資料了！");
        } else {
            document.getElementById(targetID).className = "";
        }
    }
}

// 計算BMI指數
function levelBmi(calcBMI) {
    if (calcBMI < 18.5) {
        return "Blue,過輕"; //過輕
    } else if (18.5 <= calcBMI && calcBMI < 24.0) {
        return "Green,理想"; //理想
    } else if (24.0 <= calcBMI && calcBMI < 27.0) {
        return "Orange,過重"; //過重
    } else if (27.0 <= calcBMI && calcBMI < 30.0) {
        return "Orangedeep,輕度肥胖"; //輕度肥胖
    } else if (30.0 <= calcBMI && calcBMI < 35.0) {
        return "Orangedeep,中度肥胖"; //中度肥胖
    } else if (calcBMI >= 35) {
        return "Red,過度肥胖"; //過度肥胖
    }
}