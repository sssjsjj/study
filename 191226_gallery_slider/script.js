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
    let thisAttr = elem.attributes[attr];
    if(thisAttr){      
      thisAttr.value = ""
    }
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
function Slider(el, ops){
  this.type = el.dataset.slider;
  this.wrap = el;
  this.slider = el.querySelector(".slider");
  this.slides = el.querySelectorAll(".slide");    
  this.viewport = el.querySelector(".view-slider");    
  this.arrows = el.parentNode.querySelectorAll(".arrow button");    
  this.onIdx = 0;
  this.transition = "all 0.5s ease";
  this.loop = true;
  if(ops){
    for(const op in ops){
      this[op] = ops[op];
    }
  }
};

let sliders = [];
const $sliders = document.querySelectorAll("[data-slider]");
$sliders.forEach(slider =>{
  let obj = new Slider(slider);
  sliders.push(obj);
});


Slider.prototype.setActive = function(_onIdx, target){
  // active 넘버에 따라 slide dataset 셋팅.
  target.onIdx = _onIdx;
  target.slides[_onIdx].dataset.slide = "active";
};
Slider.prototype.setPrevNext = function(_onIdx){
  const activePrevNum = _onIdx != 0 ? _onIdx - 1 : this.slides.length - 1,
        activeNextNum = _onIdx != this.slides.length - 1 ? _onIdx + 1 : 0;
  this.slides[activePrevNum].dataset.slide = "prev";
  this.slides[activeNextNum].dataset.slide = "next";
};
Slider.prototype.startSlider = function(twin){
  this.setActive(this.onIdx, this);
  //전체 슬라이더 사이즈 
  this.slider.style.width = this.slides[this.onIdx].offsetWidth * this.slides.length + "px";
  this.clickArrow(twin);
};
Slider.prototype.sliding = function(target, chnageIdx){
  this.setActive( chnageIdx, target );
  target.slider.style.transition = target.transition; 
  target.slider.style.transform = "translate(-"+ target.slides[chnageIdx].offsetWidth * chnageIdx +"px)";
};
Slider.prototype.clickArrow = function(twin){
  const BtnArrow = new ClickElem( this.arrows );
  // 이 Arrow Click하면
  BtnArrow.click(el => {
    console.log(this.loop)
    const where = el.dataset.btn,
          whenFirst = this.onIdx === 0 && where === "prev",
          whenLast = this.onIdx === this.slides.length-1 && where === "next",
          chnageIdx = this.moveToWhere( where );
    if(!this.loop && (whenFirst || whenLast)){
      return false;
    }else{
      //this.slides 의 data-slide 속성 remove
      removeAttrAll(this.slides, "data-slide"); 
      this.sliding(this, chnageIdx);
      document.getElementById("uiCurrentIndex").innerText = chnageIdx +1;
      // 쌍둥슬있으면 같이 움직
      if(twin){
        removeAttrAll(twin.slides, "data-slide"); 
        twin.onIdx = chnageIdx;
        this.sliding(twin, chnageIdx);
      }
    }
  });
}
Slider.prototype.moveToWhere = function(btnType){
  let num,
      lastIdx = this.slides.length - 1;
  if(this.onIdx == lastIdx && btnType == "next"){
    num = 0;
  }else if (this.onIdx == 0 && btnType == "prev"){
    num = lastIdx;
  }else if(btnType == "next"){
    num = this.onIdx + 1;
  }else if(btnType == "prev"){
    num = this.onIdx - 1;
  }
  return num;
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
Slider.prototype.fullSlide = function(){
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
    this.slider.style.transform = "translateX(-"+ this.slides[this.onIdx].offsetWidth * this.onIdx +"px)"; //바뀐 슬라이드 사이즈에 맞춰 이동해줘
  });
};
Slider.prototype.multiSlide = function(num){
  this.slides.forEach(slide =>{
    slide.style.width = this.wrap.clientWidth / num + "px";
  });
  window.addEventListener("resize", () =>{
    this.slides.forEach(slide =>{
      slide.style.width = window.clientWidth / num + "px";
    });
    this.slider.style.transition = "none"; //바뀐 슬라이드 사이즈에 맞춰 이동해줘
    this.slider.style.transform = "translateX(-"+ this.slides[this.onIdx].offsetWidth * num * this.onIdx +"px)"; //바뀐 슬라이드 사이즈에 맞춰 이동해줘
  });
}

// 슬라이더 오브젝트 생성
const $galleryMain = document.querySelector(".galleryBody [data-slider]");
const $galleryThumb  = document.querySelector(".thumbCont [data-slider]");

// 슬라이더 마다
let fullSlider, multipleSlider;
fullSlider = new Slider($galleryMain, {
  slidesPerView: "full",
});
multipleSlider = new Slider($galleryThumb, {
  loop: false,
  slidesPerView: 4,
  spaceBetween: "auto",
});

fullSlider.startSlider(multipleSlider);
fullSlider.fullSlide();     
fullSlider.makeClones();     

multipleSlider.startSlider(fullSlider);     
multipleSlider.multiSlide(4);
// END: 슬라이더