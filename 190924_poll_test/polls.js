function log(code){
  console.log(code);
}
//Array - pols per person
const polls = [
  [1, 5, 2], [4, 3, 1], [5, 4, 3], [1, 5, 4], [2, 3, 1], [5, 4, 3], 
  [1, 3, 2], [3, 5, 1], [4, 3, 2], [5, 1, 4], [2, 3, 1], [5, 4, 2], 
  [2, 3, 2], [4, 1, 2], [3, 1, 5], [1, 2, 5], [4, 3, 1], [5, 4, 3], 
  [2, 1, 5], [4, 3, 1], [2, 5, 1], [2, 4, 3], [1, 5, 2], [4, 3, 2], 
  [1, 5, 2], [1, 2, 3], [5, 4, 1], [5, 2, 4], [3, 1, 3], [1, 3, 5]
];
let answersNum = [],
    averageTxts = [];
const questionNum = document.querySelectorAll("[data-js=question]").length,
      graphIndexes = document.querySelectorAll(".index_graph"),
      graphAreaSample = document.querySelectorAll(".list_poll_graph")[0],
      choiceLength = graphAreaSample.children.length;
(function pollsPerAnswer(){  
  let pollStrings = [];
  //질문 갯수만큼 배열 생성
  for(let x = 0; x < questionNum; x++ ){
    pollStrings[x] = "";
    answersNum[x] = new Array;
    averageTxts[x] = new Array;
  }
  //문항별 답들을 한개의 스트링으로 합쳐서 방금 생성한 배열에 삽입
  for(let x = 0; x < polls.length; x++ ){
    for(let y = 0; y < questionNum; y++ ){
      pollStrings[y] += (polls[x][y]);
    }  
  }
  log("####문항별 전체 답 스트링(function spollsPerAnswer) ↓ ")
  log(pollStrings);
  log("----------------------------------------------");


  for(let x = 0; x < questionNum; x++ ){
    for (let y = 0; y < choiceLength; y++ ){
      answersNum[x][y] = (pollStrings[x].split(y + 1).length - 1);
    }
  }
})();

log("####문항별 답변 갯수 answersNum(global) ↓ ");
log(answersNum);
log("----------------------------------------------");


function drawGraphIndex(){
  
  for(let x = 0; x < answersNum.length; x++){
    const indexGap = 2,//인덱스 간격 설정
          maxAnswer = Math.max.apply(null, answersNum[x]),
          indexNum = Math.ceil( maxAnswer / indexGap);

    //graph index - vertical
    for(let y = 0; y <= indexNum; y++){
      graphIndexes[x].innerHTML += 				"<li class=\"item\"><span class=\"txt_num\">"+  (indexGap * y) + "</span></li>"
    } 

    //graph bar - horizontal    
    const questions = document.querySelectorAll("[data-js=question]"),
          graphBarArea = questions[x].querySelector(".list_poll_graph"),
          graphBars = graphBarArea.querySelectorAll(".bar_graph"),
          widthPerAnswer = graphAreaSample.offsetWidth/ (indexNum * 2);

    for(let y = 0; y < graphBars.length; y++){
      graphBars[y].style.width = widthPerAnswer * answersNum[x][y] + "px";
      graphBars[y].querySelector(".txt_num").innerHTML = answersNum[x][y];

      //average 
      averageTxts[x].push(answersNum[x][y] * (y*25))
    } 

    const averages = questions[x].querySelector(".average");
    let sums = [0,0,0];
    let sum = 0;
    for (var y = 0; y < choiceLength; y++){
      sum =+ averageTxts[x][y];
    }
    log(sum)
    log(sums[x]/polls.length)
  }  
  log(averageTxts);
  // for(let x = 0; x < answersNum.length; x++){

  // }
}


window.onload =  function(){
  drawGraphIndex();
};