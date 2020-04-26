const fetch= require('node-fetch')

const url='https://pomber.github.io/covid19/timeseries.json'

fetch(url)
    .then(res => res.json())
    .then(response =>{
        const dates=[]
        const data=[]
        response['Afghanistan'].map(item =>{
            dates.push(item.date)
        })
        for(let i=0;i<dates.length;i++){
            let sum=0
            for (let key in response){
                sum+= Number(response[key][i].confirmed)
            }
            //console.log(sum)
            data.push(sum)
        }
        console.log(data)
    })
