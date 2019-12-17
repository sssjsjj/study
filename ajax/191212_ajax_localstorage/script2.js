function layerShow(){
  const $openBtn = document.querySelector("[data-role='setting'] button"),
        $targetLayer = document.querySelector(".layer");
        console.log($targetLayer)
  let removeClass = $targetLayer.className.replace(" hidden", "");
  $openBtn.addEventListener("click", () => $targetLayer.className = removeClass)
}


document.querySelector(".list_icon_link li a").addEventListener("click", () => {
  console.log("애는 돼?");
});