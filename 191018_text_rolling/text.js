function log(code) {
  console.log(code);
}

//  텍스트 롤링 
function rollingText() {
  const $rollTxtArea = document.querySelectorAll("[data-text]"),
    speed = 500;   
  let index = 0;
  for (const rollTxtArea of $rollTxtArea) {
    const text = rollTxtArea.dataset.text;
        
    let fired = false,
        fired1 = false;
    window.addEventListener("load", () => {
      //숫자인 경우 카운팅하면서 그려줘
      if( rollTxtArea.offsetTop - 200 <= window.scrollY + 200){
        if(Number(text) && !fired) {
          drawNumber(rollTxtArea, 0, text);
          fired = true;
        }else if(isNaN(Number(text)) && !fired1){
          drawNaN(rollTxtArea, text, 0);        
          fired1 = true;
        }      
      }
    });
    window.addEventListener("scroll", () => {
      //숫자인 경우 카운팅하면서 그려줘
      if(window.scrollY + 400 >= rollTxtArea.offsetTop){
        if(Number(text) && !fired) {
          drawNumber(rollTxtArea, 0, text);
          fired = true;
        }else if(isNaN(Number(text)) && !fired1){
          drawNaN(rollTxtArea, text, 0);        
          fired1 = true;
        }      
      }else if(document.querySelector("body").scrollHeight <  window.innerHeight + window.scrollY){
        if(Number(text) && !fired) {
          drawNumber(rollTxtArea, 0, text);
          fired = true;
        }else if(isNaN(Number(text)) && !fired1){
          drawNaN(rollTxtArea, text, 0);        
          fired1 = true;
        }      
      }
    });
    index++;
  }
}
rollingText();

// function rolling(text , area, fired, fired1){
//   if(Number(text) && !fired) {
//     drawNumber(area, 0, text);
//     fired = true;
//   }else if(isNaN(Number(text)) && !fired1){
//     drawNaN(area, text, 0);        
//     fired1 = true;
//   }      
// }

// 카운팅 하면서 그려줘 ( 숫자 )
function drawNumber(area, startNum, limitNum) {
  if(startNum <= limitNum){
    setTimeout(() => {
      area.textContent = startNum;
      startNum++;
      drawNumber(area, startNum, limitNum);
    }, 1500 / limitNum);
  }           
}

// 한 글자씩 그려줘 ( NaN )
function drawNaN(area, text, startNum) {
  log(text.length);
  if(startNum <= text.length){
    setTimeout(() => {
      area.textContent += text.substring(startNum,startNum+1);
      startNum++;
      drawNaN(area, text, startNum);
    }, 800 / text.length);
  }
}
