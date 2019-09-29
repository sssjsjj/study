//virtual data
const polls = [
  [1, 5, 2], [4, 3, 1], [5, 4, 3], [1, 5, 4], [2, 3, 1], [5, 4, 3], 
  [1, 3, 2], [3, 5, 1], [4, 3, 2], [5, 1, 4], [2, 3, 1], [5, 4, 2], 
  [2, 3, 2], [4, 1, 2], [3, 1, 5], [1, 2, 5], [4, 3, 1], [5, 4, 3], 
  [2, 1, 5], [4, 3, 1], [2, 5, 1], [2, 4, 3], [1, 5, 2], [4, 3, 2], 
  [1, 5, 2], [1, 2, 3], [5, 4, 1], [5, 2, 4], [3, 1, 3], [1, 3, 5]
];

let graphs = [];
const questionNum = document.querySelectorAll("[data-js=question]").length,
      graphIndexes = document.querySelectorAll(".index_graph"),
      graphAreaSample = document.querySelectorAll(".list_poll_graph")[0],
      optionLength = graphAreaSample.children.length,
      indexGap = 2;//index option

for(let x = 0; x < questionNum; x++ ){
  graphs[x] = {};
  graphs[x].answers = [];
  graphs[x].answerScore = [];
  graphs[x].maxValue = 0;
  graphs[x].indexNum = 0;
  graphs[x].average = 0;
  graphs[x].sumScores = 0;

  /*Combine the polls data by question into one string
  and insert them into the array */
  let strAllPolls = [];
  strAllPolls[x] = "";
  for(let y = 0; y < polls.length; y++ ){
    strAllPolls[x] += (polls[y][x]);
  }

  // Number of choices by option
  for (let y = 0; y < optionLength; y++ ){
    graphs[x].answers[y] = (strAllPolls[x].split(y + 1).length - 1);
  }

  graphs[x].maxValue = Math.max.apply(null, graphs[x].answers);
  graphs[x].indexNum = Math.ceil( graphs[x].maxValue / indexGap);


  //graph vertical index add
  for(let y = 0; y <= graphs[x].indexNum; y++){
    graphIndexes[x].innerHTML += 				"<li class=\"item\"><span class=\"txt_num\">"+  (indexGap * y) + "</span></li>"
  }

  //graph horizontal bar
  const questions = document.querySelectorAll("[data-js=question]"),
        graphBarArea = questions[x].querySelector(".list_poll_graph"),
        graphBars = graphBarArea.querySelectorAll(".bar_graph");

  for(let y = 0; y < optionLength; y++){
    graphBars[y].style.width = Math.round(graphs[x].answers[y] / ( graphs[x].indexNum * 2) * 100) + "%";
    graphBars[y].querySelector(".txt_num").innerHTML = graphs[x].answers[y];

    // Score by Selection
    graphs[x].answerScore[y] = graphs[x].answers[y] * ( y * 25 );
  } 

  // Sum all scores by selection
  graphs[x].sumScores = graphs[x].answerScore.reduce(function(total, num){
    return total + num;
  });

  // Divide the sum of the scores and calculate the average.
  graphs[x].average = graphs[x].sumScores / polls.length;

  // display the average
  const averages = questions[x].querySelector(".average");
  averages.innerHTML = graphs[x].average.toFixed(2);
}

console.log(graphs);
