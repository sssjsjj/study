"use strict";

window.onload = function(){
  calendar();
}
function calendar(){
  const thUi = new FuncBundle();
  let $header = document.getElementsByClassName('header')[0],
      $content = document.getElementById('content'),
      $sideBar = document.getElementsByClassName('side-bar')[0],
      $calendarZone = document.getElementsByClassName('calendar-zone')[0],
      _baseYear = new Date().getFullYear(),
      _baseMonth = new Date().getMonth(),
      _iniDate = thUi.dateFunc(new Date(_baseYear, _baseMonth)),
      _urlParameter = "";
	
	let tet = "";

	let $miniCalendar = $sideBar.querySelector('.mini-calendar-zone'),
		 $miniTitle = $miniCalendar.querySelector('.mini-date .ym'),
		 $miniInfo = $miniCalendar.querySelector('.mini-calendar'),
		 $mainTitle = $header.querySelector('.date');

	function sizeSetting() {
		let _windowH = window.innerHeight,
			_height =_windowH - $header.offsetHeight,
			$week = $calendarZone.querySelector('.week-box'),
			_weekH = $week.offsetHeight,
		    $mainCalendar = $calendarZone.querySelector('.calendar');
		thUi.heightInput($content,_height);
		thUi.heightInput($mainCalendar,_height - _weekH);
	}

	function ini(){
		let _historyChk = thUi.historyChk(), // url 체크 
		    _dateValue = "";
		if(!(_historyChk== "initial")){
		  _baseYear = Number(_historyChk[1]);
		  _baseMonth = Number(_historyChk[2]-1);
		  _dateValue = thUi.dateFunc(new Date(_baseYear, _baseMonth));
		}else{
			_dateValue = _iniDate;
		}
		
		thUi.calendar($miniTitle, $miniInfo, _dateValue); // 사이드 캘린더 
		thUi.calendar($mainTitle, $calendarZone, _dateValue); // 메인 캘린더
		headFunc();
		sideFunc();
		thUi.reSize(sizeSetting);
		
	}
	ini();

	function headFunc(){ // head 기능
		let $toDayBtn = $header.querySelector('.day-btn .to-day'), 
			$prevBtn = $header.querySelector('.load-btn .prev .btn'),
			$nextBtn = $header.querySelector('.load-btn .next .btn');
		$toDayBtn.addEventListener("click", (e) => {	 // 오늘날
			_baseYear = new Date().getFullYear();
			_baseMonth = new Date().getMonth();
			thUi.calendar($miniTitle, $miniInfo, _iniDate);
			thUi.calendar($mainTitle, $calendarZone, _iniDate);
			thUi.urlChange("initial");
		})

		$prevBtn.addEventListener("click", (e) => {	 // 이전 달 
		  var prevDate = thUi.dateFunc(new Date(_baseYear , --_baseMonth, 1));
		  btnLoad(prevDate);
		})
		$nextBtn.addEventListener("click", (e) => { // 다음 달 
		  var _nextDate = thUi.dateFunc(new Date(_baseYear , ++_baseMonth, 1));
		  btnLoad(_nextDate);
		})

		function btnLoad(newDate){
			_urlParameter = "memory=$m/"+newDate.year+"/"+newDate.month+"/"+newDate.day; 
			thUi.urlChange(_urlParameter);
			thUi.calendar($miniTitle, $miniInfo, newDate);
			thUi.calendar($mainTitle, $calendarZone, newDate);
		}
	}
	
	function sideFunc(){
		let $miniPrev = $sideBar.querySelector('.mini-article .prev .btn'),
			$miniNext = $sideBar.querySelector('.mini-article .next .btn');
		
		$miniPrev.addEventListener("click", (e) => {	 // 이전 달
			newCalendar(1);
		});
		$miniNext.addEventListener("click", (e) => { // 다음 달 
		  newCalendar(-1);
		})
		function newCalendar(type){
			let _passDate = $miniTitle.getAttribute("data-ym").split("/"),
				_newDate = "";
			_passDate[1] = _passDate[1]-1;
			_newDate = thUi.dateFunc(new Date(_passDate[0] , _passDate[1] -1 * type, 1));
			thUi.calendar($miniTitle, $miniInfo, _newDate);
		}

	}
    
 
	function FuncBundle(){	 

	  this.heightInput = (objH, _numH) => { // 높이 입력 
		objH.style.setProperty("height",_numH + "px");
	  }
	  this.reSize = (func) => { // resize 필요한 함수 
		 func();
		 window.addEventListener("resize", function(event){
			func();
		  });
	  }
	  this.historyChk = () => {
		let _urlChk = location.search.substr(location.search.indexOf("?"), 8);
		if(_urlChk.length > 0 && _urlChk === "?memory="){
		  console.log("기록이 있다 ");
		  var _thisUrl =  location.search.substr(location.search.indexOf("$")+1),
			   _chkValue = _thisUrl.split("/");
		  return _chkValue;
		}else{ // url에 지정된 값이 아닐 때
			this.urlChange("initial"); // 지정된 값이 아니면 초기 url로
			return "initial";
		}
	  } // e: historyChk
		
	  this.urlChange = (e) => {
		let _url = "";
		if(e === "initial") _url = window.location.pathname; 
		else _url = "?"+e;
		if(typeof(history.pushState) == "function")	{
			history.pushState(null, null, _url);
		}
	  } //e : urlChange

	  this.dateFunc = (e) => { // new Date 값 추출
		let _date = {
			year : e.getFullYear(),        // 연 
			month : e.getMonth() +1,    // 달
			day : new Date().getDate(),             // 오늘
			starDay : new Date(e.getFullYear(), e.getMonth(), 1).getDay(),        // 시작 요일
			lastDay : new Date(e.getFullYear(), e.getMonth()+1, 0).getDate() // 마지막 날
		}
		return _date;
	  } // e:dateFunc
	  
	  this.calendar = (eTitle, eInfo, eData) => { // 년 월 선택자, 캘린더 선택자, 날짜 데이터
		 // 년 월 입력
		let _ym = eData.year + "년 " + eData.month + "월";
		eTitle.setAttribute("data-ym",eData.year+"/"+eData.month);
		eTitle.innerHTML  = _ym; 
		// 요일 입력 
		let _week =  ['일','월','화','수','목', '금', '토'],
			$week =  eInfo.children[0].querySelectorAll('.days');
		$week.forEach(function(weekEl, weekIndex){
			let _this = weekEl.children[0];
			_this.innerHTML = _week[weekIndex]
		});
		// 일 입력
		// [4~6주 구하기] 표기할 일 (시작일+총일수) / 7  : 몫
		let $calendar = eInfo.getElementsByClassName('calendar')[0],
			_createWeek = Math.ceil(( eData.starDay + eData.lastDay)/7),
			_$weekLine = "<div class='date-line'></div>";

		$calendar.innerHTML = "";
		for (var _numWeek = 0 ; _numWeek <  _createWeek  ; _numWeek++ ) {
			$calendar.innerHTML += _$weekLine; // 주 생성 date-line
			let _$dateLine = $calendar.children[_numWeek];
			for(var _createDay = 0; _createDay < _week.length; _createDay++){
				let  _$span = document.createElement('span'),
					 _$button = document.createElement('button');
				_$span.classList.add("days");
				_$button.classList.add("day");
				_$button.setAttribute("type", "button");  
				_$button.textContent = "-";
				_$span.appendChild(_$button);
				_$dateLine.appendChild(_$span); // 일 생성  days
			}
		} // e: for 

		let _$dayInput = $calendar.querySelectorAll('.date-line .days');
		_$dayInput.forEach(function(_dayEl, _dayNum){
			let _$dayBtn = _dayEl.children[0],
				_sumDay = eData.starDay + eData.lastDay; // 시작과 마지막일 합
			if(_dayNum >= eData.starDay && _dayNum < _sumDay) {	 // 기준 달 일 입력
				let _day = _dayNum - eData.starDay + 1
							
				if(_dayNum - eData.starDay == 0 ){
					_$dayBtn.innerHTML = "<span class='s-m'>"+eData.month+"월 </span>"+ _day+ "<span class='s-m'>일</span>";
				}

				_$dayBtn.innerHTML = _day;

			}
		}); // e : forEach

		if(eInfo.classList.value == "calendar-zone"){ // 메인 캘린더일 경우
			mainFunc();
			schedule();
		}
		function mainFunc(){
			let _$dateLine = $calendar.querySelectorAll('.date-line');
			_$dateLine.forEach(function(elH, elIndex){
				elH.style.setProperty("height","calc(100%/"+_createWeek+")");
			});
		}
		function schedule(){
			let _getDate = "";

	
		}
	  }// e: calendar

	  this.loadDate = (loadUrl) =>{
		

	  }

	} // e : FuncBundle

}; // e: calendar

  const _xhr = new XMLHttpRequest();
  //_xhr.open("GET", "/th_Calendar/load/data.json");
  _xhr.open("GET", "/th_Calendar/load/data.json");
  _xhr.send();
  _xhr.onreadystatechange = () => {
    try {
      if (_xhr.readyState === XMLHttpRequest.DONE) {
        if (_xhr.status === 200) {
			console.log(_xhr.responseText)
		}
	  }
	}
	catch(error){
		console.log("error")
	}
  }
  const _xhr2 = new XMLHttpRequest();
  _xhr2.open("GET", "./load/data.js");
  _xhr2.send();
  _xhr2.onreadystatechange = () => {
    try {
      if (_xhr2.readyState === XMLHttpRequest.DONE) {
        if (_xhr2.status === 200) {
			console.log("js 파일")
		}
	  }
	}
	catch(error){
		console.log("error")
	}
  }
