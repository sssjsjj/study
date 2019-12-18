/*jshint esversion: 6 */
/*
1. 셋팅 버튼으로 레이어 불러오기
2. 5개까지 선택해서 설정 완료 버튼 누르면 레이어 종료되면서 메인 리스트 선택 항목으로 교체
3. 설정완료 항목은 localstorage로 저장
4. 메인 페이지 새로 고침의 경우 localstorage 항목이 있으면 해당 내용으로 리스트 셋팅. 없으면 기본 항목으로 셋팅
5. 셋팅 버튼으로 레이어 불러왔을 때 localstorage 항목 있으면 해당 항목 선택 상태. 없으면 기본 항목 선택 상태
5. 기본 항목은 첫 번째부터 내 차 정보, 자기진단도우미, 보증 정보, 서비스 이력, 상용블루핸즈 이지만 기본 항목을 나중에 변경할 수 있도록 구성
6. 레이어에서 초기화 버튼 클릭 시 기본 항목으로 선택
7. 레이어 선택된 항목에는 순서대로 번호 노출, 선택 순서대로 번호 매김
8. 선택 항목 해제시 번호 셋팅 다시. ex) 1,2,3,4,5 에서 2번 체크 해제 하면 1, 해제, 2,3,4 그리고 선택하면 5
9. 5개 이상 선택은 막음
*/

(function(){
  // let httpRequest;
  const $wrap = document.getElementById("wrap"),
        $btnSetting = document.querySelector("[data-role='setting'] button"),        
        $ajaxArea = document.querySelector("[data-role='ajax-area']");

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
          $closeBtn = document.querySelector(".btn_close button");

    let selectMenus = [],
        menu = {"link" : "", "text" : ""};

    //레이어 팝업 체크박스 클릭 했을 때
    $chkBoxes.forEach($chkBox => {
      $chkBox.addEventListener("click", (e) => {
        // 클릭해서 체크 됐을 때.
        if(e.target.checked){
          // 5개 까지만 배열에 삽입.
          if(selectMenus.length < 5){
            selectMenus.push(e.target.title);
          }else{// 5개 넘었을 땐 얼럿. 체크되지 않도록 막음.
            alert("최대 5개까지 선택 가능합니다.");
            e.target.checked = false;
          }          
        }else{// 체크해제되면 배열에서 제거
          selectMenus.splice(selectMenus.indexOf(e.target.title),1);
        }        
        console.log(selectMenus);
      });
    });


    // 레이어 닫기 클릭시 레이어 팝업 소스 제거
    $closeBtn.addEventListener("click", (e) => {
      if(selectMenus.length > 0){
        const $menuArea = document.querySelector(".box_icon_link .list_icon_link"),
         $customMenus = document.querySelectorAll(".box_icon_link .list_icon_link li:not([data-role='setting'])"),
          customMenuHTML = $customMenus[0].outerHTML;

        let i = 0;
        // removeChild
        // $menuArea.innerHTML = "";
        selectMenus.forEach(selectMenu => {
          console.log(selectMenu)
          $menuArea.innerHTML += customMenuHTML;

          document.querySelectorAll(".box_icon_link .list_icon_link li:not([data-role='setting'])")[i].innerText = selectMenus[i];
          i++;
        });
      }
      $ajaxArea.innerHTML = "";
    });
  }


})();
