
const axios= require('axios')
const url= 'https://corona.lmao.ninja/countries?sort=cases'
var list=[]

axios.get(url)
.then(res => res.data)
.then((data) => data.forEach(element =>(
    list.push(element.country)
)));

console.log(list)