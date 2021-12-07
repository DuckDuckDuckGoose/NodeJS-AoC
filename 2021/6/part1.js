let a=require(`fs`).readFileSync(`i.txt`,`utf-8`).match(/\d+/g).map(e=>parseInt(e))
for(let i=0;i<80;i++){
  let n=0;
  a=a.map((e) =>{
    if(e==0) {
      n+=1;
      return 6;
    }
    return e-1;
  })
  for(let j=0;j<n;j++) {
    a.push(8);
  }
}
console.log(a.length)
