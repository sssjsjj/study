function log(code) {
  console.log(code);
}

//  텍스트 롤링 
function rollingText() {
  const $rollTxtArea = document.querySelectorAll("[data-text]");

  for (const rollTxtArea of $rollTxtArea) {
    const text = rollTxtArea.dataset.text;

    let winH = window.innerHeight / 2,
        winScrY = window.scrollY,
        bodyScrH = document.querySelector("body").scrollHeight,
        areaScrTop = rollTxtArea.offsetTop;
        
    let fired = false,
        fired1 = false;
    window.addEventListener("load", () => {
      //숫자인 경우 카운팅하면서 그려줘
      if( areaScrTop - winH <= winScrY && winScrY < areaScrTop - 20){
        if(Number(text) && !fired) {
          drawNumber(rollTxtArea, 0, text);
          fired = true;
        }else if(isNaN(Number(text)) && !fired1){
          drawNaN(rollTxtArea, text, 0);        
          showNaN(rollTxtArea, text, 0);
          fired1 = true;
        }      
      }
    });
    window.addEventListener("wheel", () => {
      winScrY = window.scrollY;
      //숫자인 경우 카운팅하면서 그려줘
      if(areaScrTop - winH <= winScrY && winScrY < areaScrTop - 20){
        if(Number(text) && !fired) {
          drawNumber(rollTxtArea, 0, text);
          fired = true;
        }else if(isNaN(Number(text)) && !fired1){
          drawNaN(rollTxtArea, text, 0);        
          showNaN(rollTxtArea, text, 0);
          fired1 = true;
        }      
      }else if(bodyScrH <  window.innerHeight + winScrY){
        if(Number(text) && !fired) {
          drawNumber(rollTxtArea, 0, text);
          fired = true;
        }else if(isNaN(Number(text)) && !fired1){
          drawNaN(rollTxtArea, text, 0);        
          showNaN(rollTxtArea, text, 0);
          fired1 = true;
        }      
      }
    });
  }
}
rollingText();

// 숫자 카운팅 하면서 그려줘 ( Number )
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
  // log(text.length);
  if(startNum < text.length){
    area.innerHTML += `<span style="opacity:0;">${text.substring(startNum,startNum+1)}</span>`;
    startNum++;
    drawNaN(area, text, startNum);
  }
}

function showNaN(area, text, startNum){
  if(startNum < text.length){
    setTimeout(() => {
      area.querySelectorAll("span")[startNum].style = "opacity: 1";
      startNum++;
      showNaN(area, text, startNum);
    }, 800 / text.length);
  }
}
