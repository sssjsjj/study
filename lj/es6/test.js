'use strict';

let funds = 50,
    round = 0;

while(funds > 1 && funds < 100){
  round++;
  // console.log(round) 
  //돈을 겁니다.
  const bets =  {
    crown: 0,
    anchor: 0,
    heart: 0,
    spade: 0,
    club: 0,
    diamond: 0
  };
  let totalBet = randomNum(1, funds);
  if(totalBet === 7){ //7펜스가 나오면 
    totalBet = funds; //올인한다
    bets.heart = totalBet; //하트에
  }else{//7펜스가 안나오면
    //그 판에 걸 돈을 분배
    let remaining = totalBet;
    do{
      let bet = randomNum(1, remaining);
      let face = randomFace();
      bets[face] = bets[face] + bet;
      remaining = remaining - bet;
    }while(remaining > 0);
  }
  funds = funds - totalBet;
  // console.log('\tbets: ' + Object.keys(bets).map(face => `${face}: ${bets[face]} pence`).join(`, `) + ` (total: ${totalBet} pence)`)
  
  //주사위 결과값 구하기
  const hand = [];
  for(let roll = 0; roll < 3; roll++){
    hand.push(randomFace());
  }
  // console.log(`\thand: ${hand.join(', ')}`)

  //딴 돈을 가져옵니다.
  let winnings = 0;
  for(let die = 0; die < hand.length; die++){
    let face = hand[die];
    if(bets[face] > 0) winnings = winnings + bets[face];
  }
  funds = funds + winnings
  // console.log(`\twinnings: ${winnings}`)
}
// console.log(`\tending funcs: ${funds}`);



// m이상 n이하의 무작위 정수 반환
function randomNum(m,n){
  return m + Math.floor((n-m+1)*Math.random());
}

//크라운 앤 앵커 게임의 여섯가지 도형 중 하나를 무작위 반환합니다
function randomFace(){
  return ["crown", "anchor", "heart", "spade", "club", "diamond"][randomNum(0, 5)];
}




// for(let temp, i=0, j=1; j<30; temp=i, i=j, j=i+temp){
//   console.log(j)
// }

// 증가, 감소 연산자는 덧셈보다 먼저 실행된다.
let x = 2;
const r=x++ + x++; //x: 4 , 합: 5
const r2 = ++x + ++x; //x: 6 , 합: 11
const r3 = x++ + ++x; //x: 8 , 합: 14
const r4 = ++x + x++; //x: 10 , 합: 18
let y =10;
const r5 = y-- + y--; //y: 8 , 합: 19
const r6 = --y + --y; //y: 6 , 합: 13
const r7 = y-- + --y; //y: 4 , 합: 10
const r8 = --y + y--; //y: 2 , 합: 6
// console.log( r, r2, r3, r4, r5, r6, r7, r8)

let x1= 0, y1=10, z1;
z1 = x1++, y1++;
// console.log(z1) 

function getSentence({subject, verb, object}){
  return `${subject} ${verb} ${object}`;
}

const o = {
  subject: "I",
  verb: "love",
  object: "JavaScript"
}

// console.log(getSentence(o))

const bruce = {name: "Bruce" };
const madeline = {name:"Madeline"};

const greet = () => `Hello, I'm ${this.name}!`;
function greet1(){
  return `Hello, I'm ${this.name}`
}

// console.log(greet())
// console.log(greet1.call(bruce))
// console.log(greet1.call(madeline))

function update(birthYer, occupation){
  this.birthYer = birthYer;
  this.occupation = occupation;
}
update.call(bruce, 1949, 'singer')
// console.log(bruce)

update.apply(madeline, [1949, 'programmer'])
// console.log(madeline)

const arr = [2, 3, -5, 15, 7];
// console.log(Math.min.apply(null, arr))
// console.log(Math.min(...arr))

const updateBruce = update.bind(bruce);
updateBruce(1904, "actor")
// console.log(bruce)


// const arr1 = [1,5,6];
// arr1.splice(1,0,2,3,4)
// console.log(arr1)
// arr1.splice(5,0,6)
// console.log(arr1)
// arr1.splice(1,2)
// console.log(arr1)
// arr1.splice(2,1,'a', 'b')

const arr2 = [1,2,3,4]
arr2.copyWithin(0, -3, -1);
console.log(arr2)

const sortArr = [
  {name: "Suzanne"},
  {name: "Jim"},
  {name: "Trevor"},
  {name: "Amanda"},
]
sortArr.sort((a,b) => {
  // console.log(a);
  // console.log(b);
  console.log(a.name > b.name)
});

// console.log(sortArr.sort((a,b) => a.name > b.name))
// sortArr.sort((a,b) => a.name[1] > b.name[1]);
// console.log(sortArr)

function Person(name) {
    this.name = name;
    this.id = Person.nextId++;
}
console.log(Person)
class Person1 {
  constructor(name) {
    this.name = name;
    this.id = Person.nextId++;
  }
}
console.log(Person1)

Person.nextId = 0;
const jamie = new Person("Jamie"),
      juliet = new Person("Juliet"),
      peter = new Person("Peter"),
      jay = new Person("Jay");

      const arr22 = [jamie, juliet, peter, jay];

console.log(arr22)

const cards = [];
for(let suit of ['H', 'C', 'D', 'S'])
  for(let value=1; value<=13; value++)
    cards.push({suit, value});

console.log(cards.filter(c => c.value > 10 && c.suit === 'H'));


{
  const suits = { 'H': '\u2665', 'C': '\u2664', 'D': '\u2666', 'S': '\u2660'};
  const values = { 1: 'A', 11: 'J', 12: 'Q', 13: 'K'};
  console.log(cards.map(c => cardToString(suits, values, c)))
  console.log(cards.filter(c => c.value === 2).map(c => cardToString(suits, values, c)));
}
function cardToString(suits, values, c){
  const newArr = values
  for(let i=2; i<=10; i++) newArr[i] = i;
  
  return newArr[c.value] + suits[c.suit];
}

const words = ["aaaa", "bsefsf", "cvfv", "dser", "esas", "aa", "bbb", "cccs", "ddd", "eeeee" ]
const alpha = words.reduce((a,x) => {
  if(!a[x[0]]) a[x[0]] = [];
  a[x[0]].push(x)
  return a
}, {})

// console.log(alpha)

const data = [3.3, 5, 7.2, 12, 4, 6, 10.3];
const stats = data.reduce((a, x) => {
  a.N++;
  let delta = x - a.mean;
  a.mean += delta/a.N;
  a.M2 += delta*(x-a.mean);
  return a;
}, {N: 0, mean: 0, M2: 0});

if(stats.N > 2){
  stats.variance = stats.M2 / (stats.N - 1);
  stats.stdev = Math.sqrt(stats.variance);
}

// console.log(stats)

const longWords = words.reduce((a,x)=>x.length > 4? a+" "+x :a,"").trim() // :a가 뭐죠..?
// console.log(longWords)

// filter join
const longWords1 = words.filter( x => x.length > 4 ).join(" ")
// console.log(longWords1)
const
  u1 = {name:'Cynthia'},
  u2 = {name:'Jackson'},
  u3 = {name:'Olive'},
  u4 = {name:'James'}
;
const users = [[u1, 'User'], [u2, 'User'], [u3, 'Admin']]
const userRoles = new Map(users);
// userRoles.set(u1, 'User').set(u2, 'User').set(u3, 'Admin');
// console.log(userRoles)
// console.log([...userRoles.keys()])

// for(let u of userRoles.entries()){
//     console.log(u); console.log(r)}
// for(let [u, r] of userRoles.entries())
//   console.log(`${u.name}: ${r}`);

// try{
//   console.log("this line is executed...");
//   // throw new Error("whoops");
//   console.log("this line is not..")
// }catch(err){
//   console.log("there was an error")
// }finally{
//   console.log("always executed")
// }

function* rainbow(){
  yield 'red';
  yield 'orange';
  yield 'yellow';
  yield 'green';
  yield 'blue';
  yield 'indigo';
  yield 'violet';
}
// const it = rainbow();
// console.log(it.next())