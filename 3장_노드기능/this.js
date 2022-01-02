console.log(this); // {}
console.log(this === module.exports); //T
console.log(this === exports); //T
// 노드에서 annonymous의 this는 global이 아닌 {}

function whatIsThis() {
  // 그 외에 this는 똑같음 Global
  console.log("function", this === exports, this === global);
}
whatIsThis();
