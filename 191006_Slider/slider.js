
/* 
  마우스 무브 슬라이드 기능, 스와이프 기능
  자동 슬라이드 옵션
  자동 슬라이드일때 슬라이드 움직이면 초 리셋
  스피드 조절 옵션
  슬라이드 한번에 몇개 옵션
  한번에 여러개일 경우 간격 옵션
  몇번째 슬라이드인지 나타내는 숫자
  슬라이더 에로우 버튼 클릭하면 슬라이드 기능
  인디게이터 옵션에 따라 인디게이터 추가하기
  세로 슬라이드 기능
*/
/*  */

const sliders = document.querySelectorAll('[data-js="slider"]')
// wrapSlide = sliders[x].querySelector('.wrap-slide'),
// slides = wrapSlide.querySelectorAll('.slide')
;


// 엘리먼트 갯수만큼 오브젝트 추가하기
function setObjs(obj, objName, elems){
  elems.forEach((elem, index) => {
    obj[objName+index] = elem;
  });
}
setObjs(dataSliders = {}, "slider", sliders);


// COMMON
// 콘솔로그
function log(data){
  console.log(data);
}




log(dataSliders);
