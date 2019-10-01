// //virtual data
// const optionType1 = ["매우 아니다", "아니다", "보통이다", "그렇다", "매우 그렇다"];
// const questions = [
//   {
//     "index" : 1,
//     "title" : "강의계획이 체계적이었으며, 학사일정에 맞추어 안내하였다.",
//     "options" : optionType1
//   },
//   {
//     "index" : 2,
//     "title" : "강의계획이 체계적이었으며, 학사일정에 맞추어 안내하였다.",
//     "options" : optionType1
//   },
//   {
//     "index" : 3,
//     "title" : "강의계획이 체계적이었으며, 학사일정에 맞추어 안내하였다.",
//     "options" : optionType1
//   }
// ]

const polls = [
  [1, 5, 2], [4, 3, 1], [5, 4, 3], [1, 5, 4], [2, 3, 1], [5, 4, 3], 
  [1, 3, 2], [3, 5, 1], [4, 3, 2], [5, 1, 4], [2, 3, 1], [5, 4, 2], 
  [2, 3, 2], [4, 1, 2], [3, 1, 5], [1, 2, 5], [4, 3, 1], [5, 4, 3], 
  [2, 1, 5], [4, 3, 1], [2, 5, 1], [2, 4, 3], [1, 5, 2], [4, 3, 2], 
  [1, 5, 2], [1, 2, 3], [5, 4, 1], [5, 2, 4], [3, 1, 3], [1, 3, 5]
];

let graphs = [];
const questions = document.querySelectorAll("[data-js=question]"), //문항 갯수
      graphAreaSample = document.querySelectorAll(".list_poll_graph")[0], //그래프 막대 영역 (사이즈 측정 위해 예시 1개만)
      optionLength = graphAreaSample.children.length, //문항 선택지 갯수
      graphIndexes = document.querySelectorAll(".index_graph"), //그래프 인덱스
      indexGap = 2;//그래프 인덱스 간격 설정
      

questions.forEach(function(question, index){
  graphs[index] = {};
  graphs[index].answers = [];
  graphs[index].scores = [];
  graphs[index].maxValue = 0;
  graphs[index].indexNum = 0;
  graphs[index].average = 0;
  graphs[index].scoreSum = 0;
/* 설문조사 데이터 문항별 수치를 구하기 위한 과정 - 1
  문항별 수치들을 1개의 스트링으로 묶어 배열에 저장
*/
  let strAllPolls = [];
  strAllPolls[index] = "";
  for(let poll in polls){
    strAllPolls[index] += (polls[poll][index]);
  }

/* 설문조사 데이터 문항별 수치를 구하기 위한 과정 - 2
  저장한 스트링에 해당 옵션이 몇번 나오는지 구하기 위해 
  해당 지점을 잘라 -1 한다.
  */

  for (let y = 0; y < optionLength; y++ ){
    graphs[index].answers[y] = (strAllPolls[index].split(y + 1).length - 1);
  }

/* 문항별 최대 수치
  문항별 최대 수치에 따라 생성되는 그래프 인덱스 갯수
*/  
  graphs[index].maxValue = Math.max.apply(null, graphs[index].answers);
  graphs[index].indexNum = Math.ceil( graphs[index].maxValue / indexGap);

  //graph vertical index add
  for(let y = 0; y <= graphs[index].indexNum; y++){
    graphIndexes[index].innerHTML += 				"<li class=\"item\"><span class=\"txt_num\">"+  (indexGap * y) + "</span></li>"
  }

  //graph horizontal bar
  const graphBarArea = question.querySelector(".list_poll_graph"),
        graphBars = graphBarArea.querySelectorAll(".bar_graph");

  for(let y = 0; y < optionLength; y++){
    graphBars[y].style.width = Math.round(graphs[index].answers[y] / ( graphs[index].indexNum * 2) * 100) + "%";
    graphBars[y].querySelector(".txt_num").innerHTML = graphs[index].answers[y];

    // Score by Selection
    graphs[index].scores[y] = graphs[index].answers[y] * ( y * 25 );
  } 

  // Sum all scores by selection
  graphs[index].scoreSum = graphs[index].scores.reduce(function(total, num){
    return total + num;
  });

  // Divide the sum of the scores and calculate the average.
  graphs[index].average = graphs[index].scoreSum / polls.length;

  // display the average
  const averages = question.querySelector(".average");
  averages.innerHTML = graphs[index].average.toFixed(2);
});



console.log(graphs);
