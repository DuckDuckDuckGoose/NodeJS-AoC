let a=require(`fs`).readFileSync(`i.txt`,`utf-8`).match(/\d+/g).map(e=>parseInt(e));
let c =[];
for(let i=Math.min(...a);i<Math.max(...a);i++) {
  c.push(a.reduce((p,v) => {
    let t = Math.abs(v-i);
    return (t * (t + 1))/2 + p;
  }, 0))
}
console.log(Math.min(...c));
