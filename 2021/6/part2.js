let a=require(`fs`).readFileSync(`i.txt`,`utf-8`).match(/\d+/g).map(e=>parseInt(e))
let b=`012345678`.split(``).map(e=>0);
a.forEach((e) => {
  b[e]++;
});
for(let i = 0;i<256;i++) {
  let t = b[0];
  b.shift();
  b[6]+=t;
  b.push(t)
}
console.log(b.reduce((p,v)=>p+v,0));
