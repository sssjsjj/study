var users = [
  { id: 1, name: "ID", age: 32 },
  { id: 2, name: "HA", age: 25 },
  { id: 3, name: "BJ", age: 32 },
  { id: 4, name: "PJ", age: 28 },
  { id: 5, name: "JE", age: 27 },
  { id: 6, name: "JM", age: 32 },
  { id: 7, name: "HI", age: 24 }
];

let bindValue = key => list => map(list, v => v[key]);

const under_30 = u => u.age < 30,
      up_30 = u => u.age >= 30,
      ages = bindValue("age"),
      names = bindValue("name");

// (2)
console.log(log_length(ages(filter(users, under_30))));

// (4)
console.log(log_length(names(filter(users, up_30))));

//조건에 맞는 array 줘
function filter(list, predicate) {
  var new_list = [];
  for (let i = 0; i < list.length; i++) {
    if(predicate(list[i])) new_list.push(list[i]);
  }
  return new_list;
}

//원하는 프로퍼티 값 array 줘
function map(list, iteratee) {
  var new_list = [];
  for (var i = 0, len = list.length; i < len; i++) {
    new_list.push(iteratee(list[i]));
  }
  return new_list;
}

// value 길이 콘솔 찍어주
function log_length(value){
  console.log(value.length);
  return value;
}

function addMaker(a){
  return function(b){
    return a + b;
  }
}
