/*jshint esversion: 6*/



const btnLayerToggles = document.querySelectorAll("[data-role*='layertoggle']"),
targetLayers = document.querySelectorAll("[data-role*='layertarget']");

console.log(el_thisDataSet(targetLayers, "index", "0"))

  btnLayerToggles.forEach(btnLayerToggle => {
    btnLayerToggle.addEventListener("click", (e)=>{
      let i = btnLayerToggle.dataset.index,
      targetLayer = el_thisDataSet(targetLayers, "index", i);
      if(hasClass(targetLayer, "open")){
        removeClass(targetLayer, "open");
      }else{
        addClass(targetLayer, "open");
      }
    });
  });


function addClass(el, className){
  el.className += " "+className;
}

function removeClass(el, className){
  el.className = el.className.replace(" "+className,"");
}

function hasClass(el, className){
  let arr = el.className.split(" ");
  if(arr.indexOf(className) > -1){
    return true;
  }else{
    return false;
  }
}


function el_thisDataSet(els, dataSetName, dataSetValue){
  let target;
  els.forEach(el => {
    if(el.dataset[dataSetName] === dataSetValue){
      target = el;
    }
  });
  return target;
}
