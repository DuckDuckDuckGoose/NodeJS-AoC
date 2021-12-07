let a=require(`fs`).readFileSync(`i.txt`,`utf-8`).match(/\d+/g).map(e=>parseInt(e));
let c =[];
for(let i=Math.min(...a);i<Math.max(...a);i++) {
  c.push(a.reduce((p,v) => Math.abs(v-i) + p, 0))
}
console.log(Math.min(...c));
