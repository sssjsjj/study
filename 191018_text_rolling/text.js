function log(code) {
  console.log(code);
}

//  텍스트 롤링 
function rollingText() {  
  const $rollTxtArea = document.querySelectorAll("[data-text]");
  let rTxts = [],
      i = 0;

  for (const rollTxtArea of $rollTxtArea) {
    const cont = rollTxtArea.dataset.text;

    rTxts[i] = {};
    rTxts[i].elem = rollTxtArea;
    rTxts[i].cont = cont;
    rTxts[i].type = Number(cont) ? "number" : "NaN";
    rTxts[i].done = false;

    i++;
  }  
  log(rTxts);

  for (const rTxt of rTxts) {
    let scrolling = false;
        
    window.addEventListener("load", () => {
      rollTime(rTxt);
    });

    window.addEventListener("scroll", () => {
      scrolling = true;
    });

    setInterval( () => {
      if( scrolling ) {
        scrolling = false;
        rollTime(rTxt);
      }
    }, 150);
    i++;
  }
}
rollingText();

function roll(rTxt){
  if(Number(rTxt.cont) && !rTxt.done) {
    drawNumber(rTxt.elem, 0, rTxt.cont);
    rTxt.done = true;
  }else if(isNaN(Number(rTxt.cont)) && !rTxt.done){
    drawNaN(rTxt.elem, rTxt.cont, 0);        
    showNaN(rTxt.elem, rTxt.cont, 0);
    rTxt.done = true;
  }   
}

function rollTime(rTxt){
  let winH = window.innerHeight,
  winScrY = window.scrollY,
  bodyScrH = document.querySelector("body").scrollHeight,
  areaScrTop = rTxt.elem.offsetTop;
  if(areaScrTop - winH/2 < winScrY && winScrY < areaScrTop - 20){
    roll(rTxt);
  }else if(bodyScrH - winH < areaScrTop && bodyScrH < winScrY + winH){
    roll(rTxt);
  }
}

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

// 한 글자씩 셋팅 ( NaN )
function drawNaN(area, text, startNum) {
  // log(text.length);
  if(startNum < text.length){
    area.innerHTML += `<span style="opacity:0;">${text.substring(startNum,startNum+1)}</span>`;
    startNum++;
    drawNaN(area, text, startNum);
  }
}

// 한 글자씩 show ( NaN )
function showNaN(area, text, startNum){
  if(startNum < text.length){
    setTimeout(() => {
      area.querySelectorAll("span")[startNum].style = "opacity: 1";
      startNum++;
      showNaN(area, text, startNum);
    }, 800 / text.length);
  }
}
