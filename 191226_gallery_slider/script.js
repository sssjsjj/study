/*jshint esversion: 6*/

/************
  생성자 함수들
************/
//버튼 클릭 생성자 함수
function ClickButtons(name) {
  this.name = name;
}
ClickButtons.prototype.click = function(callback) {
  this.name.forEach(el => {
    el.addEventListener("click", ()=>{
      callback(el);
    });
  });    
};

/************
  미니 함수들
************/
// 클래스명 추가
function addClass(el, className){
  el.className += " " + className;
}
// 클래스명 제거
function removeClass(el, className){
  el.className = el.className.replace(" " + className,"");
}
// 클래스값 가지고 있는지 체크
function hasClass(el, className){
  let arr = el.className.split(" ");
  if(arr.indexOf(className) > -1){
    return true;
  }else{
    return false;
  }
}
// 속성값 가지고 있는 엘리먼트
function getElByAttr(els, attrName, attrValue){
  let that;
  els.forEach(el => {
    if(el.attributes[attrName].value === attrValue){
      that = el;
    }
  });
  return that;
}

/************
  재료들로 DOM 만지기 
************/
const togLayerBtns = document.querySelectorAll("[data-role*='layertoggle']"),
      togLayerBtn = new ClickButtons(togLayerBtns),
      togLayers = document.querySelectorAll("[data-role*='layertarget']");

togLayerBtn.click((el)=>{
  let i = el.dataset.index,
      thisLayer = getElByAttr(togLayers, "data-index", i);
  if(hasClass(thisLayer, "open")){
    removeClass(thisLayer, "open");
  }else{
    addClass(thisLayer, "open");
  }
});
