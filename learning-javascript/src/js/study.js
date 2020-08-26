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
// //console.log(j)
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
arr2.copyWithin(1, 2); // 1 3 4 4 
arr2.copyWithin(2, 0, 2); // 1 3 1 3 
arr2.copyWithin(0, -3, -1); // 1 3 1 3  //끝낼 위치는 자기 자신을 포함하지 않음.

// arr2.copyWithin(0, -3, -1);
// console.log(arr2)

const sortArr = [
  {name: "Suzanne"},
  {name: "Jim1"},
  {name: "Jim2"},
  {name: "Trevor"},
  {name: "Amanda"},
]
sortArr.sort((a,b) => {
  a.name > b.name
  // console.log(a); //비교 2
  // console.log(b); //비교 1
//console.log(a.name > b.name)
});

console.log(sortArr.sort((a,b) => a.name > b.name))
console.log(sortArr.sort((a,b) => a.name[1] > b.name[1]))
console.log(sortArr)

function Person(name) {
    this.name = name;
    this.id = Person.nextId++;
}
//console.log(Person)
class Person1 {
  constructor(name) {
    this.name = name;
    this.id = Person.nextId++;
  }
}
//console.log(Person1)

Person.nextId = 0;
const jamie = new Person("Jamie"),
      juliet = new Person("Juliet"),
      peter = new Person("Peter"),
      jay = new Person("Jay");

      const arr22 = [jamie, juliet, peter, jay];

//console.log(arr22)

const cards = [];
for(let suit of ['H', 'C', 'D', 'S'])
  for(let value=1; value<=13; value++)
    cards.push({suit, value});

//console.log(cards.filter(c => c.value > 10 && c.suit === 'H'));


{
  const suits = { 'H': '\u2665', 'C': '\u2664', 'D': '\u2666', 'S': '\u2660'};
  const values = { 1: 'A', 11: 'J', 12: 'Q', 13: 'K'};
//console.log(cards.map(c => cardToString(suits, values, c)))
//console.log(cards.filter(c => c.value === 2).map(c => cardToString(suits, values, c)));
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
//   //console.log(u); console.log(r)}
// for(let [u, r] of userRoles.entries())
// //console.log(`${u.name}: ${r}`);

// try{
// //console.log("this line is executed...");
//   // throw new Error("whoops");
// //console.log("this line is not..")
// }catch(err){
// //console.log("there was an error")
// }finally{
// //console.log("always executed")
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

function sum(arr, f){
  if(typeof f!='function') f = x => x; //매개변수 f에 함수가 전달되지 않으면 각 배열값으로 기냥 반환
  return arr.reduce((a,x)=>a+=f(x),0)
  //a는 반환받을 값, x는 각 배열값, 0은 a의 기본값. a에 f(x)값을 계속 더함.
}
const arr3 = [1,2,3]
// console.log(sum(arr3))
// console.log(sum(arr3, x=>x*x))

function newSummer(f){
  return arr => sum(arr,f);
}

// console.log(newSummer(x=>x*x*x))

function findNeedle(haystack){
  if(haystack.length === 0) return "no haystack here!"
  if(haystack.shift() === 'needle') return "found it!"
  return findNeedle(haystack);
}
const stacks = ['hay','hay','hay','hay','needle','hay','hay']
// console.log(findNeedle(stacks))
// console.log(stacks.shift())
// console.log(stacks.shift())

// function countdown(){
//   console.log("Countdown:")
//   for(let i=5; i>=0; i--){
//     setTimeout(function(){
//       console.log(i===0? "Go!" :i);
//     }, (5-i) * 1000);
//   }
// }
// countdown()

// function countdown(seconds){
//   return new Promise(function(resolve, reject){
//     for(let i=seconds; i>=0; i--){
//       setTimeout(function(){
//         if(i===13) return reject(new Error(`Oh my god! it's ${i}`))
//         if(i>0) console.log(i + '!!!!!')
//         else resolve(console.log("GO!"));
//       }, (seconds-i)*1000)
//     }
//   });
// }
// countdown(13).then(
//   function(){
//     console.log("countdown completed successfully")
//   },
//   function(err){
//     console.log(`error ${err.message}`)
//   }
// );
console.log('1')
const EventEmitter = require('events').EventEmitter;

class Countdown extends EventEmitter {
  constructor(seconds, superstitious) {
    super();
    this.seconds = seconds;
    this.superstitious = !!superstitious;
  }
  
  go(){
    const countdown = this.addListener
    return new Promise(function(resolve, reject){
      for(let i=countdown.seconds; i>=0; i--){
        setTimeout(function(){
          if(countdown.superstitious && i===13)
            return reject(new Error("Oh my god"));
          countdown.emit('tick', i);
          if(i===0) resolve();
        }, (countdown.seconds-i)*1000);
      }
    })
  }
}

const c = new Countdown(15,true);
c.on('tick', i => {
  if(i>0) console.log(i+'...')
})
c.go()
  .then(() => {
    console.log('GO!')
  })
  .catch(err => {
    console.error(err.message)
  })
