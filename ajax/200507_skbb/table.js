function DataTable (elem){
  this.section = elem; //section
  this.data = {}; //section에 각 data파일명 표시할 수 있게 한 뒤 불러들임
  this.td = elem.querySelectorAll("td");


  this.init();
}
// 데이터 불러 들인 후 옵션, 테이블 셋팅.
DataTable.prototype.init = function(){
  httpGet(this.section.dataset.jsonname + ".json", responseText => {
    this.data = JSON.parse(responseText);
    // console.log(this.data);

    this.setOptions();
  });
};

// 셀렉트 내 옵션 셋팅
DataTable.prototype.setOptions = function(){
  const
    selectCity = this.section.querySelector("select[data-js='city']"),
    selectArea = this.section.querySelector("select[data-js='area']"),
    selectBroad = this.section.querySelector("select[data-js='broad']")
  ;


  // this.data.mergeArr("city");
  console.log(Array.prototype)
  console.log({Object})
  console.log(Object.prototype)
  console.log(Object.keys(this.data[0]))
};

const table1 = new DataTable(document.getElementById("table1"));
