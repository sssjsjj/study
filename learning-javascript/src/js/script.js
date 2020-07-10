const btn = document.querySelector(".btn-submit");

btn.onclick = function(e){
  const inputValue = document.querySelector("input[type='text']").value;
  const arr = [];
  for(const letter of inputValue){
    if(arr.indexOf(letter) > -1){
      arr.splice(arr.indexOf(letter),1)
    }
    arr.push(letter)
  }
  console.log(arr.join(" "))
  console.log(arr.length)
}