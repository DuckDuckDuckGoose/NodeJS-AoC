console.log(require(`fs`).readFileSync(`i`,`utf-8`).match(/\d+/g).map(e=>parseInt(e)).reduce((p,v,i,a)=>v>a[i-1]?p+1:p,0))
