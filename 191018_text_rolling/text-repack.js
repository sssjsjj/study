/*jshint esversion: 6 */
function log(code) {
  console.log(code);
}

// 롤링 텍스트 이벤트
const texts = document.querySelectorAll("[data-text]");
// 롤링 텍스트 json 배열 생성
const rollingTexts = upData(upData(elemList(texts),
    "cont", el => el.elem.dataset.text),
  "scrollRange", () => false,
  "done", () => false);
log(rollingTexts);

// 텍스트 롤링 시작!
rollingTexts.forEach((rollingText) => {
  fireRolling(rollingText);

  let scrolling = false;
  window.addEventListener("scroll", () => {
    scrolling = true;
  });

  setInterval(() => {
    if (scrolling) {
      scrolling = false;
      fireRolling(rollingText);
    }
  }, 150);
});

// 해당 엘리먼트 오브젝트 포함하여 배열 생성
function elemList(elems) {
  let new_list = [],
    i = 0;
  for (const elem of elems) {
    new_list[i] = {},
      new_list[i].elem = elem;
    i++;
  }
  return new_list;
}

// 오브젝트 리스트에 원하는 key, value값 삽입하여 데이터 완성
function upData(objList, key, value) {
  let new_list = objList;
  new_list.forEach(elem => {
    elem[key] = value(elem);
  });
  return new_list;
}

// 숫자라면 true를 줘
function chkNum(value) {
  if (Number(value)) {
    return true
  } else if (isNaN(Number(value))) {
    return false;
  }
}

// 스크롤 범위 맞으면 true를 줘
function chkScrRange(list) {
  let winH = window.innerHeight,
    winScrY = window.scrollY,
    bodyScrH = document.querySelector("body").scrollHeight,
    z
  elemScrTop = list.elem.offsetTop;
  if (elemScrTop - winH / 2 < winScrY && winScrY < elemScrTop - 20) {
    return true
  } else if (bodyScrH - winH < elemScrTop && bodyScrH < winScrY + winH) {
    return true
  } else {
    return false;
  }
}

// 조건 체크 후 텍스트 롤링
function fireRolling(text) {
  const commonIf = !text.done && chkScrRange(text);
  if (chkNum(text.cont) && commonIf) {
    drawNumber(text.elem, 0, text.cont);
    text.done = true;
  } else if (!chkNum(text.cont) && commonIf) {
    drawNaN(text.elem, text.cont, 0);
    showNaN(text.elem, text.cont, 0);
    text.done = true;
  }
}

// 숫자 카운팅 하면서 그려 ( Number )
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