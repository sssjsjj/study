/*jshint esversion: 6 */
(function(){
  // let httpRequest;
  const $btnSetting = document.querySelector("[data-role='setting'] button"),        
        $ajaxArea = document.querySelector("[data-role='ajax-area']"),
        $menuArea = document.querySelector(".box_icon_link .list_icon_link"),
        btnSettingHTML = $btnSetting.parentElement.outerHTML;

  // 셋팅 버튼 클릭시
  $btnSetting.addEventListener("click", () => {
      makeAjaxRequest($ajaxArea, "GET", "setting.html");
  });

  // ajax
  function makeAjaxRequest(where, how, what){
    //JavaScript를 이용하여 서버로 보내는 HTTP request를 만들기 위해서는 그에 맞는 기능을 제공하는 Object의 인스턴스가 필요.
    //XMLHttpRequest 가 그러한 Object의 한 예
    let httpRequest = new XMLHttpRequest();
  
    if(!httpRequest){
      alert("XMLHTTP 인스턴스를 만들 수가 없어요 ㅠㅠ");
      return false;
    }
  
    httpRequest.onreadystatechange = () => {
    //통신 에러 (서버가 다운되는 상황 등) 상황에서, status 필드를 접근하려 하면 onreadystatechange 메서드에서 예외에러를 발생 시킬 것입니다. 이러한 문제를 예방하기 위해서 if...then 구문을 try…catch 구문으로 감싸주세요.
      try{
        if(httpRequest.readyState === XMLHttpRequest.DONE){
          if(httpRequest.status === 200){
            where.innerHTML = httpRequest.responseText;
            afterAjax();
          }else{
            console.log("request에 뭔가 문제가 있댜.");
          }
        }
      } catch(e){
        alert("Caught Exception: " + e.description);
      }
    };
    httpRequest.open(how, what, true);
    httpRequest.send();
  }
  //ajax 로드 후 실행할 이벤트
  function afterAjax(){
    const $chkBoxes = document.querySelectorAll("input[type='checkbox']"),
          $closeBtn = document.querySelector(".btn_close button"),
          $setupBtn = document.querySelector("button[data-role='setting']"),
          $resetBtn = document.querySelector("button[data-role='default']");

    let selectMenus = [],
        defaultMenus = ["내 차 정보", "상용블루핸즈", "자가진단", "정비 예약", "긴급출동"];

    //레이어 팝업 체크박스 클릭 했을 때
    $chkBoxes.forEach($chkBox => {
      const $menuText = $chkBox.parentElement.querySelector("span");
      if(localStorage.getItem("selectMenu")){
        let selectMenus = localStorage.getItem("selectMenu").split(",")
            i = 1;
        selectMenus.forEach(selectMenu => {
          if(selectMenu == $menuText.innerHTML){
            $chkBox.checked = true;
            $menuText.innerHTML += "<span class='num'> "+ i +"</span>";
          }
          i++;
        });
      }else{
        $chkBox.addEventListener("click", (e) => {
          // 클릭해서 체크 됐을 때.
          if(e.target.checked){
            // 5개 까지만 배열에 삽입.
            if(selectMenus.length < 5){
              selectMenus.push(e.target.title);
              $menuText.innerHTML += "<span class='num'> "+selectMenus.length+"</span>";
            }else{// 5개 넘었을 땐 얼럿. 체크되지 않도록 막음.
              alert("최대 5개까지 선택 가능합니다.");
              e.target.checked = false;
            }          
          }else{// 체크해제되면 배열에서 제거
            selectMenus.splice(selectMenus.indexOf(e.target.title),1);
            $menuText.removeChild($menuText.childNodes[1])
          }        
          // console.log(selectMenus);
        });
      }
    });

    $resetBtn.addEventListener("click", (e) => {
      $menuArea.innerHTML = "";
      defaultMenus.forEach(defaultMenu => {
        $menuArea.innerHTML += "<li><a href='#'>"+defaultMenu+"</a></li>";
      });        
      $menuArea.innerHTML += btnSettingHTML;
      $ajaxArea.style = "display: none;";
      $chkBoxes.forEach($chkBox => {
        $chkBox.checked = false;
        const $numText = $chkBox.parentElement.querySelector("span.num");
        if($numText){
          $numText.outerHTML ="";
        }        
      });
      localStorage.removeItem("selectMenu");
      selectMenus = [];
    });

    // 레이어 닫기 클릭시 레이어 팝업 소스 제거
    $setupBtn.addEventListener("click", (e) => {
      console.log(selectMenus);
      if(selectMenus.length > 0){
        $menuArea.innerHTML = "";
        selectMenus.forEach(selectMenu => {          
          localStorage.setItem("selectMenu", selectMenus);
          console.log(selectMenu)
          $menuArea.innerHTML += "<li><a href='#'>"+selectMenu+"</a></li>";
        });        
        $menuArea.innerHTML += btnSettingHTML;
      }
      $ajaxArea.style = "display: none;";
    });

    $closeBtn.addEventListener("click", (e) => {
      if(!localStorage.getItem("selectMenu")){
        $chkBoxes.forEach($chkBox => {
          $chkBox.checked = false;
        });
      }
      $ajaxArea.style = "display: none;";
    });
  }

  //로드했을떄 이전에 선택했던 내용있으믄 그대로.
  window.addEventListener('DOMContentLoaded', function(){
    const storageMenu = localStorage.getItem("selectMenu");
    if(storageMenu){
      let selectMenus = storageMenu.split(",")
      console.log(selectMenus)
      
      $menuArea.innerHTML = "";
      selectMenus.forEach(selectMenu => {
        console.log(selectMenu)
        $menuArea.innerHTML += "<li><a href='#'>"+selectMenu+"</a></li>";
      });        
      $menuArea.innerHTML += btnSettingHTML;  
    }

    // 팝업도 안보이는 상태로 불러와서, 선택했던 내용 표시해주기
    makeAjaxRequest($ajaxArea, "GET", "setting.html");
    $ajaxArea.style = "display: none;";
  });
})();

  //설정 후.
  document.querySelector("body").addEventListener("click", (e) => {
    if(e.target.parentElement.dataset.role === "setting" && document.querySelector("[data-role='ajax-area']")){
      document.querySelector("[data-role='ajax-area']").style = "display: block;"
    }
  });