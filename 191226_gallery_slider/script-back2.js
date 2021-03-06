/*jshint esversion: 6*/

/************
  생성자 함수들
************/
//버튼 클릭 생성자 함수
function ClickElem(name) {
  this.name = name;
}
ClickElem.prototype.click = function(callback) {
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
function addClass(elem, className){
  elem.className += " " + className;
}
// 클래스명 제거
function removeClass(elem, className){
  elem.className = elem.className.replace(" " + className,"");
}
// 클래스값 가지고 있는지 체크
function hasClass(elem, className){
  let arr = elem.className.split(" ");
  if(arr.indexOf(className) > -1){
    return true;
  }else{
    return false;
  }
}
// 모든 엘리먼트 속성 제거
function removeAttrAll(elems, attr){
  elems.forEach(elem => {
    elem.attributes[attr] = "";
  });
}
// 속성값 가지고 있는 엘리먼트 겥
function getElByAttr(elems, attrName, attrValue){
  let that;
  elems.forEach(el => {
    if(el.attributes[attrName].value === attrValue){
      that = el;
    }
  });
  return that;
}


/************
  재료들로 DOM 콘츄롤 
************/
// EVENT! 토글 버튼 클릭 시
const togLayerBtns = document.querySelectorAll("[data-role*='layertoggle']"),
      TogLayerBtn = new ClickElem(togLayerBtns),
      togLayers = document.querySelectorAll("[data-role*='layertarget']");

TogLayerBtn.click(el => {
  let i = el.dataset.index,
      thisLayer = getElByAttr(togLayers, "data-index", i);
  if(hasClass(thisLayer, "open")){
    removeClass(thisLayer, "open");
  }else{
    addClass(thisLayer, "open");
  }
});
// EVENT! 슬라이더
function Slider(el){
  this.type = el.dataset.slider;
  this.wrap = el;
  this.slider = el.querySelector(".slider");
  this.slides = el.querySelectorAll(".slide");    
  this.viewport = el.querySelector(".view-slider");    
  this.arrows = el.parentNode.querySelectorAll(".arrow button");    
  this.activeNum = 0;
  this.loop = true;
}
Slider.prototype.setActive = function(_activeNum){
  // active 넘버에 따라 slide dataset 셋팅.
  const activePrevNum = _activeNum != 0 ? _activeNum - 1 : this.slides.length - 1,
        activeNextNum = _activeNum != this.slides.length - 1 ? _activeNum + 1 : 0;
  this.activeNum = _activeNum;
  this.slides[_activeNum].dataset.slide = "active";
  this.slides[activePrevNum].dataset.slide = "prev";
  this.slides[activeNextNum].dataset.slide = "next";
};
Slider.prototype.startSlider = function(){
  this.setActive(this.activeNum);
  //전체 슬라이더 사이즈 
  this.slider.style.width = this.slides[this.activeNum].offsetWidth * this.slides.length + "px";
};
Slider.prototype.moveToWhere = function(btnType){
  let num,
      lastIdx = this.slides.length - 1;
  if(this.activeNum == lastIdx && btnType == "next"){
    num = 0;
  }else if (this.activeNum == 0 && btnType == "prev"){
    num = lastIdx;
  }else if(btnType == "next"){
    num = this.activeNum + 1;
  }else if(btnType == "prev"){
    num = this.activeNum - 1;
  }
  return num;
};  
Slider.prototype.commonFun = function(whichElem){
  this.startSlider();
  const BtnArrow = new ClickElem( this.arrows );
  // 이 Arrow Click하면
  BtnArrow.click(el => {
    const direction = el.dataset.btn,
          whenFirst = this.activeNum === 0 && direction === "prev",
          whenLast = this.activeNum === this.slides.length-1 && direction === "next";

    if(!this.loop && (whenFirst || whenLast)){
      return false;
    }else{
      removeAttrAll(this.slides, "data-slide"); //this.slides 의 data-slide 속성을 remove해줘
      this.setActive( this.moveToWhere( direction ) ); //선택한 방향으로 active 슬라이드 셋팅해줘
      this.slider.style.transition = "all 0.5s ease 0s"; 
      this.slider.style.transform = "translateX(-"+ this.slides[this.activeNum].offsetWidth * this.activeNum +"px)"; //셋팅된 active 슬라이드에 맞춰 이동해줘

      removeAttrAll(whichElem.slides, "data-slide"); //this.slides 의 data-slide 속성을 remove해줘      
      whichElem.activeNum = this.activeNum;
      this.slider.style.transition = "all 0.5s ease 0s"; 
      whichElem.slider.style.transform = "translateX(-"+ whichElem.slides[whichElem.activeNum].offsetWidth * whichElem.activeNum +"px)"; //셋팅된 active 슬라이드에 맞춰 이동해줘
    }
  });
};
Slider.prototype.makeClones = function(){
  // loop일경우 처음과 끝 이어지게
  let clonePrev = this.slides[this.slides.length-1].cloneNode(true),
      cloneNext = this.slides[0].cloneNode(true);
  clonePrev.className += " clone";
  cloneNext.className += " clone";
  clonePrev.dataset.slide = "clone";
  cloneNext.dataset.slide = "clone";

  this.slider.insertBefore(cloneNext, this.slider.children[this.slides.length - 1].nextElementSibling);
  this.slider.insertBefore(clonePrev, this.slider.children[0]);      
};
Slider.prototype.fullSize = function(){
  this.slides.forEach(slide =>{
    slide.style.height = window.innerHeight+"px";
    slide.style.width = window.innerWidth+"px";
  });
  window.addEventListener("resize", () =>{
    this.slides.forEach(slide =>{
      slide.style.height = window.innerHeight+"px";
      slide.style.width = window.innerWidth+"px";
    });
    this.slider.style.transition = "none"; //바뀐 슬라이드 사이즈에 맞춰 이동해줘
    this.slider.style.transform = "translateX(-"+ this.slides[this.activeNum].offsetWidth * this.activeNum +"px)"; //바뀐 슬라이드 사이즈에 맞춰 이동해줘
  });
};

// 슬라이더 오브젝트 생성
const dataSliders = document.querySelectorAll("[data-slider]");
// 슬라이더 마다
let fullSlider, multipleSlider;

dataSliders.forEach(slider => {
  switch(slider.dataset.slider){
    case "full" :
      fullSlider = new Slider(slider, {
        responsive: true,
      });
      break;
    case "multiple" :
      multipleSlider = new Slider(slider, {
        loop: false,
        slidesPerView: 4,
        spaceBetween: "auto",
      });
  }
});

fullSlider.commonFun(multipleSlider);
fullSlider.fullSize();     
// fullSlider.changeWith(multipleSlider);
multipleSlider.commonFun(fullSlider);      
// multipleSlider.changeWith(fullSlider);
// END: 슬라이더