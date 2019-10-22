/*jshint esversion: 6 */
function log(code) {
  console.log(code);
}

//원하는 프로퍼티 값 array 줘
let map = (list, iteratee) => {
  var new_list = [];
  list.forEach(elem => {
    new_list.push(iteratee(elem));
  });
  return new_list;
};

// 해당 엘리먼트 오브젝트 포함하여 배열 생성
let elemList = (elems) => {
  let new_list = [], i = 0;
  for(const elem of elems){
    new_list[i] = {},
    new_list[i].elem = elem;
    i++;
  }
  return new_list;
};

// 오브젝트 리스트에 원하는 key, value값 삽입하여 데이터 완성
let upData = (objList, key, value) => {
  let new_list = objList;
  new_list.forEach(elem => {
    elem[key] = value(elem);
  });
  return new_list;
};

// let setInterval = ()

//  텍스트 롤링 
const texts = document.querySelectorAll("[data-text]");
const rTxts = upData(upData(elemList(texts), 
"cont", el => el.elem.dataset.text), 
"done", () => false);

log(rTxts);

  rTxts.forEach((rTxt, i) => {
    rollTime(rTxt);

    let scrolling = false;
    window.addEventListener("scroll", () => {
      scrolling = true;
    });

    setInterval(() => {
      if (scrolling) {
        scrolling = false;
        rollTime(rTxt);
      }
    }, 150);
  });

function roll(rTxt) {
  if (Number(rTxt.cont) && !rTxt.done) {
    drawNumber(rTxt.elem, 0, rTxt.cont);
    rTxt.done = true;
  } else if (isNaN(Number(rTxt.cont)) && !rTxt.done) {
    drawNaN(rTxt.elem, rTxt.cont, 0);
    showNaN(rTxt.elem, rTxt.cont, 0);
    rTxt.done = true;
  }
}

function rollTime(rTxt) {
  let winH = window.innerHeight,
      winScrY = window.scrollY,
      bodyScrH = document.querySelector("body").scrollHeight,
      elemScrTop = rTxt.elem.offsetTop;
  if (elemScrTop - winH / 2 < winScrY && winScrY < elemScrTop - 20) {
    roll(rTxt);
  } else if (bodyScrH - winH < elemScrTop && bodyScrH < winScrY + winH) {
    roll(rTxt);
  }
}

// 숫자 카운팅 하면서 그려줘 ( Number )
function drawNumber(elem, start, limitNum) {
  if (start <= limitNum) {
    setTimeout(() => {
      elem.textContent = start;
      start++;
      drawNumber(elem, start, limitNum);
    }, 1500 / limitNum);
  }
}

// 한 글자씩 셋팅 ( NaN )
function drawNaN(elem, text, start) {
  if (start < text.length) {
    elem.innerHTML += `<span style="opacity:0;">${text.substring(start,start+1)}</span>`;
    start++;
    drawNaN(elem, text, start);
  }
}

// 한 글자씩 show ( NaN )
function showNaN(elem, text, start) {
  if (start < text.length) {
    setTimeout(() => {
      elem.querySelectorAll("span")[start].style = "opacity: 1";
      start++;
      showNaN(elem, text, start);
    }, 800 / text.length);
  }
}