function log(code) {
  console.log(code);
}

//  텍스트 롤링 
function rollingText() {
  const $rollTxtArea = document.querySelectorAll("[data-text]"),
    speed = 500,
    _textPieces = [];
  let index = 0;
  for (const rollTxtArea of $rollTxtArea) {
    const text = rollTxtArea.dataset.text;

    // 텍스트인 경우 쪼개서 배열에 넣어줘 
      breakText(text, _textPieces);
    
    //숫자인 경우 순차적으로 그려줘
    if(Number(text)) {
      drawNumber(0, rollTxtArea, text);
    }

    // for(const piece of _textPieces[index]){
    // }

    index++;
  }
}
rollingText();

window.onscroll = function(){
  log(window.scrollY);//10단위로 올리기
}

// 텍스트 쪼개서 배열에 넣는 함수 
function breakText(text, arr) {
  const letters = [],
        textLength = text.length;
  for (i = 0; i < textLength; i++){
    letters.push(text.substring(i,i+1));
  }  
  arr.push(letters);
}

// 숫자인 경우 순차적으로 그려줘
function drawNumber(startNum, area, limitNum) {
  if(startNum <= limitNum){
    setTimeout(() => {
      area.textContent = startNum;
      startNum++;
      drawNumber(startNum, area, limitNum);
    }, 1500 / limitNum);
  }         
}

//특정 영역에 갔을 때 함수 실행해 줘
function startScrTop(target, func) {
  if(window.scrollY > target.offset.top){

    return false;
  }
}